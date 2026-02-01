<script>
	import { onMount, onDestroy } from 'svelte';

	let speaking = false;
	let paused = false;
	let supported = false;
	
	/** @type {SpeechSynthesisUtterance} */
	let utterance;
	
	let progress = 0;
	
	/** @type {any} */
	let progressInterval;     // Updates the UI bar
	/** @type {any} */
	let keepAliveInterval;    // Fixes the Android 15-second bug

	// DEBUGGING: Set to true to see logs on screen
	let debugMode = true; 
	let debugLog = "";

	/** @param {string} msg */
	function log(msg) {
		console.log(msg);
		if (debugMode) debugLog = msg; 
	}

	const icons = {
		play: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z",
		pause: "M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z",
		stop: "M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
	};

	onMount(() => {
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			supported = true;
			
			// Force load voices immediately
			window.speechSynthesis.getVoices();
			
			// Listen for async voice loading (Android specific)
			window.speechSynthesis.onvoiceschanged = () => {
				const v = window.speechSynthesis.getVoices();
				log(`Voices Loaded: ${v.length}`);
			};
		}
		return () => cleanup();
	});

	function getText() {
		// Synchronous DOM grab - fast enough to not break user gesture
		const article = document.querySelector('article') || document.querySelector('.prose') || document.body;
		
		// @ts-ignore
		const clone = /** @type {HTMLElement} */ (article.cloneNode(true));
		
		// Clean up
		const self = clone.querySelector('[data-tts-exclude]');
		if (self) self.remove();
		// @ts-ignore
		clone.querySelectorAll('button, script, style, .no-read').forEach(el => el.remove());

		return clone.innerText || "";
	}

	function speak() {
		if (!supported) return;

		// 1. CRITICAL ANDROID FIX: Synchronous Cancel
		// We must cancel before doing anything else to clear the audio stack.
		window.speechSynthesis.cancel();

		// Handle Toggle Logic
		if (speaking && !paused) {
			log("User Paused");
			window.speechSynthesis.pause();
			paused = true;
			return;
		}

		if (paused) {
			log("User Resumed");
			window.speechSynthesis.resume();
			paused = false;
			return;
		}

		// 2. GET TEXT
		const text = getText();
		if (!text.trim()) {
			log("Error: No text found");
			return;
		}

		// 3. SETUP UTTERANCE
		utterance = new SpeechSynthesisUtterance(text);
		
		// Get voices synchronously - don't await!
		const voices = window.speechSynthesis.getVoices();
		
		// Android Preference: "Google US English" > Any US English > Default
		const voice = 
			voices.find(v => v.name.includes("Google US English")) || 
			voices.find(v => v.lang === "en-US") || 
			voices[0];

		if (voice) {
			utterance.voice = voice;
			// Keep rate normal on mobile to prevent artifacts
			utterance.rate = 1.0; 
			log(`Selected: ${voice.name}`);
		}

		// 4. EVENT HANDLERS
		utterance.onstart = () => { 
			log("Audio Started"); 
			speaking = true; 
			paused = false; 
			startKeepAlive();
		};

		// @ts-ignore
		utterance.onend = () => { 
			log("Audio Ended"); 
			cleanup();
		};

		// @ts-ignore
		utterance.onerror = (e) => { 
			log(`TTS Error: ${e.error}`); 
			cleanup();
		};

		utterance.onboundary = (event) => {
			const len = text.length;
			if (len > 0) progress = (event.charIndex / len) * 100;
		};

		// 5. FIRE IMMEDIATELY (Same Call Stack)
		log("Sending to Engine...");
		window.speechSynthesis.speak(utterance);
		
		// Fallback UI updater in case onboundary fails (common on Android)
		if (progressInterval) clearInterval(progressInterval);
		progressInterval = setInterval(() => {
			if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
				// Artificial progress if the event isn't firing
				if (progress < 99) progress += 0.1;
			}
		}, 100);
	}

	// The "Poker" - Fixes Chrome Android 15-second timeout
	function startKeepAlive() {
		if (keepAliveInterval) clearInterval(keepAliveInterval);
		
		keepAliveInterval = setInterval(() => {
			if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
				log("Keep-Alive Poke");
				window.speechSynthesis.pause();
				window.speechSynthesis.resume();
			}
		}, 10000); // Poke every 10 seconds
	}

	function cleanup() {
		speaking = false;
		paused = false;
		progress = 0;
		if (progressInterval) clearInterval(progressInterval);
		if (keepAliveInterval) clearInterval(keepAliveInterval);
		// Don't cancel here or it cuts off the very end
	}

	function stop() {
		if (typeof window !== 'undefined') {
			window.speechSynthesis.cancel();
			cleanup();
			log("Stopped");
		}
	}
</script>

{#if supported}
	<div data-tts-exclude class="my-8 flex items-center gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm not-prose shadow-sm">
		<button 
			on:click={speak}
			class="flex-none flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-md touch-manipulation"
			aria-label={speaking ? "Pause" : "Listen to post"}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
				{#if speaking && !paused}
					<path d={icons.pause} />
				{:else}
					<path d={icons.play} />
				{/if}
			</svg>
		</button>

		<div class="flex-1 flex flex-col gap-1.5 min-w-0">
			<div class="flex justify-between items-center">
				<span class="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
					{speaking && !paused ? 'Playing...' : 'Audio Article'}
				</span>
				{#if speaking || paused}
					<button 
						on:click={stop}
						class="text-xs font-medium text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider p-2"
					>
						Stop
					</button>
				{/if}
			</div>
			
			<div class="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
				<div 
					class="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-linear"
					style="width: {progress}%"
				></div>
			</div>
			
			{#if debugMode && debugLog}
				<div class="text-[10px] text-red-500 font-mono mt-1 truncate">
					Debug: {debugLog}
				</div>
			{/if}
		</div>
	</div>
{/if}