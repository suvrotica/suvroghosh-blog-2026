<script lang="ts">
	import HyperVector from '$lib/components/viz/HyperVector.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';

	let title = 'Visualizing Higher Dimensions';
	let description = 'A geometric approach to seeing R9 in R3 using subspace decomposition.';

    // Interactive State: A 9-Dimensional Vector
    let vector = $state([1.5, 0.5, 0.2, -1.0, 0.8, -0.5, 0.0, 1.2, -0.8]);

    // Sliders need to bind to specific indices
    function updateVal(i: number, e: Event) {
        const val = parseFloat((e.target as HTMLInputElement).value);
        const newVec = [...vector];
        newVec[i] = val;
        vector = newVec;
    }

    const dimensionLabels = [
        "x₁ (Time)", "x₂ (Mass)", "x₃ (Temp)", 
        "x₄ (Vel X)", "x₅ (Vel Y)", "x₆ (Vel Z)",
        "x₇ (Spin)", "x₈ (Charge)", "x₉ (Charm)"
    ];
</script>

<SEO {title} {description} />

<article class="container mx-auto py-12 max-w-4xl px-4">
	<header class="mb-10 text-center">
		<h1 class="mb-4 text-3xl md:text-5xl font-bold">{title}</h1>
		<p class="text-neutral-500 dark:text-neutral-400 font-mono text-sm uppercase tracking-widest">
			Dimensional Engineering
		</p>
	</header>

	<div class="prose dark:prose-invert max-w-none mb-12">
		<p>
			Our brains are hardwired for 3 dimensions. When we encounter a vector in $R^9$ (9 dimensions), 
            like a state in a physics simulation or a feature vector in an LLM, we usually stare at a list of numbers.
		</p>
        <p>
            But a list of numbers loses the <strong>geometric intuition</strong> of magnitude and direction.
            Standard projections (like tesseracts) smash everything into a confused shadow.
        </p>
        <p>
            The visualization below uses <strong>Subspace Decomposition</strong>. It breaks the 9D vector 
            into three 3D vectors. Imagine reading a long sentence three words at a time. Each cube represents 
            a "chunk" of that reality.
        </p>
	</div>

    <div class="my-8">
	    <HyperVector {vector} />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 p-6 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
        {#each [0, 1, 2] as cubeIndex}
            <div class="space-y-4">
                <h3 class="text-xs font-bold uppercase tracking-widest text-neutral-500 border-b border-neutral-300 dark:border-neutral-700 pb-2 mb-4">
                    Subspace {cubeIndex + 1} (Dims {cubeIndex*3 + 1}-{cubeIndex*3 + 3})
                </h3>
                
                {#each [0, 1, 2] as dimOffset}
                    {@const globalIndex = cubeIndex * 3 + dimOffset}
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between text-xs font-mono">
                            <span class="text-neutral-600 dark:text-neutral-400">
                                {dimensionLabels[globalIndex]}
                            </span>
                            <span class="font-bold text-neutral-900 dark:text-neutral-200">
                                {vector[globalIndex].toFixed(1)}
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min="-2" max="2" step="0.1" 
                            value={vector[globalIndex]}
                            oninput={(e) => updateVal(globalIndex, e)}
                            class="w-full h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-neutral-100"
                        />
                    </div>
                {/each}
            </div>
        {/each}
    </div>

    <div class="prose dark:prose-invert max-w-none mt-12">
        <h3>How to Read This</h3>
        <ul>
            <li><strong>Cube 1 (Left):</strong> Represents the first 3 dimensions. If this were a particle, this might be its Position $(x,y,z)$.</li>
            <li><strong>Cube 2 (Middle):</strong> Represents dimensions 4, 5, and 6. This might be Velocity $(vx, vy, vz)$.</li>
            <li><strong>Cube 3 (Right):</strong> Represents dimensions 7, 8, and 9. This could be internal properties like Spin or Color.</li>
        </ul>
        <p>
            By separating them, we preserve the exact magnitude and local direction of every component, 
            without the visual "noise" of projecting 9 lines onto a single 2D plane.
        </p>
    </div>
</article>