<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	// Svelte 5 Runes State
	let width = $state(800);
	let height = $state(600);
	let svgContainer: HTMLDivElement | undefined = $state();
	let processedData = $state<{ children: { name: string; value: number }[] } | null>(null);

	// Stop words to filter out (basic list)
	const stopWords = new Set([
		'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
		'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'as', 'if', 'from', 'that',
		'this', 'these', 'those', 'it', 'he', 'she', 'they', 'we', 'i', 'you', 'me', 'him', 'her',
		'them', 'us', 'my', 'your', 'his', 'her', 'their', 'our', 'mine', 'yours', 'theirs',
		'ours', 'myself', 'yourself', 'himself', 'herself', 'themselves', 'ourselves', 'what',
		'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'can', 'could', 'will',
		'would', 'shall', 'should', 'may', 'might', 'must', 'do', 'does', 'did', 'have', 'has',
		'had', 'having', 'not', 'no', 'nor', 'so', 'too', 'very', 'just', 'only', 'than', 'then',
		'now', 'here', 'there'
	]);

	function extractAndProcessText() {
		// 1. Target the article content (matching your TTS logic)
		const article = document.querySelector('article') || document.querySelector('.prose');
		if (!article) return;

		// 2. Clone to avoid messing with DOM, remove scripts/styles
		const clone = article.cloneNode(true) as HTMLElement;
		clone.querySelectorAll('script, style, button, svg, .no-read').forEach((el) => el.remove());

		const text = clone.innerText || '';

		// 3. Tokenize and Count
		const words = text
			.toLowerCase()
			.replace(/[^\w\s]/g, '') // Remove punctuation
			.split(/\s+/)
			.filter((w) => w.length > 3 && !stopWords.has(w)); // Filter small words & stop words

		const frequency: Record<string, number> = {};
		words.forEach((w) => {
			frequency[w] = (frequency[w] || 0) + 1;
		});

		// 4. Format for D3 Hierarchy (Top 50 words)
		const children = Object.entries(frequency)
			.map(([name, value]) => ({ name, value }))
			.sort((a, b) => b.value - a.value)
			.slice(0, 50);

		processedData = { children };
	}

	// Calculate the Pack Layout whenever data or dimensions change
	let root = $derived.by(() => {
		if (!processedData) return null;

		const hierarchy = d3.hierarchy(processedData)
			.sum((d: any) => d.value)
			.sort((a: any, b: any) => b.value - a.value);

		const pack = d3.pack()
			.size([width - 4, height - 4])
			.padding(3);

		return pack(hierarchy);
	});

	// Color Scale
	const color = d3.scaleLinear<string>()
		.domain([0, 5]) // Value range estimate
		.range(["#cbd5e1", "#ca8a04"]); // Slate-300 to Gold (ish)

	$effect(() => {
		// Run once on mount to get text
		extractAndProcessText();
		
		// Resize observer for responsiveness
		if (svgContainer) {
			const resizeObserver = new ResizeObserver(entries => {
				for (let entry of entries) {
					width = entry.contentRect.width;
					// Keep aspect ratio or set fixed height
					height = Math.min(width, 600); 
				}
			});
			resizeObserver.observe(svgContainer);
			return () => resizeObserver.disconnect();
		}
	});

</script>

<div class="interactive-component-wrapper not-prose" bind:this={svgContainer}>
	<div class="mb-4 text-center">
		<h4 class="text-xl font-bold font-serif text-neutral-800 dark:text-neutral-200">
			Post Anatomy
		</h4>
		<p class="text-xs font-mono uppercase tracking-widest text-neutral-500">
			Frequency Analysis
		</p>
	</div>

	{#if root}
		<svg {width} {height} class="mx-auto overflow-visible" viewBox="{-2} {-2} {width} {height}">
			{#each root.leaves() as leaf}
				<g transform="translate({leaf.x},{leaf.y})" class="group cursor-pointer transition-opacity hover:opacity-80">
					<title>{leaf.data.name}: {leaf.data.value} occurrences</title>
					
					<circle
						r={leaf.r}
						fill={color(leaf.depth)}
						class="fill-neutral-200 stroke-neutral-300 dark:fill-neutral-800 dark:stroke-neutral-700 transition-colors duration-300 group-hover:fill-gold/20 group-hover:stroke-gold"
					/>
					
					<clipPath id="clip-{leaf.data.name}">
						<circle r={leaf.r} />
					</clipPath>

					{#if leaf.r > 15}
						<text
							clip-path="url(#clip-{leaf.data.name})"
							class="font-sans font-bold text-neutral-700 dark:text-neutral-300 pointer-events-none text-center select-none"
							style="font-size: {Math.min(2 * leaf.r, (2 * leaf.r - 8) / Math.max(1, leaf.data.name.length / 2))}px;"
							dy="0.35em"
							text-anchor="middle"
						>
							{leaf.data.name}
						</text>
					{/if}
				</g>
			{/each}
		</svg>
	{:else}
		<div class="h-64 flex items-center justify-center text-neutral-400 animate-pulse">
			Scanning content...
		</div>
	{/if}
</div>
