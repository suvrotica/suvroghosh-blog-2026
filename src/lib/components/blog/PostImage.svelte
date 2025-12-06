<script lang="ts">
	let {
		src,
		alt,
		caption = '',
		layout = 'block', // 'block' | 'iL' | 'iR'
		size = 1
	}: {
		src: string;
		alt?: string;
		caption?: string;
		layout?: 'block' | 'iL' | 'iR';
		size?: number;
	} = $props();

	// 1. Handle Image Path: Allow full paths, but default to /images/ prefix
	let fullSrc = $derived(
		src.startsWith('/') || src.startsWith('http') ? src : `/images/${src}`
	);

	// 2. Handle Default Alt Text: Clean up filename if alt is missing
	function formatAlt(filename: string) {
		// Get file name without path
		const name = filename.split('/').pop() ?? filename;
		// Remove extension
		const noExt = name.split('.').slice(0, -1).join('.');
		// Replace hyphens/underscores with spaces and capitalize words
		return noExt
			.replace(/[-_]/g, ' ')
			.replace(/\b\w/g, (l) => l.toUpperCase());
	}

	let finalAlt = $derived(alt ?? formatAlt(src));

	// 3. Calculate dynamic width based on size prop
	let containerStyle = $derived(`width: ${size * 100}%;`);

	// 4. Handle Layout Classes
	let figureClasses = $derived.by(() => {
		// Base styles - removed w-full here to let style prop control it
		let classes = "post-image relative";
		
		if (layout === 'iL') {
			// Float left, margin right. Removed explicit max-w-[50%] to let size prop dictate width.
			return `${classes} float-left mr-6 mb-4 clear-left`;
		} 
		
		if (layout === 'iR') {
			// Float right, margin left.
			return `${classes} float-right ml-6 mb-4 clear-right`;
		}
		
		// Default 'block': centered, wider margins
		// Added mx-auto to ensure it centers if size < 1
		return `${classes} block mx-auto my-8`;
	});

	let imgClasses = $derived.by(() => {
		// Ensure image fills the figure container
		return "h-auto w-full rounded-lg shadow-md";
	});
</script>

<figure class={figureClasses} style={containerStyle}>
	<img 
		src={fullSrc} 
		alt={finalAlt} 
		loading="lazy" 
		decoding="async" 
		class={imgClasses}
	/>
	{#if caption}
		<figcaption class="mt-2 text-sm italic text-neutral-600 dark:text-neutral-400 text-center leading-tight">
			{caption}
		</figcaption>
	{/if}
</figure>		
		if (layout === 'iL') {
			// Float left, margin right, limit width
			return `${classes} float-left mr-6 mb-4 max-w-[50%] clear-left`;
		} 
		
		if (layout === 'iR') {
			// Float right, margin left, limit width
			return `${classes} float-right ml-6 mb-4 max-w-[50%] clear-right`;
		}
		
		// Default 'block': centered, wider margins
		return `${classes} w-full my-8 text-center`;
	});

	let imgClasses = $derived.by(() => {
		const base = "h-auto rounded-lg shadow-md";
		// Only center the image itself if it's a block layout
		if (layout === 'block') return `${base} max-w-full mx-auto`;
		return `${base} w-full`;
	});
</script>

<figure class={figureClasses}>
	<img 
		src={fullSrc} 
		alt={finalAlt} 
		loading="lazy" 
		decoding="async" 
		class={imgClasses}
	/>
	{#if caption}
		<figcaption class="mt-2 text-sm italic text-neutral-600 dark:text-neutral-400 text-center leading-tight">
			{caption}
		</figcaption>
	{/if}
</figure>
