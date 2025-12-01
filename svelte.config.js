import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkMath from 'remark-math';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { codeToHtml } from 'shiki';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	remarkPlugins: [remarkMath],
	rehypePlugins: [
		rehypeSlug,
		[rehypeAutolinkHeadings, { behavior: 'wrap' }],
		rehypeKatexSvelte
	],
    // Highlighting configuration for code blocks
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = await codeToHtml(code, {
				lang,
				themes: {
					light: 'github-light',
					dark: 'github-dark'
				}
			});
			return html.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // CRITICAL: This tells Svelte to look inside .md files
	extensions: ['.svelte', '.md', '.svx'],

	preprocess: [
        vitePreprocess(), 
        mdsvex(mdsvexOptions)
    ],

	kit: {
		adapter: adapter()
	}
};

export default config;