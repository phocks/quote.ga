import { handleSession } from "svelte-kit-cookie-session";

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ locals }) {
  return locals.session.data;
}

// You can do it like this, without passing a own handle function
export const handle = handleSession({
  secret: "SOME_COMPLEX_SECRET_AT_LEAST_32_CHARS",
});

// Or pass your handle function as second argument to handleSession

// export const handle = handleSession(
//   {
//     secret: "SOME_COMPLEX_SECRET_AT_LEAST_32_CHARS",
//   },
//   ({ event, resolve }) => {
//     // event.locals is populated with the session `event.locals.session`

//     // Do anything you want here
//     return resolve(event);
//   }
// );