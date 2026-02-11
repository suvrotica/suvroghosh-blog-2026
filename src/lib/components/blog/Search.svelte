<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import type { SearchPost } from '$lib/server/posts';

	// Svelte 5 Runes for State
	let query = $state('');
	let allPosts = $state<SearchPost[]>([]);
	let isFocused = $state(false);
	let inputElement: HTMLInputElement;

	// Derived state for filtering
	// We only filter if query is 2+ chars to reduce noise
	let results = $derived(
		query.length < 2 
			? [] 
			: allPosts.filter(post => post.searchTerms.includes(query.toLowerCase()))
	);

	// Fetch index only on client-side mount
	onMount(async () => {
		try {
			const res = await fetch('/api/search');
			if (res.ok) {
				allPosts = await res.json();
			}
		} catch (error) {
			console.error('Failed to load search index:', error);
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			query = '';
			inputElement.blur();
		}
	}
</script>

<div class="relative w-full max-w-md mx-auto group">
	<div class="relative text-neutral-500 focus-within:text-gold transition-colors">
		<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
			<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
			</svg>
		</div>

		<input
			bind:this={inputElement}
			bind:value={query}
			onkeydown={handleKeydown}
			onfocus={() => isFocused = true}
			onblur={() => setTimeout(() => isFocused = false, 200)} 
			type="text"
			placeholder="Search..."
			class="block w-full pl-10 pr-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg leading-5 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:bg-white dark:focus:bg-neutral-900 focus:ring-2 focus:ring-gold/50 focus:border-gold sm:text-sm transition-all shadow-sm"
		/>
	</div>

	{#if query.length >= 2 && (isFocused || results.length > 0)}
		<div 
			transition:slide={{ duration: 200 }}
			class="absolute z-50 mt-2 w-full bg-white dark:bg-neutral-900 rounded-md shadow-xl border border-neutral-200 dark:border-neutral-700 max-h-96 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800"
		>
			{#if results.length > 0}
				{#each results as post}
					<a 
						href={post.slug}
						onclick={() => query = ''} 
						class="block px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
					>
						<p class="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">{post.title}</p>
						<div class="flex items-center justify-between mt-1">
							<span class="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 flex-1 mr-2">{post.description}</span>
							<span class="text-[10px] uppercase tracking-wider font-bold text-gold shrink-0">{post.category}</span>
						</div>
					</a>
				{/each}
			{:else}
				<div class="px-4 py-4 text-sm text-neutral-500 text-center italic">
					No posts found for "{query}"
				</div>
			{/if}
		</div>
	{/if}
</div>