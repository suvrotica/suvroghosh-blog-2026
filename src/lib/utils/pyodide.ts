// src/lib/utils/pyodide.ts
import { browser } from '$app/environment';

// ---------------------------------------------------------
// FIX: Extend the Window interface to include loadPyodide
// ---------------------------------------------------------
declare global {
    interface Window {
        loadPyodide: (config?: any) => Promise<any>;
        // We also add this for the plotting hack in the component
        pyodideMplTarget?: HTMLElement | null;
    }
}

let pyodidePromise: Promise<any> | null = null;

export async function loadPyodide() {
    if (!browser) return null;
    
    if (!pyodidePromise) {
        pyodidePromise = (async () => {
            console.log('Initializing Pyodide...');
            
            // 1. Load the script tag dynamically
            if (!window.loadPyodide) {
                await new Promise<void>((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error('Failed to load Pyodide script'));
                    document.head.appendChild(script);
                });
            }

            // 2. Initialize Pyodide
            // TypeScript is now happy because we declared it above
            const pyodide = await window.loadPyodide();
            
            // 3. Pre-load essential packages for ML/Math
            // This prevents "Micropip install" delays during the first run
            await pyodide.loadPackage(['numpy', 'matplotlib']);
            
            return pyodide;
        })();
    }
    
    return pyodidePromise;
}