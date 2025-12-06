<script lang="ts">
	import PostGallery from '$lib/components/blog/PostGallery.svelte';
	
    // Svelte 5 rune for accessing page props
    let { data } = $props();
</script>

<svelte:head>
	<title>Blog - SuvroGhosh.Blog</title>
	<meta name="description" content="A collection of articles on web engineering." />
</svelte:head>

<section class="container mx-auto py-8">
	<h1 class="text-center mb-8 text-4xl font-bold">All Posts</h1>
	<PostGallery posts={data.posts} />
</section>
