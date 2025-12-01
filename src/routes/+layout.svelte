<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
 	import { injectAnalytics } from '@vercel/analytics/sveltekit';
  	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  	import { dev } from '$app/environment';
	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


{@render children()}