import { parse } from 'path';

export type SearchPost = {
	title: string;
	slug: string;
	description: string;
	date: string;
	category: string;
	searchTerms: string;
};

// 1. Get Metadata (Module)
// We keep this to get the parsed Frontmatter objects safely
const metaFiles = import.meta.glob('/src/lib/posts/*.md', { eager: true });

// 2. Get Raw Content (String)
// We load the raw string content to index the body text
const contentFiles = import.meta.glob('/src/lib/posts/*.md', { eager: true, query: '?raw', import: 'default' });

/**
 * Helper to remove the --- metadata block --- from the top of markdown
 */
function stripFrontmatter(markdown: string): string {
	// Matches the first block starting with --- and ending with ---
	return markdown.replace(/^---[\s\S]*?---/, '').trim();
}

export const getPosts = (): SearchPost[] => {
	const posts = Object.entries(metaFiles).map(([path, resolver]: any) => {
		const metadata = resolver.metadata;
		const slug = path.split('/').pop()?.replace('.md', '').toLowerCase();

		if (!metadata || metadata.published === false) return null;

		// Get the raw content for this specific file path
		const rawContent = (contentFiles[path] as string) || '';
		
		// Clean it up: Remove frontmatter and extra whitespace to keep JSON size smaller
		const cleanBody = stripFrontmatter(rawContent)
            .replace(/\s+/g, ' '); // Replace multiple spaces/newlines with single space

		const category = (metadata.category || 'uncategorized').toLowerCase();

		return {
			title: metadata.title,
			slug: `/blog/${category}/${slug}`,
			description: metadata.description || '',
			date: metadata.date,
			category: category,
			// NOW INCLUDES BODY TEXT:
			searchTerms: `${metadata.title} ${metadata.description || ''} ${category} ${cleanBody}`.toLowerCase()
		};
	});

	return posts
		.filter((post): post is SearchPost => post !== null)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
