import { parse } from 'path';

export type SearchPost = {
	title: string;
	slug: string;
	description: string;
	date: string;
	category: string;
	searchTerms: string; // Pre-computed string for performant searching
};

// Use Vite's import.meta.glob to load all markdown files eagerly.
// This ensures they are bundled into the serverless function on Vercel.
const postFiles = import.meta.glob('/src/lib/posts/*.md', { eager: true });

export const getPosts = (): SearchPost[] => {
	const posts = Object.entries(postFiles).map(([path, resolver]: any) => {
		const metadata = resolver.metadata;
		const slug = path.split('/').pop()?.replace('.md', '').toLowerCase();

		if (!metadata || metadata.published === false) return null;

		// Normalize category
		const category = (metadata.category || 'uncategorized').toLowerCase();

		return {
			title: metadata.title,
			slug: `/blog/${category}/${slug}`,
			description: metadata.description || '',
			date: metadata.date,
			category: category,
			// Combine fields into one lowercase string for easy filtering
			searchTerms: `${metadata.title} ${metadata.description || ''} ${category}`.toLowerCase()
		};
	});

	// Filter nulls and sort by date (newest first)
	return posts
		.filter((post): post is SearchPost => post !== null)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};