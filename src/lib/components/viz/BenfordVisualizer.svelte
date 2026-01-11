<script lang="ts">
	import BenfordGrid from './BenfordGrid.svelte';
	import BenfordChart from './BenfordChart.svelte';

	let numbers = $state<number[]>([]);

	function generate(count: number) {
		// To demonstrate Benford's Law, we need data across multiple orders of magnitude
		numbers = Array.from({ length: count }, () => {
			const magnitude = Math.pow(10, Math.random() * 6); 
			return Math.floor(Math.random() * magnitude) + 1;
		});
	}
</script>

<div class="not-prose my-12 space-y-16">
	<BenfordGrid bind:numbers {generate} />
	<BenfordChart {numbers} />
</div>
