<script lang="ts">
	import ImageMasonry from '$lib/components/blog/ImageMasonry.svelte';
	
	let { data } = $props();
</script>

<svelte:head>
    <title>Gallery - SuvroGhosh.In</title>
	<meta name="description" content="A visual collection." />
</svelte:head>

<section class="container mx-auto py-8">
	<h1 class="text-center mb-2 text-4xl font-sans font-bold text-neutral-900 dark:text-neutral-100">Gallery</h1>
    
    <div class="text-center text-neutral-500 dark:text-neutral-400 mb-8 italic">
        Suvro Ghosh Sketch Posts.
    </div>
    
	<ImageMasonry images={data.images} />
</section>
