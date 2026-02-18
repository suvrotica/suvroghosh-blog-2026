<script lang="ts">
    import { onMount } from 'svelte';
    import { loadPyodide } from '$lib/utils/pyodide';
    import { generateUUID } from '$lib/utils/uuid'; // Using your existing utility

    let { 
        code = "# Write your Python code here\nimport numpy as np\nprint(np.array([1, 2]))",
        height = "300px" 
    } = $props();

    // State
    let isReady = $state(false);
    let isRunning = $state(false);
    let output = $state<string>("");
    let error = $state<string | null>(null);
    let pyodide: any = null;
    
    // Unique ID for Matplotlib target
    const plotId = `plot-${generateUUID()}`;

    onMount(async () => {
        try {
            pyodide = await loadPyodide();
            isReady = true;
        } catch (e) {
            error = "Failed to load Python environment.";
            console.error(e);
        }
    });

    async function runCode() {
        if (!pyodide || isRunning) return;
        
        isRunning = true;
        error = null;
        output = "";

        // 1. Clear previous plots
        const plotDiv = document.getElementById(plotId);
        if (plotDiv) plotDiv.innerHTML = '';

        try {
            // 2. Setup stdout capture and plotting backend
            pyodide.setStdout({ batched: (msg: string) => output += msg + '\n' });
            
            // 3. The magic boilerplate to make Matplotlib render into our specific div
            const boilerplate = `
import matplotlib
matplotlib.use("module://matplotlib_pyodide.html5_canvas_backend")
import matplotlib.pyplot as plt
import numpy as np

# Reset figure to ensure clean slate
plt.clf() 
from js import document

# Create a designated function to handle plotting
def show_plot():
    div = document.getElementById("${plotId}")
    document.pyodideMplTarget = div
    plt.show()
`;
            
            // 4. Run user code wrapped with error handling
            // We append show_plot() if the user likely created a plot but didn't show it
            const finalCode = `${boilerplate}\n${code}\n\n# Auto-show plot if plt is used\nif 'plt' in locals(): show_plot()`;
            
            await pyodide.runPythonAsync(finalCode);

        } catch (err: any) {
            error = err.toString();
        } finally {
            isRunning = false;
        }
    }
</script>

<div class="my-8 overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
    <div class="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800">
        <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded-full bg-red-500"></div>
            <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div class="h-3 w-3 rounded-full bg-green-500"></div>
            <span class="ml-2 font-mono text-xs font-bold text-neutral-500">Python 3.11 (Pyodide)</span>
        </div>
        
        <button 
            onclick={runCode}
            disabled={!isReady || isRunning}
            class="flex items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            {#if !isReady}
                <span>Loading Pyodide...</span>
            {:else if isRunning}
                <svg class="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Running...
            {:else}
                ▶ Run Code
            {/if}
        </button>
    </div>

    <div class="flex flex-col md:flex-row h-[500px]">
        <div class="flex-1 border-b border-neutral-200 md:border-b-0 md:border-r dark:border-neutral-800">
            <textarea 
                bind:value={code}
                class="h-full w-full resize-none border-none bg-neutral-50 p-4 font-mono text-sm leading-relaxed text-neutral-800 outline-hidden dark:bg-neutral-950 dark:text-neutral-300 focus:ring-0"
                spellcheck="false"
            ></textarea>
        </div>

        <div class="flex-1 flex flex-col min-w-0 bg-white dark:bg-neutral-900">
            {#if output || error}
                <div class="max-h-[40%] overflow-auto border-b border-neutral-200 bg-neutral-900 p-4 font-mono text-xs dark:border-neutral-800">
                    {#if output}
                        <pre class="text-green-400 whitespace-pre-wrap">{output}</pre>
                    {/if}
                    {#if error}
                        <pre class="text-red-400 whitespace-pre-wrap mt-2">{error}</pre>
                    {/if}
                </div>
            {/if}

            <div id={plotId} class="flex-1 flex items-center justify-center p-4 overflow-hidden bg-white dark:bg-white/5">
                {#if !isReady}
                     <span class="text-xs text-neutral-400 animate-pulse">Initializing Environment...</span>
                {:else if !output && !error && document.getElementById(plotId)?.children.length === 0}
                    <span class="text-xs text-neutral-400">Plot area ready</span>
                {/if}
            </div>
        </div>
    </div>
</div>