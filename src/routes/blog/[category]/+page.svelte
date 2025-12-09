<script lang="ts">
	import PostGallery from '$lib/components/blog/PostGallery.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>{data.category} - SuvroGhosh.In</title>
</svelte:head>

<section>
	<h1 class="capitalize text-center mb-8">Category: {data.category}</h1>
	
    {#if data.posts.length > 0}
	    <PostGallery posts={data.posts} />
    {:else}
        <p class="text-center text-neutral-500">No posts found in this category yet.</p>
    {/if}
</section>