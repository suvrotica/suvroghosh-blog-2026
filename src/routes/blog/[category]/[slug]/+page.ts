import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, data }) => {
    // 1. Tell Vite about all potential markdown posts
    // This creates a map where keys are paths and values are import functions
    const modules = import.meta.glob('/src/lib/posts/*.md');

    // 2. Construct the exact key we are looking for
    const path = `/src/lib/posts/${params.slug}.md`;

    // 3. Find the correct import function
    const resolver = modules[path];

    if (!resolver) {
        error(404, `Could not find post: ${params.slug}`);
    }

    // 4. Execute the import to get the Svelte component
    const post: any = await resolver();

    return {
        // The default export of a .md file (via mdsvex) is the Svelte component
        content: post.default,
        // Pass along the SEO and Metadata we calculated on the server
        ...data 
    };
};