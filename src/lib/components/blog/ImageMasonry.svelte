<script lang="ts">
	import { fade } from 'svelte/transition';

	let { images = [] }: { images: string[] } = $props();

	function getName(path: string) {
		return path.split('/').pop()?.split('.')[0].replace(/[-_]/g, ' ') ?? 'Image';
	}
</script>

<div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-8 px-2">
	{#each images as src (src)}
		<div class="break-inside-avoid">
			<a
				href={src}
				target="_blank"
				rel="noopener noreferrer"
				class="group block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
				in:fade={{ duration: 300 }}
			>
				<div class="relative w-full">
					<img
						{src}
						alt={getName(src)}
						loading="lazy"
						decoding="async"
						class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
					/>
					
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
				</div>

				<div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
					<p class="text-white text-xs font-bold truncate">
						{getName(src)}
					</p>
					<p class="text-[var(--color-gold)] text-[10px] uppercase tracking-wider font-bold mt-0.5">
						View Fullsize ↗
					</p>
				</div>
			</a>
		</div>
	{/each}
</div>

{#if images.length === 0}
	<div class="py-12 text-center text-neutral-500 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg">
		<p>No images found in /static/images</p>
	</div>
{/if}
