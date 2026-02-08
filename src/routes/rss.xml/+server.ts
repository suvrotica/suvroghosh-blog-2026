import { siteTitle, siteDescription, siteUrl } from '$lib/components/seo/SEO';

export const prerender = true;

export async function GET() {
	const modules = import.meta.glob('/src/lib/posts/*.md', { eager: true });

	const posts = Object.entries(modules)
		.map(([path, file]: any) => {
			const slug = path.split('/').pop()?.replace('.md', '').toLowerCase();
			const metadata = file.metadata;

			if (!metadata || !metadata.published || !metadata.date) return null;

			return {
				title: metadata.title,
				description: metadata.description,
				url: `${siteUrl}/blog/${metadata.category.toLowerCase()}/${slug}`,
				date: new Date(metadata.date).toUTCString(),
                category: metadata.category
			};
		})
		.filter((post) => post !== null)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteTitle}</title>
    <description>${siteDescription}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
			.map(
				(post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <pubDate>${post.date}</pubDate>
      <category>${post.category}</category>
    </item>`
			)
			.join('')}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}