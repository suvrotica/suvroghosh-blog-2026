import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// 1. Define your global imports here
const globalImports = `
import Pi from '$lib/components/blog/PostImage.svelte';
`;

/**
 * 2. Custom preprocessor to inject imports into markdown files
 */
const autoImport = {
	name: 'auto-import',
	markup: ({ content, filename }) => {
		// Only apply to .md files
		if (!filename || !filename.endsWith('.md')) return;

		// If a <script> tag already exists, inject inside it
		if (content.includes('<script>')) {
			return {
				code: content.replace('<script>', `<script>\n${globalImports}`)
			};
		}

		// If no <script> tag exists, append one to the end
		// (Appending is safe because frontmatter must stay at the very top)
		return {
			code: content + `\n<script>\n${globalImports}\n</script>`
		};
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// 3. Add autoImport to the preprocess array BEFORE mdsvex
	preprocess: [
		autoImport,
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			remarkPlugins: [remarkMath],
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: 'wrap' }],
				rehypeKatexSvelte
			]
		})
	],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$assets: 'src/lib/assets'
		}
	}
};

export default config;