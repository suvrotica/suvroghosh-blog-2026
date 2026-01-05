---
title: "Visualizing the Complex Plane"
date: "2026-01-05"
description: "Interactive Domain Coloring: identifying singularities, poles, and zeros using Svelte 5 and Canvas."
thumbnail: "/images/IMG-20251207-WA0010.jpg"
category: "science"
published: true
color: "green"
---

<script>
  import ComplexPlane from '$lib/components/viz/ComplexPlane.svelte';
  </script>

  Mathematics is often taught as a static subject—formulas on a chalkboard, dead ink on paper. But complex analysis, the study of functions of complex numbers ($z = x + iy$), is inherently visual.

  Because a complex function maps a 2D plane to another 2D plane, we need 4 dimensions to graph it properly. Since we don't have 4D screens yet, we use **Domain Coloring**.

  ### Interactive Playground

  Try typing `(z^2 - 1) * (z - 2 - i)^2` below. The **colors** represent the angle (argument) of the result, and the **bands** represent the magnitude.

  <ComplexPlane />

  ### How to Spot a Singularity

  In this visualization, we map the mathematical properties of the function to visual cues. Here is how to read the "map" above to find singularities—points where the function behaves strictly or chaotically.

  <Pi 
      src="IMG-20251207-WA0011.jpg" 
          caption="Visualizing mathematical infinity requires mapping magnitude to light."
          />

          #### 1. The "White Sun" (Poles)
          A **pole** is a singularity where the function explodes to infinity (like dividing by zero).
          * **Visual Cue:** Look for intense, bright "suns" or vortices.
          * **Why:** We use a logarithmic scale for brightness. As the value approaches infinity, the brightness peaks, and the contour bands (the rings of light/dark) crowd incredibly close together.
          * **Try it:** Enter `1/z` above. The center is a simple pole.

          #### 2. The "Black Hole" (Zeros)
          A **zero** is simply where the function equals 0.
          * **Visual Cue:** Dark centers where contour rings radiate *outward*.
          * **Try it:** Enter `z` above. The center is a zero.

          #### 3. Counting the Phase (The Color Cycle)
          The most robust way to analyze a point is to count the color cycles around it.
          * **The Rule:** Trace a circle around the point and count how many times the color spectrum (Red → Green → Blue → Red) repeats.
          * **Pole vs Zero:** If the colors cycle in one direction, it's a zero. If they cycle in the *opposite* direction, it's a pole (because of the $1/z$ inversion).
          * **Order:** If the colors cycle **twice**, it is a pole (or zero) of "order 2" (e.g., $1/z^2$).

          #### 4. The Chaos (Essential Singularities)
          If you see a point where the colors cycle infinitely many times and the pattern looks fractal or noisy, you have found an **essential singularity**.
          * **Try it:** Enter `exp(1/z)`.
          * **Result:** The center ($z=0$) becomes a chaotic singularity where the function takes on *every possible complex value* (except one) infinitely often.