import initializeSession from "./core.js";
export function sessionMiddleware(options) {
    return (req, res, next) => {
        const session = initializeSession(req.headers.cookie || '', options);
        //@ts-ignore
        req.session = session;
        const setSessionHeaders = () => {
            //@ts-ignore This can exist
            const sessionCookie = req.session["set-cookie"];
            if (sessionCookie && sessionCookie.length > 0) {
                const existingSetCookie = res.getHeader("Set-Cookie");
                if (!existingSetCookie) {
                    res.setHeader("Set-Cookie", [sessionCookie]);
                }
                else if (typeof existingSetCookie === "string") {
                    res.setHeader("Set-Cookie", [existingSetCookie, sessionCookie]);
                }
                else {
                    res.setHeader("Set-Cookie", [...existingSetCookie, sessionCookie]);
                }
            }
        };
        const end = res.end;
        res.end = function (...args) {
            setSessionHeaders();
            return end.apply(this, args);
        };
        return next();
    };
}
