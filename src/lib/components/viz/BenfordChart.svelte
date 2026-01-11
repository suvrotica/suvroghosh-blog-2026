<script lang="ts">
	let { numbers = [] } = $props();

	// Benford's Law: P(d) = log10(1 + 1/d)
	const EXPECTED = [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6];

	let distribution = $derived.by(() => {
		const counts = Array(9).fill(0);
		if (numbers.length === 0) return counts;

		numbers.forEach((n: number) => {
			const firstDigit = parseInt(n.toString().replace(/[^1-9]/g, '')[0]);
			if (firstDigit >= 1 && firstDigit <= 9) {
				counts[firstDigit - 1]++;
			}
		});

		return counts.map((c) => (c / numbers.length) * 100);
	});
</script>

<div class="w-full py-8">
	<div class="relative h-64 flex items-end gap-2 px-2 border-b border-neutral-300 dark:border-neutral-700">
		{#each Array(9) as _, i}
			{@const actual = distribution[i]}
			{@const target = EXPECTED[i]}
			
			<div class="flex-1 flex flex-col items-center group relative h-full justify-end">
				<div class="chart-bar-actual" style="height: {actual}%;">
					<div class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
						{actual.toFixed(1)}%
					</div>
				</div>
				
				<div class="chart-marker-expected" style="bottom: {target}%;" title="Expected: {target}%"></div>

				<span class="absolute -bottom-8 font-mono text-sm font-bold">{i + 1}</span>
			</div>
		{/each}
	</div>
	
	<div class="mt-12 flex justify-center gap-8 text-[10px] font-mono uppercase tracking-tighter">
		<div class="flex items-center gap-2">
			<div class="w-3 h-3 bg-neutral-900 dark:bg-neutral-100"></div>
			<span>Generated Data</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-3 h-0.5 bg-amber-500"></div>
			<span>Benford's Law</span>
		</div>
	</div>
</div>
