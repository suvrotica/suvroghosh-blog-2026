import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const posts = getPosts();

    return json(posts, {
        headers: {
            // CRITICAL: Disable caching completely to ensure new body content is loaded
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
};
