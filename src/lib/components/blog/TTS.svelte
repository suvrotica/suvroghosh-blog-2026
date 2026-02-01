<script>
	import { onMount, onDestroy } from 'svelte';

	let speaking = false;
	let paused = false;
	let supported = false;
	/** @type {SpeechSynthesisUtterance} */
	let utterance;
	let progress = 0;
	/** @type {SpeechSynthesisVoice[]} */
	let voices = [];

	const icons = {
		play: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z",
		pause: "M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z",
		stop: "M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
	};

	onMount(() => {
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			supported = true;
			
			const loadVoices = () => {
				voices = window.speechSynthesis.getVoices();
			};

			window.speechSynthesis.onvoiceschanged = loadVoices;
			loadVoices();
		}

		return () => cancel();
	});

	function getBestVoice() {
		return (
			voices.find(v => v.name === "Google US English") || 
			voices.find(v => v.name === "Google UK English Male") ||
			voices.find(v => v.name.includes("Natural") && v.name.includes("Male")) || 
			voices.find(v => v.name.includes("David")) || 
			voices.find(v => v.lang === "en-US" && v.name.includes("Male")) ||
			voices.find(v => v.lang.startsWith("en")) 
		);
	}

	function getText() {
		const article = document.querySelector('article') || document.querySelector('.prose') || document.body;
		
		// FIX: Cast the cloned node to HTMLElement so TS knows it has .querySelector and .innerText
		const clone = /** @type {HTMLElement} */ (article.cloneNode(true));

		const self = clone.querySelector('[data-tts-exclude]');
		if (self) self.remove();
		
		const elementsToRemove = clone.querySelectorAll('button, script, style, .no-read');
		// @ts-ignore
		elementsToRemove.forEach(el => el.remove());

		return clone.innerText || "";
	}

	function speak() {
		if (!supported) return;

		if (paused) {
			window.speechSynthesis.resume();
			paused = false;
			speaking = true;
			return;
		}

		if (speaking) {
			window.speechSynthesis.pause();
			paused = true;
			speaking = false;
			return;
		}

		const text = getText();
		if (!text.trim()) return;

		cancel();

		utterance = new SpeechSynthesisUtterance(text);
		
		const voice = getBestVoice();
		if (voice) {
			utterance.voice = voice;
			utterance.rate = voice.name.includes("Google") ? 1.0 : 0.9;
			utterance.pitch = 1.0;
		}
		
		utterance.onend = () => {
			speaking = false;
			paused = false;
			progress = 0;
		};

		utterance.onboundary = (event) => {
			const len = text.length;
			if (len > 0) progress = (event.charIndex / len) * 100;
		};

		window.speechSynthesis.speak(utterance);
		speaking = true;
	}

	function cancel() {
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			window.speechSynthesis.cancel();
			speaking = false;
			paused = false;
			progress = 0;
		}
	}
</script>

{#if supported}
	<div data-tts-exclude class="my-8 flex items-center gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm not-prose shadow-sm">
		<button 
			on:click={speak}
			class="flex-none flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:scale-105 active:scale-95 transition-all shadow-md"
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
					{speaking && !paused ? 'Reading Aloud...' : 'Audio Article'}
				</span>
				{#if speaking || paused}
					<button 
						on:click={cancel}
						class="text-xs font-medium text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider"
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