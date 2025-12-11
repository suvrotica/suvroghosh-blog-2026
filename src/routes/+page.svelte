<script lang="ts">
	import PostGallery from '$lib/components/blog/PostGallery.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>SuvroGhosh.In</title>
	<meta name="description" content="A collection of articles on web engineering, philosophy, and life." />
</svelte:head>

<section>
	<h1 class="text-center mb-8">Suvro Ghosh Posts</h1>
    <PostGallery posts={data.posts} />
</section>