<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	// Svelte 5 Props
	let { 
		vector = [1, 1, 1, -0.5, 0.8, 0.2, 0.3, -0.9, 0.1], // Default 9D vector
		labels = [] 
	} = $props();

	let container = $state<HTMLDivElement>();
	let canvas = $state<HTMLCanvasElement>();
	
	// Three.js instances
	let renderer: THREE.WebGLRenderer;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let controls: OrbitControls;
	let animationId: number;
    let gridHelpers: THREE.Group[] = [];
    let vectorArrows: THREE.ArrowHelper[] = [];

	// Derived state for chunks
	let chunks = $derived.by(() => {
		const result = [];
		for (let i = 0; i < vector.length; i += 3) {
			// Pad with zeros if we don't have a full triplet
			const x = vector[i] ?? 0;
			const y = vector[i + 1] ?? 0;
			const z = vector[i + 2] ?? 0;
			result.push({ x, y, z, index: i });
		}
		return result;
	});

	// Constants
	const CUBE_SIZE = 2;
	const SPACING = 3.5; // Distance between cube centers

	function init() {
		if (!canvas || !container) return;

		// 1. Setup Scene
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x171717); // neutral-900

		// 2. Setup Camera
		const width = container.clientWidth;
		const height = container.clientHeight;
		camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
		camera.position.set(5, 5, 10);

		// 3. Setup Renderer
		renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// 4. Controls
		controls = new OrbitControls(camera, canvas);
		controls.enableDamping = true;
        controls.dampingFactor = 0.05;

		// 5. Lights (Simple ambient + directional)
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);
		const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
		dirLight.position.set(5, 10, 7);
		scene.add(dirLight);

        // Initial Draw
        updateScene();
		animate();
	}

    function updateScene() {
        if (!scene) return;

        // Clear previous meshes
        gridHelpers.forEach(h => scene.remove(h));
        vectorArrows.forEach(a => scene.remove(a));
        gridHelpers = [];
        vectorArrows = [];

        // Rebuild based on chunks
        chunks.forEach((chunk, i) => {
            const offsetX = i * SPACING;
            
            // A. The "Subspace" Cube (Wireframe)
            const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
            const edges = new THREE.EdgesGeometry(geometry);
            const material = new THREE.LineBasicMaterial({ color: 0x404040, linewidth: 1 });
            const cube = new THREE.LineSegments(edges, material);
            
            cube.position.set(offsetX, 0, 0);
            scene.add(cube);
            // @ts-ignore
            gridHelpers.push(cube);

            // B. The Vector Arrow
            const dir = new THREE.Vector3(chunk.x, chunk.y, chunk.z);
            const length = dir.length();
            
            // Normalize for direction, handle zero vector
            if (length > 0.001) {
                dir.normalize();
                const origin = new THREE.Vector3(offsetX, 0, 0); // Center of cube
                
                // Color mapping: 
                // X-heavy = Red, Y-heavy = Green, Z-heavy = Blue
                const r = 0.5 + 0.5 * Math.abs(dir.x);
                const g = 0.5 + 0.5 * Math.abs(dir.y);
                const b = 0.5 + 0.5 * Math.abs(dir.z);
                const color = new THREE.Color(r, g, b);

                const arrowHelper = new THREE.ArrowHelper(
                    dir, 
                    origin, 
                    length, 
                    color.getHex(), 
                    0.2 * length, // head length scaled by magnitude 
                    0.1 * length  // head width
                );
                scene.add(arrowHelper);
                vectorArrows.push(arrowHelper);
            }

            // C. Axis Helper inside the cube (Tiny reference)
            const axesHelper = new THREE.AxesHelper(0.5);
            axesHelper.position.set(offsetX - CUBE_SIZE/2, -CUBE_SIZE/2, -CUBE_SIZE/2);
            scene.add(axesHelper);
            // @ts-ignore
            gridHelpers.push(axesHelper);
        });

        // Center camera on the whole chain roughly
        if (controls) {
            controls.target.set((chunks.length - 1) * SPACING / 2, 0, 0);
        }
    }

    // Effect: Re-render when vector changes
    $effect(() => {
        if (vector) {
            updateScene();
        }
    });

	function animate() {
		animationId = requestAnimationFrame(animate);
		controls.update();
		renderer.render(scene, camera);
	}

	function handleResize() {
		if (!container || !camera || !renderer) return;
		const width = container.clientWidth;
		const height = container.clientHeight;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
	}

	onMount(() => {
		init();
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationId);
            if (renderer) renderer.dispose();
		}
	});
</script>

<div 
    bind:this={container} 
    class="w-full h-[400px] md:h-[500px] rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-hidden relative shadow-inner"
>
    <canvas bind:this={canvas} class="outline-none"></canvas>
    
    <div class="absolute bottom-4 left-4 pointer-events-none text-[10px] font-mono text-neutral-500 uppercase tracking-widest bg-white/80 dark:bg-black/50 p-2 rounded backdrop-blur-sm">
        Left Click: Rotate • Right Click: Pan • Scroll: Zoom
    </div>
</div>