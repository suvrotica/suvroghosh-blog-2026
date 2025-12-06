<script lang="ts">
	import { fade } from 'svelte/transition';

	// Prop to receive the list of image paths (e.g. ['/images/pic1.jpg', ...])
	let { images = [] }: { images: string[] } = $props();

	// Helper to extract clean title from filename
	function getFileName(path: string) {
		return path.split('/').pop()?.split('.')[0] ?? 'Image';
	}
</script>

<div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
	{#each images as src (src)}
		<a
			href={src}
			target="_blank"
			rel="noopener noreferrer"
			class="group relative block break-inside-avoid mb-4 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-xl transition-shadow duration-300"
			in:fade={{ duration: 300 }}
		>
			<div class="relative overflow-hidden">
				<img
					{src}
					alt={getFileName(src)}
					loading="lazy"
					decoding="async"
					class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
				/>
				
				<div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
			</div>

			<div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
				<p class="text-white text-sm font-medium truncate font-sans">
					{getFileName(src)}
				</p>
				<p class="text-neutral-300 text-xs uppercase tracking-wider mt-0.5">
					Open Image ↗
				</p>
			</div>
		</a>
	{/each}
</div>

{#if images.length === 0}
	<div class="p-12 text-center text-neutral-500">
		<p>No images found in /static/images</p>
	</div>
{/if}
