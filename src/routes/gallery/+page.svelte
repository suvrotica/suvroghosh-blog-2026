<script lang="ts">
	import ImageMasonry from '$lib/components/blog/ImageMasonry.svelte';
	
	let { data } = $props();
</script>

<svelte:head>
	<title>Gallery - SuvroGhosh.Blog</title>
	<meta name="description" content="A visual collection." />
</svelte:head>

<section class="container mx-auto py-8">
	<h1 class="text-center mb-2 text-4xl font-serif font-bold">Gallery</h1>
    <p class="text-center text-neutral-500 dark:text-neutral-400 mb-8 italic">
        A visual collection from the archives.
    </p>
    
	<ImageMasonry images={data.images} />
</section>
