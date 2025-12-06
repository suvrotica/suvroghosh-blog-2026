import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
	thumbnail?: string;
	category: string;
	published?: boolean;
}

export const load: PageServerLoad = async ({ params }) => {
	const { category } = params;
    // Normalize category string for comparison (e.g., "Personal" vs "personal")
    const targetCategory = category.toLowerCase();

	const postFiles = import.meta.glob('/src/lib/posts/*.md', { eager: true });

	try {
		const posts = Object.entries(postFiles)
			.map(([path, file]): Post | null => {
				const slug = path.split('/').pop()?.replace('.md', '');

				if (file && typeof file === 'object' && 'metadata' in file && slug) {
					const metadata = file.metadata as Omit<Post, 'slug'>;
					// Check if categories match (case-insensitive)
                    const postCategory = (metadata.category || 'uncategorized').toLowerCase();

					if (postCategory === targetCategory) {
						if (metadata.published === false) return null;
						
						return {
							...metadata,
							slug,
							thumbnail: metadata.thumbnail,
							category: metadata.category || 'Uncategorized' // Keep original casing for display
						};
					}
				}
				return null;
			})
			.filter((post): post is Post => post !== null);

		if (posts.length === 0) {
			// Don't error 404 immediately, just show empty state. 
            // Or error if you prefer strict URLs.
            // error(404, 'No posts found in this category');
		}

		posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return {
			posts,
			category: category // Pass original param back for display title
		};
	} catch (e) {
		console.error(e);
		error(500, 'Could not load posts.');
	}
};
