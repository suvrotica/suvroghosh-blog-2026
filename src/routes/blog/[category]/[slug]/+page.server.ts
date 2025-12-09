// File: src/routes/blog/[category]/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Define the shape of your markdown metadata
type PostMetadata = {
	title: string;
	description: string;
	date?: string;
	thumbnail?: string;
	published?: boolean;
	keywords?: string[];
	color?: string;
	[key: string]: unknown;
};

type Heading = { level: number; id: string; text: string };

function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[\s_]+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

export const load: PageServerLoad = async ({ params, url }) => {
	try {
        const { slug, category } = params;

		// 1. Import all posts via Glob (Metadata only)
		const postModules = import.meta.glob('/src/lib/posts/*.md', { import: 'metadata' });

		// 2. Find the file that matches the slug (Case insensitive lookup)
        const matchingPath = Object.keys(postModules).find((path) => {
            const fileName = path.split('/').pop()?.replace('.md', '').toLowerCase();
            return fileName === slug.toLowerCase();
        });

		if (!matchingPath) {
			error(404, { message: `Could not find post: ${slug}` });
		}

		const metadataLoader = postModules[matchingPath];
		const post = (await metadataLoader()) as PostMetadata;

		// 3. Check if published
		if (post.published === false) {
			error(404, { message: 'This post is not available' });
		}

		// 4. Get raw content for headings extraction
		const postsRaw = import.meta.glob('/src/lib/posts/*.md', {
			query: '?raw',
			import: 'default'
		});
		const rawContentLoader = postsRaw[matchingPath];
		const rawContent = (await rawContentLoader()) as string;

		// 5. Extract Headings
		const headings: Heading[] = [];
		const headingRegex = /^(##|###)\s+(.*)/gm;
		let match;
		while ((match = headingRegex.exec(rawContent)) !== null) {
			const text = match[2].trim();
			headings.push({ level: match[1].length, id: slugify(text), text: text });
		}

		// 6. Construct SEO Data
        // Updated branding to SuvroGhosh.In
		const canonicalUrl = `${url.origin}/blog/${category}/${slug}`;
		const seo = {
			title: `${post.title} | SuvroGhosh.In`, 
			description: post.description,
			canonicalUrl: canonicalUrl,
			ogImageUrl: post.thumbnail
				? `${url.origin}${post.thumbnail}`
				: `${url.origin}/images/placeholders/default.png`,
			ogImageAlt: post.title,
			keywords: post.keywords
		};

		// 7. Schema.org Data
		const datePublished = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
		
        const schema = {
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: post.title,
			image: seo.ogImageUrl,
			datePublished,
			dateModified: datePublished,
			author: {
				'@type': 'Person',
				name: 'Suvro Ghosh',
				url: `${url.origin}/about`
			},
			publisher: {
				'@type': 'Organization',
				name: 'SuvroGhosh.In', 
				logo: {
					'@type': 'ImageObject',
					url: `${url.origin}/favicon.svg`
				}
			},
			description: post.description,
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': canonicalUrl
			}
		};

		return {
			metadata: post,
			headings,
			seo,
			schema,
            resolvedPath: matchingPath 
		};

	} catch (e: any) {
		console.error(e);
		if (e?.status === 404) throw e;
		error(500, { message: 'Internal Server Error' });
	}
};