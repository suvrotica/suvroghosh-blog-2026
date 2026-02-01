<script>
	import { onMount, onDestroy } from 'svelte';

	// STATE
	let speaking = false;
	let paused = false;
	let supported = false;
	let buffering = false; // New state for between chunks

	// CHUNKING LOGIC
	/** @type {string[]} */
	let chunks = [];
	let currentChunkIndex = 0;
	/** @type {SpeechSynthesisUtterance} */
	let currentUtterance;

	// DEBUGGING
	let debugLog = "";
	let debugMode = true; // Keep this on for now

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
			// Android Init
			window.speechSynthesis.getVoices();
			window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
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

	// NEW: Split text into safe sentence-sized chunks
	/** @param {string} text */
	function splitIntoChunks(text) {
		// Regex splits on punctuation (. ! ?) but keeps the punctuation
		const rawChunks = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
		return rawChunks.map(c => c.trim()).filter(c => c.length > 0);
	}

	function speakNextChunk() {
		if (currentChunkIndex >= chunks.length) {
			log("Finished all chunks");
			speaking = false;
			paused = false;
			currentChunkIndex = 0;
			return;
		}

		const chunkText = chunks[currentChunkIndex];
		
		// Create new utterance for just this sentence
		const utt = new SpeechSynthesisUtterance(chunkText);
		currentUtterance = utt;

		// Voice Selection (Conservative)
		const voices = window.speechSynthesis.getVoices();
		const voice = 
			voices.find(v => v.name.includes("Google US English")) || 
			voices.find(v => v.lang === "en-US") ||
			null; // If null, Android uses system default (safest)
		
		if (voice) utt.voice = voice;
		utt.rate = 1.0;

		// Handlers
		utt.onstart = () => {
			buffering = false;
			log(`Speaking chunk ${currentChunkIndex + 1}/${chunks.length}`);
		};

		utt.onend = () => {
			// Automatically trigger next chunk
			if (speaking && !paused) {
				currentChunkIndex++;
				speakNextChunk();
			}
		};

		// @ts-ignore
		utt.onerror = (e) => {
			log(`Error on chunk ${currentChunkIndex}: ${e.error}`);
			if (e.error === 'interrupted') return; // Expected on Stop
			
			// If synthesis fails, try skipping this chunk
			currentChunkIndex++;
			setTimeout(speakNextChunk, 100);
		};

		window.speechSynthesis.speak(utt);
	}

	function togglePlay() {
		if (!supported) return;

		// 1. If currently speaking (or buffering), PAUSE
		if (speaking && !paused) {
			log("Pausing...");
			window.speechSynthesis.cancel(); // Must cancel to stop current chunk immediately
			paused = true;
			return;
		}

		// 2. If Paused, RESUME
		if (paused) {
			log("Resuming...");
			paused = false;
			speaking = true;
			speakNextChunk(); // Restart from current index
			return;
		}

		// 3. START NEW
		log("Starting New...");
		window.speechSynthesis.cancel();
		
		const text = getText();
		if (!text.trim()) {
			log("No text found");
			return;
		}

		chunks = splitIntoChunks(text);
		currentChunkIndex = 0;
		speaking = true;
		paused = false;
		buffering = true;

		// Tiny timeout to let the cancel() settle on Android
		setTimeout(speakNextChunk, 50);
	}

	function cancel() {
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			window.speechSynthesis.cancel();
			speaking = false;
			paused = false;
			buffering = false;
			currentChunkIndex = 0;
			log("Stopped");
		}
	}
	
	// Helper to calculate progress percentage across all chunks
	$: progressPct = chunks.length > 0 
		? Math.min(100, Math.round((currentChunkIndex / chunks.length) * 100)) 
		: 0;

</script>

{#if supported}
	<div data-tts-exclude class="my-8 flex items-center gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm not-prose shadow-sm">
		<button 
			on:click={togglePlay}
			class="flex-none flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-md touch-manipulation"
			aria-label={speaking && !paused ? "Pause" : "Listen to post"}
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
					{#if speaking && !paused}
						Reading chunk {currentChunkIndex + 1} of {chunks.length}
					{:else if paused}
						Paused
					{:else}
						Audio Article
					{/if}
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
					style="width: {progressPct}%"
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