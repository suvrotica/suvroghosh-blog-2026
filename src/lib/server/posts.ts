export type SearchPost = {
    title: string;
    slug: string;
    description: string;
    date: string;
    category: string;
    searchTerms: string;
};

// 1. Define the glob pattern ONCE to ensure keys match exactly
const GLOB_PATTERN = '/src/lib/posts/*.md';

// 2. Fetch Metadata and Raw Content using the exact same pattern
const metaFiles = import.meta.glob('/src/lib/posts/*.md', { eager: true });
const contentFiles = import.meta.glob('/src/lib/posts/*.md', { eager: true, query: '?raw', import: 'default' });

function stripFrontmatter(markdown: string): string {
    // Remove the --- block at the top
    return markdown.replace(/^---[\s\S]*?---/, '').trim();
}

export const getPosts = (): SearchPost[] => {
    return Object.entries(metaFiles).map(([path, resolver]: any) => {
        const metadata = resolver.metadata;
        
        // Skip if invalid or unpublished
        if (!metadata || metadata.published === false) return null;

        const slug = path.split('/').pop()?.replace('.md', '').toLowerCase();
        const category = (metadata.category || 'uncategorized').toLowerCase();

        // 3. Get the raw text content using the SAME path key
        // We cast to string because we used query: '?raw'
        const rawContent = (contentFiles[path] as string) || '';
        
        // 4. Create the search corpus
        const cleanBody = stripFrontmatter(rawContent)
            .replace(/\s+/g, ' ') // Flatten whitespace
            .toLowerCase();       // Lowercase for easy searching

        const searchTerms = `${metadata.title} ${metadata.description || ''} ${category} ${cleanBody}`.toLowerCase();

        return {
            title: metadata.title,
            slug: `/blog/${category}/${slug}`,
            description: metadata.description || '',
            date: metadata.date,
            category: category,
            searchTerms
        };
    })
    .filter((post): post is SearchPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
