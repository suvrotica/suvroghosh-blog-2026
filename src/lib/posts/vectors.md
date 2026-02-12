---
title: "Vectors for Everyone"
description: "A common man's view of the vector—less math, more intuition—exploring the dimensions that make up our world and the machines we build."
date: "2026-02-12"
thumbnail: "/images/IMG-20251228-WA0129.jpg"
category: 'Maths'
published: true
color: "green"
---

<script>
    import VectorViz from '$lib/components/viz/VectorViz.svelte';
</script>

<Pi src="IMG-20251228-WA0129.jpg" />

I was always fascinated with vectors as a child, to be honest with anyone reading this, and that fascination is something I can finally express here when I am not extremely depressed. It will be less mathematical and more a common man's view of the vector, but of course, because both the common man and the mathematician use some language and symbols, I won't stray away from them. I will use LaTeX here, which makes it easy to type mathematical equations and such things in blog posts.

Again, I am not an expert, but I worked extensively as a machine learning engineer and a statistician in the US when AI was so unpopular that you were advised not to use words like "neural networks" or "AI" in your paper or your curriculum vitae. Of course, now the world has changed, but I want to tell the story that AI is still mostly just mathematics—in fact, a large part of it is vectors, or linear algebra. And so this is what many of these small posts will introduce.

It will take quite some time for me to organize my thoughts, write these posts, and create the visualizations that I think will help people understand the underlying issues of why we ascribe intelligence to machines when it is only mathematics under the hood, and why not understanding that—or understanding why this currently prevalent, at least apparently, superficially successful mathematics is different from the wet biological mathematics in animal brains—may lead to designing more explainable, deterministic synthetic intelligence that may one day be safely merged with our own brains.

Because I unwisely moved back to India and lost all my contacts and ways back to where any real work is being done, I can, at the very least, catch up on what is happening out there in the real world while I slowly rot and die in the proverbial frog's well. In any case, at my age, and given my mental disability, I am ill-suited for a fast life of pressured achievement, and I don't believe that artificial pressure—academic or industry—can make advances. The true advances happen in quiet moments when thinkers are not rushed, and that can happen anywhere.

Calcutta is, in fact, a wonderful place if you can cocoon yourself from the filthy air and water in a quiet environment in your own room, and that's what I do when I write these posts. I don't know if anyone will read them or not, but if they do, they'll be sharing the same thought space with me for a little while, and I am indebted for that.

# No-Build Visualizations

Instead of compiling complex code, we can just use these little interactive windows to see what I'm talking about.

## $\mathbb{R}^0$: The Point of Singularity

Let’s start with absolutely nothing. Well, not *nothing* nothing, but a location with no room to move. Imagine you are stuck in a single moment, frozen. You cannot move forward or backward, left or right, up or down. You just *are*. In mathematics, we call this a zero-dimensional space, or $\mathbb{R}^0$. It is the lonely singularity, the starting point of all things, but contains no direction itself. It is just a dot, existing in the void.

<VectorViz space="r0" />

## $\mathbb{R}^1$: The Freedom of a Line

Now, let's grant this lonely point a single freedom: the ability to move. But there is a catch—it can only move along a single track. Think of it like a train on a rail (that never curves) or the mercury in a thermometer. You can go forward (positive) or backward (negative), but you cannot step sideways. This is one-dimensional space, $\mathbb{R}^1$. A vector here is just a single number, like $2.5$, which tells you exactly how far you've traveled from the start.

<VectorViz space="r1" vec={[2.5]} />

## $\mathbb{R}^2$: The Flatland

Life gets infinitely more interesting when you add a second freedom. Now, imagine you are an ant on a table. You aren't stuck on a rail anymore; you can crawl forward and backward, but you can also scoot left and right. By combining these two movements, you can go anywhere on the flat surface. This is $\mathbb{R}^2$, the 2D plane. To describe your position, I now need *two* numbers (components): one for how far you went "East" ($x$) and one for how far you went "North" ($y$).

<VectorViz space="r2" vec={[3, 2]} />

## $\mathbb{R}^3$: The World We Breathe In

Finally, we arrive at the space we actually inhabit. We aren't flat ants; we can jump. We have length, width, and *height*. This third dimension lifts us off the page. In $\mathbb{R}^3$, a vector is an arrow floating in the air. To find the tip of that arrow, you need three numbers: $x$ (forward), $y$ (sideways), and $z$ (up). This is the space where birds fly and where reality happens, projected here onto your 2D screen so you can try to perceive the depth.

<VectorViz space="r3" vec={[3, 2, 3]} />