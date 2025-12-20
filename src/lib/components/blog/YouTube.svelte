<script lang="ts">
	/**
	 * A responsive YouTube video player component.
	 * It intelligently handles URLs for single videos, playlists, or videos within a playlist.
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

		if (playlistId) {
			// Case 1: Video context within a playlist
			if (videoId) {
				return `https://www.youtube-nocookie.com/embed/${videoId}?list=${playlistId}`;
			} 
			// Case 2: Playlist only
			else {
				return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`;
			}
		} else if (videoId) {
			// Case 3: Single video
			return `https://www.youtube-nocookie.com/embed/${videoId}`;
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
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		{#if caption}
			<figcaption class="mt-2 text-sm italic text-neutral-600 dark:text-neutral-400 text-center leading-tight">
				{caption}
			</figcaption>
		{/if}
	</figure>
{:else}
	<div class="my-6 p-4 rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/20 text-center text-red-600 dark:text-red-400 text-sm font-bold">
		<p>Invalid YouTube URL provided: {src}</p>
	</div>
{/if}
