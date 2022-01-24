import type { Session, SessionOptions } from "./types";
export default function initializeSession<SessionType = Record<string, any>>(headersOrCookieString: Headers | string, userOptions: SessionOptions): Session<(SessionType & {
    expires?: Date | undefined;
}) | undefined>;
