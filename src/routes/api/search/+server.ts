import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const posts = getPosts();

	// Return the JSON index.
	// We add a Cache-Control header so the client doesn't re-fetch this 
	// heavily during a session, saving bandwidth/execution time.
	return json(posts, {
		headers: {
			'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
		}
	});
};