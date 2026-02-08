<script lang="ts">
	/**
	 * PostGallery Component
	 * Optimized for Svelte 5 Runes and Tailwind 4.1
	 */
	type Post = {
		slug: string;
		title: string;
		thumbnail?: string;
		category: string;
		description?: string;
		date?: string;
	};

	// Svelte 5 prop declaration [cite: 113]
	let { posts = [] }: { posts: Post[] } = $props();

	// Derived logic to split posts into visual and text-only categories [cite: 167, 186]
	let withImages = $derived(posts.filter((p) => p.thumbnail));
	let textOnly = $derived(posts.filter((p) => !p.thumbnail));
</script>

{#if withImages.length > 0}
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
		{#each withImages as post (post.slug)}
			{@const href = `/blog/${post.category}/${post.slug}`}
			<a
				{href}
				class="group relative block overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-800"
			>
				<div class="aspect-2/3 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
					<img
						src={post.thumbnail}
						alt={post.title}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>

				<div
					class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-4 pt-12"
				>
					<h3 class="text-lg font-bold leading-tight text-white transition-colors group-hover:text-gold">
						{post.title}
					</h3>
					<p class="mt-1 text-xs font-bold uppercase tracking-wide text-neutral-300">
						{post.category}
					</p>
				</div>
			</a>
		{/each}
	</div>
{/if}

{#if textOnly.length > 0}
	<div class="mt-16 space-y-8">
		<div class="flex items-center gap-4">
			<h2 class="font-serif text-2xl italic">Further Reflections</h2>
			<div class="h-px flex-1 bg-neutral-300 dark:bg-neutral-700"></div>
		</div>

		<div class="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
			{#each textOnly as post (post.slug)}
				{@const href = `/blog/${post.category}/${post.slug}`}
				<a
					{href}
					class="group flex flex-col border-l-4 border-neutral-300 p-4 transition-all hover:border-gold hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
				>
					<div class="mb-2 flex items-center gap-3">
						<span class="text-[10px] font-bold uppercase tracking-widest text-gold">
							{post.category}
						</span>
						{#if post.date}
							<span class="text-[10px] text-neutral-500">
								{new Date(post.date).toLocaleDateString(undefined, {
									year: 'numeric',
									month: 'short'
								})}
							</span>
						{/if}
					</div>

					<h3 class="my-0! text-xl font-bold transition-colors group-hover:text-gold">
						{post.title}
					</h3>

					{#if post.description}
						<p
							class="mb-0! mt-3 line-clamp-2 text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
						>
							{post.description}
						</p>
					{/if}
					
					<div class="mt-4 flex items-center text-xs font-bold uppercase tracking-tighter opacity-0 transition-opacity group-hover:opacity-100">
						Read Entry 
						<svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</div>
				</a>
			{/each}
		</div>
	</div>
{/if}

{#if posts.length === 0}
	<div class="py-20 text-center text-neutral-500">
		<p class="font-serif italic">The digital garden is currently empty.</p>
	</div>
{/if}