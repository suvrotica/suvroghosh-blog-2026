// File: src/routes/blog/[category]/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
    // 1. Tell Vite about all potential markdown posts
    const modules = import.meta.glob('/src/lib/posts/*.md');

    // 2. Use the exact path found by the server (handles case sensitivity)
    const resolver = modules[data.resolvedPath];

    if (!resolver) {
        error(404, `Could not load content for: ${data.metadata.title}`);
    }

    // 3. Execute the import to get the Svelte component
    const post: any = await resolver();

    return {
        content: post.default,
        ...data 
    };
};