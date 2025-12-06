<script lang="ts">
	import { page } from '$app/stores';
	$: categories = $page.data.categories || [];
    $: currentPath = $page.url.pathname;
</script>

<aside class="h-full p-4 overflow-y-auto">
	<nav class="space-y-8">
        <div class="sidebar-group space-y-2">
			<a href="/blog" 
               class="sidebar-topic block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-gold"
               class:text-gold={currentPath === '/blog'}>
				All Posts
			</a>
			<a href="/gallery" 
               class="sidebar-topic block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-gold"
               class:text-gold={currentPath === '/gallery'}>
				Gallery
			</a>
		</div>

        {#each categories as category}
			<div class="sidebar-group mb-6">
				<div class="sidebar-topic mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
					{category.name}
				</div>
				<ul class="space-y-1">
					{#each category.articles as article}
						<li>
							<a
								href="/blog/{category.name}/{article.slug}"
								class="sidebar-link block px-3 py-2 rounded-md text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all border-l-2 border-transparent"
                                class:border-gold={currentPath.includes(article.slug)}
                                class:bg-neutral-200={currentPath.includes(article.slug)}
                                class:dark:bg-neutral-800={currentPath.includes(article.slug)}
							>
								{article.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
</aside>