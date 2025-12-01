<script lang="ts">
    import '../app.css';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { dev } from '$app/environment';
    
    // --- NEW IMPORTS FOR ANALYTICS ---
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state'; // Using Svelte 5 state!

    let { children } = $props();

    // Vercel Tools
    injectAnalytics({ mode: dev ? 'development' : 'production' });
    injectSpeedInsights();

    // --- CUSTOM ANALYTICS LOGIC ---
    // This runs after every navigation completes
    afterNavigate(() => {
        // Don't log during development to keep DB clean
        if (dev) return;

        const payload = {
            path: page.url.pathname, // Use .pathname, not .href to strip query params if desired
            referrer: document.referrer,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        };

        // sendBeacon is better for analytics (doesn't block page unload)
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        const sent = navigator.sendBeacon('/api/log-visit', blob);

        // Fallback to standard fetch if sendBeacon fails
        if (!sent) {
            fetch('/api/log-visit', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            });
        }
    });
</script>

{@render children()}