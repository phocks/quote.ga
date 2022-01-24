import { decrypt, encrypt } from "./crypto.js";
import { parse, serialize } from "./cookie.js";
import { daysToMaxage, maxAgeToDateOfExpiry } from "./utils.js";
let initialSecret;
let encoder;
let decoder;
export default function initializeSession(headersOrCookieString, userOptions) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (userOptions.secret == null) {
        throw new Error("Please provide at least one secret");
    }
    const options = {
        key: (_a = userOptions.key) !== null && _a !== void 0 ? _a : "kit.session",
        expiresInDays: (_b = userOptions.expires) !== null && _b !== void 0 ? _b : 7,
        cookie: {
            maxAge: daysToMaxage((_c = userOptions.expires) !== null && _c !== void 0 ? _c : 7),
            httpOnly: (_e = (_d = userOptions === null || userOptions === void 0 ? void 0 : userOptions.cookie) === null || _d === void 0 ? void 0 : _d.httpOnly) !== null && _e !== void 0 ? _e : true,
            sameSite: (_g = (_f = userOptions === null || userOptions === void 0 ? void 0 : userOptions.cookie) === null || _f === void 0 ? void 0 : _f.sameSite) !== null && _g !== void 0 ? _g : true,
            path: (_j = (_h = userOptions === null || userOptions === void 0 ? void 0 : userOptions.cookie) === null || _h === void 0 ? void 0 : _h.path) !== null && _j !== void 0 ? _j : "/",
        },
        rolling: (_k = userOptions === null || userOptions === void 0 ? void 0 : userOptions.rolling) !== null && _k !== void 0 ? _k : false,
        secrets: Array.isArray(userOptions.secret)
            ? userOptions.secret
            : [{ id: 1, secret: userOptions.secret }],
    };
    /** This is mainly for testing purposes */
    let changedSecrets = false;
    if (!initialSecret || initialSecret !== options.secrets[0].secret) {
        initialSecret = options.secrets[0].secret;
        changedSecrets = true;
    }
    // Setup de/encoding
    if (!encoder || changedSecrets) {
        encoder = encrypt(options.secrets[0].secret);
    }
    if (!decoder || changedSecrets) {
        decoder = decrypt(options.secrets[0].secret);
    }
    const cookies = parse(typeof headersOrCookieString === "string"
        ? headersOrCookieString
        : headersOrCookieString.get("cookie") || "", {});
    let sessionCookie = cookies[options.key] || "";
    const sessionState = {
        invalidDate: false,
        shouldReEncrypt: false,
        shouldDestroy: false,
        shouldSendToClient: false,
    };
    let sessionData;
    let checkedExpiry = false;
    function checkSessionExpiry() {
        if (sessionData &&
            sessionData.expires &&
            new Date(sessionData.expires).getTime() < new Date().getTime()) {
            sessionState.invalidDate = true;
        }
    }
    function getSessionData() {
        if (sessionData) {
            if (!checkedExpiry) {
                checkedExpiry = true;
                checkSessionExpiry();
            }
            return sessionData;
        }
        const [_sessionCookie, secret_id] = sessionCookie.split("&id=");
        // If we have a session cookie we try to get the id from the cookie value and use it to decode the cookie.
        // If the decodeID is not the first secret in the secrets array we should re encrypt to the newest secret.
        if (_sessionCookie.length > 0) {
            // Split the sessionCookie on the &id= field to get the id we used to encrypt the session.
            const decodeID = secret_id ? Number(secret_id) : 1;
            // Use the id from the cookie or the initial one which is always 1.
            let secret = options.secrets.find((sec) => sec.id === decodeID);
            // If there is no secret found try the first in the secrets array.
            if (!secret)
                secret = options.secrets[0];
            // Set the session cookie without &id=
            sessionCookie = _sessionCookie;
            // If the decodeID unequals the newest secret id in the array, re initialize the decoder.
            if (options.secrets[0].id !== decodeID) {
                decoder = decrypt(secret.secret);
            }
            // Try to decode with the given sessionCookie and secret
            try {
                const decrypted = decoder(_sessionCookie);
                if (decrypted && decrypted.length > 0) {
                    sessionData = JSON.parse(decrypted);
                    checkSessionExpiry();
                    // If the decodeID unequals the newest secret id in the array, we should re-encrypt the session with the newest secret.
                    if (options.secrets[0].id !== decodeID) {
                        reEncryptSession();
                    }
                    return sessionData;
                }
                else {
                    destroySession();
                }
            }
            catch (error) {
                destroySession();
            }
        }
    }
    function makeCookie(maxAge, destroy = false) {
        return serialize(options.key, destroy
            ? "0"
            : encoder(JSON.stringify(sessionData) || "") +
                "&id=" +
                options.secrets[0].id, {
            httpOnly: options.cookie.httpOnly,
            sameSite: options.cookie.sameSite,
            path: options.cookie.path,
            maxAge: destroy ? undefined : maxAge,
            expires: destroy ? new Date(Date.now() - 360000000) : undefined,
        });
    }
    let setCookie;
    const session = {
        get "set-cookie"() {
            return setCookie;
        },
        //@ts-expect-error This is actually fine
        get data() {
            const currentData = getSessionData();
            return currentData &&
                !sessionState.invalidDate &&
                !sessionState.shouldDestroy
                ? currentData
                : undefined;
        },
        set data(data) {
            let maxAge = options.cookie.maxAge;
            if (sessionData === null || sessionData === void 0 ? void 0 : sessionData.expires) {
                maxAge =
                    new Date(sessionData.expires).getTime() / 1000 -
                        new Date().getTime() / 1000;
            }
            sessionData = {
                ...data,
                expires: maxAgeToDateOfExpiry(maxAge),
            };
            sessionState.shouldSendToClient = true;
            setCookie = makeCookie(maxAge);
        },
        refresh: function (expiresInDays) {
            if (!sessionData) {
                return false;
            }
            const newMaxAge = daysToMaxage(expiresInDays !== null && expiresInDays !== void 0 ? expiresInDays : options.expiresInDays);
            sessionData = {
                ...sessionData,
                expires: maxAgeToDateOfExpiry(newMaxAge),
            };
            setCookie = makeCookie(newMaxAge);
            sessionState.shouldSendToClient = true;
            return true;
        },
        destroy: function () {
            sessionData = undefined;
            setCookie = makeCookie(0, true);
            sessionState.shouldSendToClient = true;
            return true;
        },
    };
    // If rolling is activated and the session exists we refresh the session on every request.
    if ((userOptions === null || userOptions === void 0 ? void 0 : userOptions.rolling) && !sessionState.invalidDate && sessionData) {
        session.refresh();
    }
    function destroySession() {
        sessionState.shouldSendToClient = true;
        session.destroy();
    }
    function reEncryptSession() {
        if (sessionData) {
            sessionState.shouldSendToClient = true;
            session.data = { ...sessionData };
        }
    }
    return session;
}
