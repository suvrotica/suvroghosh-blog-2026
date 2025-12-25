<script lang="ts">
	/**
	 * A responsive YouTube video player component.
	 * Svelte 5 Runes.
	 * OPTIMIZED: Uses standard YouTube domain and strict params to force UI on mobile.
	 */
	let {
		src,
		title = 'Embedded YouTube video',
		caption = '',
		aspectRatio = '16/9'
	}: {
		src: string;
		title?: string;
		caption?: string;
		aspectRatio?: '16/9' | '4/3' | '1/1';
	} = $props();

	function parseYouTubeId(url: string): string | null {
		const regex =
			/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
		const match = url.match(regex);
		return match ? match[1] : null;
	}

	function parseYouTubePlaylistId(url: string): string | null {
		const regex = /[?&]list=([^"&?/\s]+)/;
		const match = url.match(regex);
		return match ? match[1] : null;
	}

	let embedSrc = $derived.by(() => {
		const videoId = parseYouTubeId(src);
		const playlistId = parseYouTubePlaylistId(src);

		// Use standard domain. 'nocookie' often strips UI elements on mobile for privacy compliance.
		const baseUrl = 'https://www.youtube.com/embed/';

		const params = new URLSearchParams({
			playsinline: '1', // Crucial: prevents iOS from hijacking the player
			controls: '1',    // Force native controls
			fs: '1',          // Allow fullscreen (required for some UI overlays)
			rel: '0'          // Don't show random related videos
			// NOTE: We intentionally OMIT 'modestbranding'. 
			// Including 'modestbranding=1' REMOVES the top bar (and playlist icon) on mobile.
		});

		if (playlistId) {
			params.set('list', playlistId);
			if (videoId) {
				return `${baseUrl}${videoId}?${params.toString()}`;
			} else {
				return `${baseUrl}videoseries?${params.toString()}`;
			}
		} else if (videoId) {
			return `${baseUrl}${videoId}?${params.toString()}`;
		}
		
		return null;
	});
</script>

{#if embedSrc}
	<figure class="my-8 mx-auto w-full block clear-both not-prose">
		<div 
			class="relative w-full overflow-hidden rounded-lg shadow-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
			style:aspect-ratio={aspectRatio}
		>
			<iframe
				class="absolute top-0 left-0 w-full h-full"
				src={embedSrc}
				{title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				referrerpolicy="strict-origin-when-cross-origin"
			></iframe>
		</div>
		{#if caption || parseYouTubePlaylistId(src)}
			<figcaption class="mt-2 text-sm italic text-neutral-600 dark:text-neutral-400 text-center leading-tight">
				{caption}
				{#if parseYouTubePlaylistId(src)}
					<br/>
					<a href={src} target="_blank" rel="noopener noreferrer" class="text-xs text-sky-600 dark:text-sky-400 hover:underline">
						(Open Playlist on YouTube)
					</a>
				{/if}
			</figcaption>
		{/if}
	</figure>
{:else}
	<div class="my-6 p-4 rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/20 text-center text-red-600 dark:text-red-400 text-sm font-bold">
		<p>Invalid YouTube URL provided: {src}</p>
	</div>
{/if} 
