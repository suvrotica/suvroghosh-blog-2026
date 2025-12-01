<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
    
    // The markdown content component (passed from +page.ts)
    let Content = $derived(data.content);
</script>

{#if data.seo}
    <SEO {...data.seo} schema={data.schema} />
{/if}

<div class="blog-post-container">
    {#if Content}
        <Content />
    {/if}
</div>