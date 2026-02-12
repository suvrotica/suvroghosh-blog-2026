<script lang="ts">
    /**
     * Svelte 5 Component to render R0-R3 vector spaces.
     * Fixed: Variable name 'viewBox' now matches SVG attribute for shorthand usage.
     */
    let { 
        space = 'r2', 
        vec = [0, 0, 0], 
        scale = 40,
        padding = 40 
    } = $props();

    // --- 3D Projection Logic ---
    const angleX = 210 * (Math.PI / 180);
    const angleY = -30 * (Math.PI / 180);
    
    function project3D(x: number, y: number, z: number) {
        const ux = Math.cos(angleX);
        const uy = Math.sin(angleX);
        const vx = Math.cos(angleY);
        const vy = Math.sin(angleY);
        return { 
            x: (x * ux + y * vx) * scale, 
            y: (x * uy + y * vy - z) * scale 
        };
    }

    // --- Data Derivation ---
    // 1. Compute geometry first
    let geom = $derived.by(() => {
        const v2d = { x: vec[0] * scale, y: -vec[1] * scale };
        
        // 3D Points
        const p = project3D(vec[0], vec[1], vec[2]);
        const pX = project3D(vec[0], 0, 0); 
        const pY = project3D(0, vec[1], 0);
        const pZ = project3D(0, 0, vec[2]);
        const pXY = project3D(vec[0], vec[1], 0);
        
        // 3D Axes Ends (for display)
        const axX = project3D(4,0,0);
        const axY = project3D(0,4,0);
        const axZ = project3D(0,0,4);

        return { v2d, v3d: { end: p, shadow: pXY, axisX: pX, axisY: pY, axisZ: pZ }, axes: { x: axX, y: axY, z: axZ } };
    });

    // 2. Calculate Extents (Bounding Box)
    // RENAMED to viewBox (camelCase) to match SVG attribute
    let viewBox = $derived.by(() => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        // Helper to expand bounds
        function add(x: number, y: number, r: number = 0) {
            if (x - r < minX) minX = x - r;
            if (x + r > maxX) maxX = x + r;
            if (y - r < minY) minY = y - r;
            if (y + r > maxY) maxY = y + r;
        }

        // Always include origin
        add(0, 0);

        if (space === 'r0') {
            add(0, 0, 10); // Simple radius for the point
        }
        else if (space === 'r1') {
            // Include number line range [-3, 3]
            [-3, 3].forEach(t => add(t * scale, 0));
            add(geom.v2d.x, 0, 10); // Vector tip
            add(geom.v2d.x, -25); // Text padding
        } 
        else if (space === 'r2') {
            // Axes
            add(-10, 0); add(135, 0); // X axis
            add(0, 10); add(0, -135); // Y axis
            // Vector
            add(geom.v2d.x, geom.v2d.y, 5);
            add(geom.v2d.x + 60, geom.v2d.y - 20); // Label padding
        } 
        else if (space === 'r3') {
            // Axes
            [geom.axes.x, geom.axes.y, geom.axes.z].forEach(p => add(p.x, p.y));
            // Vector tip
            add(geom.v3d.end.x, geom.v3d.end.y, 5);
            add(geom.v3d.end.x, geom.v3d.end.y - 30); // Label padding
        }

        // Apply padding
        const w = (maxX - minX) + (padding * 2);
        const h = (maxY - minY) + (padding * 2);
        const x = minX - padding;
        const y = minY - padding;

        return `${x} ${y} ${w} ${h}`;
    });

</script>

