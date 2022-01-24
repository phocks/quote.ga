/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ locals, request }) {
	locals.session.data = { loggedIn: true, user: 'phocks' };

	return {
		body: locals.session.data
	};
}
