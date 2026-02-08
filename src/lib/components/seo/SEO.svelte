<script lang="ts">
	type Props = {
		title: string;
		description: string;
		canonicalUrl?: string;
		ogImageUrl?: string;
		ogImageAlt?: string;
		keywords?: string[];
        // Change this prop to accept one object OR an array of objects
		schema?: Record<string, any> | Record<string, any>[]; 
	};
	let {
		title,
		description,
		canonicalUrl,
		ogImageUrl,
		ogImageAlt,
		keywords,
		schema = undefined
	}: Props = $props();

    // Normalize to array for easier handling in template
    let schemaList = $derived(
        schema ? (Array.isArray(schema) ? schema : [schema]) : []
    );
</script>

<svelte:head>
    {#each schemaList as s}
		{@html `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`}
	{/each}
</svelte:head>