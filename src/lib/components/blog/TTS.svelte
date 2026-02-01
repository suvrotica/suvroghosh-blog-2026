<script>
	import { onMount, onDestroy } from 'svelte';

	let speaking = false;
	let paused = false;
	let supported = false;
	/** @type {SpeechSynthesisUtterance} */
	let utterance;
	let progress = 0;
	/** @type {any} */
	let progressInterval;
	
	// Debug logging for mobile troubleshooting
	let debugLog = "";
	
	/** @param {string} msg */
	function log(msg) {
		console.log(msg);
		// debugLog = msg; 
	}

	const icons = {
		play: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z",
		pause: "M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z",
		stop: "M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
	};

	onMount(() => {
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			supported = true;
			window.speechSynthesis.getVoices();
		}
		return () => cancel();
	});

	function getText() {
		const article = document.querySelector('article') || document.querySelector('.prose') || document.body;
		
		// @ts-ignore
		const clone = /** @type {HTMLElement} */ (article.cloneNode(true));
		const self = clone.querySelector('[data-tts-exclude]');
		if (self) self.remove();
		// @ts-ignore
		clone.querySelectorAll('button, script, style, .no-read').forEach(el => el.remove());

		return clone.innerText || "";
	}

	function speak() {
		if (!supported) return;
		log("Clicked Play");

		if (window.speechSynthesis.paused) {
			log("Resuming...");
			window.speechSynthesis.resume();
		}

		if (speaking && !paused) {
			log("Pausing...");
			window.speechSynthesis.pause();
			paused = true;
			return;
		}

		if (paused) {
			paused = false;
			speaking = true;
			return;
		}

		window.speechSynthesis.cancel();

		const text = getText();
		if (!text.trim()) {
			log("No text found");
			return;
		}

		utterance = new SpeechSynthesisUtterance(text);
		
		const voices = window.speechSynthesis.getVoices();
		log(`Voices found: ${voices.length}`);

		const voice = 
			voices.find(v => v.name.includes("Google US English")) || 
			voices.find(v => v.lang === "en-US") || 
			voices[0];

		if (voice) {
			utterance.voice = voice;
			log(`Selected: ${voice.name}`);
		} else {
			log("Using System Default Voice");
		}

		utterance.onstart = () => { log("Started"); speaking = true; paused = false; };
		
		// @ts-ignore
		utterance.onend = () => { log("Ended"); speaking = false; paused = false; progress = 0; clearInterval(progressInterval); };
		
		// @ts-ignore
		utterance.onerror = (e) => { log(`Error: ${e.error}`); speaking = false; };

		window.speechSynthesis.speak(utterance);

		if (progressInterval) clearInterval(progressInterval);
		progressInterval = setInterval(() => {
			if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
				progress = (progress + 0.5) % 100; 
			} else if (!window.speechSynthesis.speaking) {
				clearInterval(progressInterval);
				if (speaking) speaking = false;
			}
		}, 200);
	}

	function cancel() {
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			window.speechSynthesis.cancel();
			speaking = false;
			paused = false;
			progress = 0;
			if (progressInterval) clearInterval(progressInterval);
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
						on:click={cancel}
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
			</div>
	</div>
{/if}