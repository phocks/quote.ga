/// <reference types="node" />
import type { SessionOptions, Session } from "./types";
import type { IncomingMessage, ServerResponse } from "http";
declare global {
    namespace Express {
        interface Request {
            session: Session<SessionData>;
        }
    }
    namespace Polka {
        interface Request {
            session: Session<SessionData>;
        }
    }
}
/**
 * This interface allows you to declare additional properties on your session object using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
 *
 * @example
 * declare module 'svelte-kit-cookie-session' {
 *     interface SessionData {
 *         views: number;
 *     }
 * }
 *
 */
interface SessionData {
    [key: string]: any;
}
export declare function sessionMiddleware<Req extends {
    headers: IncomingMessage["headers"];
}, Res extends ServerResponse, SessionType = Record<string, any>>(options: SessionOptions): (req: Req, res: Res, next: () => void) => any;
export {};
