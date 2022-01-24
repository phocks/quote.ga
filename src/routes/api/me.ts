export async function get({ locals, request }) {
	// Access your data via locals.session.data -> this should always be an object.
	const currentUser = locals.session.data;

	return {
		body: {
			me: currentUser
		}
	};
}
