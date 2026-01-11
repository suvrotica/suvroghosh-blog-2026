<script lang="ts">
	let { numbers = $bindable(), generate } = $props();
	
	let container = $state<HTMLDivElement>();
	let width = $state(0);
	let height = $state(0);

	// Derived grid dimensions based on container size
	const cellSize = 55;
	let cols = $derived(Math.max(4, Math.floor(width / cellSize)));
	let rows = $derived(Math.max(4, Math.floor(height / cellSize)));
	let count = $derived(cols * rows);

	// Regenerate if the grid capacity changes significantly
	$effect(() => {
		if (count > 0 && numbers.length !== count) {
			generate(count);
		}
	});
</script>

<div class="flex flex-col h-[50vh] min-h-[350px] w-full gap-4">
	<div class="flex justify-between items-end">
		<span class="text-xs font-mono uppercase tracking-widest text-neutral-500">
			N = {numbers.length} Random Samples
		</span>
		<button onclick={() => generate(count)} class="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity">
			Re-randomize
		</button>
	</div>

	<div class="flex-1 min-h-0" bind:this={container} bind:clientWidth={width} bind:clientHeight={height}>
		<div class="benford-grid-container" style="grid-template-columns: repeat({cols}, minmax(0, 1fr));">
			{#each numbers as num}
				<div class="benford-cell">
					{num}
				</div>
			{/each}
		</div>
	</div>
</div>
