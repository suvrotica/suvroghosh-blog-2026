<script lang="ts">
	import PostGallery from '$lib/components/blog/PostGallery.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>All Posts - SuvroGhosh.Blog</title>
    <meta name="description" content="Browse all engineering and personal writings." />
</svelte:head>

<section>
	<h1 class="text-center mb-8">All Posts</h1>
    
    {#if data.posts.length > 0}
        <PostGallery posts={data.posts} />
    {:else}
        <div class="text-center py-12 text-neutral-500">
            <p>No posts found.</p>
        </div>
    {/if}
</section>