<div class="my-8 w-full flex justify-center not-prose">
    <div class="border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900 shadow-sm overflow-hidden w-full max-w-[400px]">
        
        <svg {viewBox} class="w-full h-auto max-h-[400px] overflow-visible font-mono text-xs">
            
            <style>
                /* Halo effect for text readability over lines */
                .halo {
                    paint-order: stroke fill;
                    stroke: var(--bg-color, white);
                    stroke-width: 4px;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
                /* Dark mode detection for halo color */
                @media (prefers-color-scheme: dark) {
                    .halo { --bg-color: #171717; }
                }
                /* Fallback for class-based dark mode */
                :global(.dark) .halo { --bg-color: #171717; }
            </style>

            {#if space === 'r0'}
                <circle r="4" fill="currentColor" class="text-neutral-900 dark:text-neutral-100" />
                <text y="20" text-anchor="middle" class="fill-neutral-500 halo">R⁰ (Origin)</text>
            {/if}

            {#if space === 'r1'}
                <line x1="-120" y1="0" x2="120" y2="0" stroke="currentColor" class="text-neutral-300" marker-end="url(#arrow)" />
                {#each [-3,-2,-1,0,1,2,3] as t}
                    <line x1={t*scale} y1="-3" x2={t*scale} y2="3" stroke="currentColor" class="text-neutral-400" />
                    <text x={t*scale} y="15" text-anchor="middle" class="fill-neutral-500 halo">{t}</text>
                {/each}
                <line x1="0" y1="0" x2={geom.v2d.x} y2="0" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow-active)" />
                <circle cx={geom.v2d.x} cy="0" r="3" fill="#f59e0b" />
                <text x={geom.v2d.x} y="-15" text-anchor="middle" class="fill-amber-600 font-bold halo">v=({vec[0]})</text>
            {/if}

            {#if space === 'r2'}
                <line x1="-10" y1="0" x2="130" y2="0" stroke="currentColor" class="text-neutral-300" marker-end="url(#arrow)" />
                <text x="135" y="4" class="fill-neutral-400 halo">x</text>
                <line x1="0" y1="10" x2="0" y2="-130" stroke="currentColor" class="text-neutral-300" marker-end="url(#arrow)" />
                <text x="-4" y="-135" class="fill-neutral-400 halo">y</text>
                
                <line x1={geom.v2d.x} y1="0" x2={geom.v2d.x} y2={geom.v2d.y} stroke="currentColor" stroke-dasharray="4" class="text-neutral-300" />
                <line x1="0" y1={geom.v2d.y} x2={geom.v2d.x} y2={geom.v2d.y} stroke="currentColor" stroke-dasharray="4" class="text-neutral-300" />
                
                <line x1="0" y1="0" x2={geom.v2d.x} y2={geom.v2d.y} stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow-active)" />
                <circle cx={geom.v2d.x} cy={geom.v2d.y} r="3" fill="#f59e0b" />
                <text x={geom.v2d.x + 10} y={geom.v2d.y - 10} class="fill-amber-600 font-bold halo">v=({vec[0]}, {vec[1]})</text>
            {/if}

            {#if space === 'r3'}
                <line x1="0" y1="0" x2={geom.axes.x.x} y2={geom.axes.x.y} stroke="currentColor" class="text-neutral-300" marker-end="url(#arrow)" />
                <text x={geom.axes.x.x + 10} y={geom.axes.x.y} class="fill-neutral-400 halo">x</text>
                
                <line x1="0" y1="0" x2={geom.axes.y.x} y2={geom.axes.y.y} stroke="currentColor" class="text-neutral-300" marker-end="url(#arrow)" />
                <text x={geom.axes.y.x + 10} y={geom.axes.y.y} class="fill-neutral-400 halo">y</text>
                
                <line x1="0" y1="0" x2={geom.axes.z.x} y2={geom.axes.z.y} stroke="currentColor" class="text-neutral-300" marker-end="url(#arrow)" />
                <text x={geom.axes.z.x} y={geom.axes.z.y - 10} class="fill-neutral-400 halo">z</text>

                <path d="M {geom.v3d.axisX.x} {geom.v3d.axisX.y} L {geom.v3d.shadow.x} {geom.v3d.shadow.y} L {geom.v3d.axisY.x} {geom.v3d.axisY.y}" fill="none" stroke="currentColor" stroke-dasharray="3" class="text-neutral-200" />
                <line x1={geom.v3d.shadow.x} y1={geom.v3d.shadow.y} x2={geom.v3d.end.x} y2={geom.v3d.end.y} stroke="currentColor" stroke-dasharray="3" class="text-neutral-200" />

                <line x1="0" y1="0" x2={geom.v3d.end.x} y2={geom.v3d.end.y} stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow-active)" />
                <circle cx={geom.v3d.end.x} cy={geom.v3d.end.y} r="3" fill="#f59e0b" />
                
                <text x={geom.v3d.end.x} y={geom.v3d.end.y - 15} text-anchor="middle" class="fill-amber-600 font-bold halo">v=({vec[0]}, {vec[1]}, {vec[2]})</text>
            {/if}

            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" class="fill-neutral-300" />
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
            </defs>
        </svg>
    </div>
</div>