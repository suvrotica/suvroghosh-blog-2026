<script lang="ts">
	import ImageMasonry from '$lib/components/blog/ImageMasonry.svelte';
	
	let { data } = $props();
</script>

<svelte:head>
	<title>Gallery - SuvroGhosh.Blog</title>
</svelte:head>

<div class="container mx-auto py-8">
	<h1 class="text-4xl font-bold text-center mb-8 font-serif">Gallery</h1>
	<ImageMasonry images={data.images} />
</div>
