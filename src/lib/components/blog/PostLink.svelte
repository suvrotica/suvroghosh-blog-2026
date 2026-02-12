<script lang="ts">
    /**
     * A clean, inline navigation chip to link related topics.
     * Usage: <Pl href="/blog/maths/vectors-for-everyone">Read: Vectors</Pl>
     */
    let { 
        href, 
        children 
    } = $props();
</script>

<a 
    {href}
    class="group inline-flex items-center gap-3 pr-4 pl-1.5 py-1.5 my-2 mx-1 rounded-full 
           bg-neutral-100 dark:bg-neutral-800 
           border border-neutral-300 dark:border-neutral-700 
           hover:border-amber-500 dark:hover:border-amber-500 
           hover:bg-white dark:hover:bg-neutral-700 
           hover:shadow-md hover:-translate-y-0.5
           transition-all duration-200 ease-out no-underline"
>
    <span class="flex items-center justify-center w-6 h-6 rounded-full 
                 bg-neutral-200 dark:bg-neutral-700 
                 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50
                 text-neutral-500 dark:text-neutral-400 
                 group-hover:text-amber-600 dark:group-hover:text-amber-400 
                 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" />
        </svg>
    </span>

    <span class="text-xs font-bold font-mono uppercase tracking-wide 
                 text-neutral-600 dark:text-neutral-300 
                 group-hover:text-neutral-900 dark:group-hover:text-white">
        {@render children()}
    </span>
</a>