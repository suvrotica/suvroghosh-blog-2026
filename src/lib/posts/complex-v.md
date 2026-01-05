---
title: "Visualizing the Complex Plane"
date: "2026-01-05"
description: "Interactive Domain Coloring using Svelte 5 and Canvas."
thumbnail: "/images/complex-plane-thumb.jpg"
category: "engineering"
published: true
color: "blue"
---



  Mathematics is often taught as a static subject—formulas on a chalkboard, dead ink on paper. But complex analysis, the study of functions of complex numbers ($z = x + iy$), is inherently visual.

  Because a complex function maps a 2D plane to another 2D plane, we need 4 dimensions to graph it properly. Since we don't have 4D screens yet, we use **Domain Coloring**.

  ### Interactive Playground

  Try typing `(z^2 - 1) * (z - 2 - i)^2` below. The **colors** represent the angle (argument) of the result, and the **bands** represent the magnitude.

  <Cp />

  ### How it works

  This component iterates over every pixel on the canvas:
  1. Converts the pixel $(x, y)$ to a complex number $z$.
  2. Calculates $f(z)$.
  3. Maps the resulting angle to a Hue (Color).
  4. Maps the magnitude to Brightness (Contour lines).