---
title: "Benford's Fucking Law and the Great Indian Cover-Up"
thumbnail: "/images/IMG-20251129-WA0003.jpg"
date: 2026-01-11
description: "A foul-mouthed Bengali man rants about India's statistical masturbation, cooked government numbers, and the mathematical fuckery they forgot to hide."
category: 'math'
published: true
color: "green"
---

<script>
    import BenfordVisualizer from '$lib/components/viz/BenfordVisualizer.svelte';
</script>

<Pi src="IMG-20251129-WA0003.jpg" />



The smell, right, let’s start with the smell—because it *always* fucking starts with the smell in this country, doesn’t it?—like someone boiled a thousand election affidavits in cow piss, threw in some rotting sarson ka saag, stirred with a broom previously used to beat a Dalit voter unconscious, and let it ferment in a cracked municipal drain for three Lok Sabha terms. That’s the stench that hit me as I opened the morning paper—no, not *read* it, I mean physically opened the thing, because it was still wet with printing ink and statistical diarrhea—and the top headline, in its usual syphilitic optimism, screamed “INDIA FASTEST GROWING ECONOMY IN THE WORLD.” In font size so large it looked like the number of unemployed graduates in Bihar.

And I thought: here we fucking go again.

Every fucking quarter, like a drunken uncle showing up at your door with a new business plan involving turmeric pills and WhatsApp forwards, the Government of India lurches out of the shadows with another goddamn “revised” GDP estimate, some “unexpected” fiscal surplus, some suspiciously round number of houses built, jobs created, toilets summoned into existence like caste-neutral mushrooms from the rectum of Modi’s economic miracle.

They *can’t* help themselves. These oily bureaucratic cocksuckers fiddle with numbers like perverts at a wet sari contest. They rub and rub the digits until they glisten, smooth, photo-ready—until that surplus deficit curve looks less like a bar chart and more like Shah Rukh Khan’s abs in a dimly lit, poorly regulated factory.

And what do they think? That we’ll just swallow it? That every fucking round number is divine revelation? No variance, no edge-case, no oddball first digit? Just neat, pre-chewed, saffron-tinted bullshit?

Except—*EXCEPT*—there’s this beautiful little motherfucker called **Benford’s Law**.

Oh yes. Let me introduce you to the thing they forgot to Photoshop.

Benford’s Law, named after some boring American nerd who probably died virginal but satisfied, is the statistical equivalent of a snitch. A narc for numbers. It says—listen up, you spreadsheet-tweaking sons of bitches—that in real-world data sets, the *first digit* of most numbers isn’t evenly distributed. It’s not a casino. It’s rigged by nature, physics, and entropy. You *expect* 1s. Loads of ‘em. Then 2s. Then fewer 3s. By the time you get to 9, it’s like finding a functioning ATM in Behala during demonetization—rare, suspicious, possibly a trap.

And here’s the kicker: when data is *fake*—massaged, adjusted, enhanced like an aging actor’s headshot—it breaks the Benford pattern. It sniffs of human intervention. It's *too* smooth, *too* pretty. Like GDP numbers that magically round off to 8.0% three months before elections. Or tax revenue growth rates that jump from 4.3% to 7.9% in a single quarter with no fucking explanation besides “robust reforms.”

Reforms, my hairy, overboiled Bengali ass. That’s not reform. That’s statistical necrophilia. That’s dragging the corpse of a failed policy across the screen and faking a moan.

And I know, I *know*, some chucklefuck will say, “But all governments lie.” Sure, sure. America lies with PowerPoints. China lies with ghost cities. But India—India lies like a municipal contractor: sloppily, smugly, and with chai-stained fingers that leave fingerprints all over the Excel sheet. They forget the details. They forget that digits, like bodies in a canal, float weirdly when tampered with.

Let me tell you something. In a real economy, with real transactions, the digits are messy. You get weird spikes. 1001. 342. 7882. But when these Number Bhakts cook the books, they pick numbers like they’re decorating a fucking cake: 500,000 beneficiaries. 10,000 new startups. 8.0% growth. 1,000,000 new toilets. Always zeroes at the end. Zeroes like the future of this fucking country if we keep letting chartered accountants dictate reality.

And here’s the fun part—*Benford’s Law doesn’t care about your nationalism*. It doesn’t bend for Vande Mataram. It just crunches. You run it on the Election Commission's expense reports, or the PM CARES disbursements, or the Ujjwala LPG connections—and you’ll see the lie. A gentle slope becomes a clumsy staircase. That 1 should’ve appeared 30% of the time, but here it is, at 8%, wheezing like a retired sarkari babu in a lift.

Because *truth* has a fingerprint. And so does bullshit.

The real tragedy? No one in the country gives a wet fart anymore. Not the journalists, who’d rather review South Indian masala blockbusters than dig through dusty PDFs from the Ministry of Fuck-All. Not the economists, most of whom are too busy consulting for the same ministries they used to critique. And not the public, god bless their WhatsApp-forwarded brains, who think GDP is a kind of paratha and fiscal deficit means you’re not praying hard enough.

Meanwhile I’m sitting here, surrounded by fungus, cockroach wings, and newspaper clippings, trying to remember if I’ve paid my electricity bill or if that was just a hallucination brought on by the smell of the neighbor’s incense sticks, which might actually be burning tax documents from the Panchayat office.

Oh, and let’s not forget *every* budget season, when the finance minister—some stone-faced, menopause-stung ex-banker with a haircut sharp enough to cut interest rates—comes on TV and reads out numbers like a GPS glitching in Sanskrit. And everyone claps. Claps! Like schoolboys watching a monkey dance, not realizing the monkey has their pension fund in his anus.

I remember this one time—I kid you not—I tried to run a Benford analysis on the rural employment data released post-COVID. And the fuckers had already “pre-aggregated” the data into percentiles. No raw numbers. Just vibes. It was like trying to reverse-engineer a turd back into a salad.

No error margins. No footnotes. Just bold-face digits and an image of a tribal woman smiling under a plastic banner, as if that smile wasn’t Photoshopped in a Gurgaon basement by a kid named Deepak being paid in Maggi and performance pressure.

It’s not that they’re hiding the truth.

They *are* the lie.

The entire fucking apparatus is like a numbers-themed haunted house—meant to disorient, distract, and if possible, make you shit your pants before you reach the exits. And most of us? We just shuffle along, clutching our ration cards, hoping the lights stay on long enough to cook the rice.

I once had a friend—statistician, paranoid, probably correct—who said if you really wanted to prove malfeasance, just publish a Benford analysis of campaign expenditures across five states. But he didn’t. He died. Or disappeared. Or got a government fellowship, which is the same thing.

Anyway.

Benford would be proud.

No—Benford would be *fucking furious*. But what does it matter?

The last honest digit in India died in a ration queue in 2016.

<BenfordVisualizer />

And here's the bit that really puts chilli powder on the chapped asshole of this whole spectacle: if you ask a fucking computer as above, to generate numbers—just blindly, randomly, like a digital toddler flinging digits out its silicon asshole—they still follow Benford’s Law. Why? Because even so-called pseudorandomness isn’t truly random, it’s math underneath, beautiful cruel math—multiplicative cascades and modular congruences and other such abstract foreplay—which means it accidentally stumbles into the same curved frequency distribution that nature, markets, populations, and entropy follow. The math doesn’t cheat. The math is dumb but honest. It doesn’t care about elections or headline GDP or some sweaty babu’s appraisal. Meanwhile, our government’s idea of randomness is “how many toilets should we say we built this week?” followed by an office boy spinning a fucking chakra wheel labeled 1000, 2000, 5000, and Jai Hind.
