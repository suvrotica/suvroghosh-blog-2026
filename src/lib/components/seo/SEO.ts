import { dev } from '$app/environment';
import type { WithContext, WebSite, Person, WebPage } from 'schema-dts';

export const siteTitle = 'Suvro Ghosh';
export const siteTitleLong = 'Suvro Ghosh | Engineering & Philosophy';
export const siteDescription = "The personal blog of Suvro Ghosh. A digital garden exploring the intersection of software engineering, philosophy, and life in Calcutta.";
export const siteUrl = dev ? 'http://localhost:5173' : 'https://suvroghosh.in';

export const socialUrls = [
	'https://github.com/suvroghosh',
    // Add your actual Twitter/X or other socials here
];

// The "Entity" Schema - This tells Google WHO you are
export const personSchema: WithContext<Person> = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Suvro Ghosh',
	url: siteUrl,
	image: `${siteUrl}/images/IMG-20251202-WA0009.jpg`, // Using one of your profile images
	sameAs: socialUrls,
	jobTitle: ['Software Engineer', 'Writer', 'Philosopher'],
	worksFor: {
		'@type': 'Organization',
		name: 'Self-Employed'
	},
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        addressCountry: 'India'
    }
};

export const websiteSchema: WithContext<WebSite> = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: siteTitle,
	url: siteUrl,
	description: siteDescription,
	publisher: {
		'@id': `${siteUrl}/#person`
	},
	inLanguage: 'en-US'
};