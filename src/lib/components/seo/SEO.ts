// File: src/lib/components/seo/SEO.ts
import { dev } from '$app/environment';
import type { WithContext, WebSite } from 'schema-dts';

export const siteTitle = 'SuvroGhosh.In'; // Updated
export const siteDescription = "Join Suvro Ghosh's journey through the evolving landscape of technology. A blend of detailed tech tutorials, industry trend analyses, and personal stories.";
export const siteUrl = dev ? 'http://localhost:5173' : 'https://suvroghosh.in'; 

export const siteSEO = {
	title: siteTitle,
	description: siteDescription,
	canonical: siteUrl,
	openGraph: {
		type: 'website',
		url: siteUrl,
		title: siteTitle,
		description: siteDescription,
		images: [
			{
				url: `${siteUrl}/images/placeholders/default.png`,
				width: 1200,
				height: 630,
				alt: 'Suvro Ghosh Logo'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: siteTitle,
		description: siteDescription,
		image: `${siteUrl}/images/placeholders/default.png`,
		creator: '@suvro_ghosh'
	}
};

export const websiteSchema: WithContext<WebSite> = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: siteTitle,
	url: siteUrl,
	description: siteDescription,
	publisher: {
		'@type': 'Person',
		name: 'Suvro Ghosh'
	},
	inLanguage: 'en-US'
};