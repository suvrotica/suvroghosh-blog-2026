---
title: "The Four Fundamental Subspaces"
date: "2025-12-12"
description: "Linear algebra is the only subject I know where you can buy one matrix and it comes with four free subspaces. They are the recurring cast in the sitcom of solving Ax=b."
thumbnail: "/images/IMG-20251212-WA0014.jpg"
category: "math"
color: "green"
published: true
---

<Pi
    src="IMG-20251212-WA0014.jpg" 
    caption="Four Rooms in the Same Mathematical House"
/>

Linear algebra is the only subject I know where you can buy one matrix and it comes with four free subspaces, like a value meal, except the toy is existential dread and the fries are orthogonality.

Picture a slightly depressing apartment building called $A$. You walk in holding a vector, and the building either welcomes it, transforms it, ignores it, or quietly shoves it into a closet where it can’t affect anything. The four fundamental subspaces are basically the building’s four “zones,” and once you see them, you stop thinking of a matrix as a rectangle of numbers and start thinking of it as a bureaucracy with policies.

I used to think “subspace” meant “a smaller space.” Like a broom closet inside a gymnasium. Which is true in the same way that calling the ocean “wet” is true. A subspace is more like: a set of directions you’re allowed to travel that stays closed under the usual vector antics (add, scale, repeat until confident). The four fundamental subspaces are the ones that show up every time you have a matrix $A$ with size $m \times n$. They’re the recurring cast in the sitcom of solving $Ax=b$.

Start with what $A$ does to vectors. It takes an input $x \in \mathbb{R}^n$ ($n$ ingredients) and produces an output $Ax \in \mathbb{R}^m$ ($m$ consequences). So immediately we get two obvious “hangout zones”:

## Column space of $A$ (often written $\text{Col}(A)$ or $\mathcal{C}(A)$)

This is the set of all outputs you can possibly get:

$$
\text{Col}(A)=\{Ax : x\in\mathbb{R}^n\}\subseteq \mathbb{R}^m.
$$

It’s called “column space” because those outputs are exactly all linear combinations of the columns of $A$. So: the columns are like menu items, and the column space is everything you can order if you’re allowed to mix and match toppings with real-number gusto.

This answers the question: **Which right-hand sides $b$ are actually solvable in $Ax=b$?**

Answer: precisely the ones that live in $\text{Col}(A)$. If $b$ is outside it, you can beg, bribe, and refresh your calculator battery; the equation still won’t have an exact solution.

## Null space of $A$ (written $\text{N}(A)$ or $\mathcal{N}(A)$)

This is the set of inputs that produce no output:

$$
\text{N}(A)=\{x\in\mathbb{R}^n : Ax=0\}\subseteq \mathbb{R}^n.
$$

These are the “invisible” directions: you move in those directions in input-land, and the matrix shrugs—nothing changes in output-land. Like turning the volume knob on a broken speaker: lots of effort, same silence.

This answers the question: **How many different solutions can $Ax=b$ have?**

If the null space is nontrivial (contains more than just $0$), then once you find one solution, you can add any null-space vector to it and still have a solution. The null space is the source of “wiggle room.”

So far we’ve got two. The other two come from looking at the matrix’s rows and from looking at the “shadow world” of orthogonality.

## Row space of $A$ (written $\text{Row}(A)$)

This is the span of the rows of $A$, living in $\mathbb{R}^n$. If the column space is about what outputs are possible, the row space is about what constraints the matrix is applying to inputs.

One of the slick truths of linear algebra: the row space is the column space of $A^\top$. So it’s not a separate universe; it’s the same show, different camera angle.

If you row-reduce $A$, the nonzero rows of the reduced row echelon form give you a basis for the row space. Translation: row reduction is basically you interrogating the matrix until it admits what it really cares about.

## Left null space of $A$ (written $\text{N}(A^\top)$)

This is the null space of the transpose:

$$
\text{N}(A^\top)=\{y\in\mathbb{R}^m : A^\top y=0\}\subseteq \mathbb{R}^m.
$$

These are the output-side vectors that are orthogonal to every column of $A$. Another way to say it: it’s the set of “tests” $y$ you can apply to an output $b$ where the matrix’s entire output range fails the test in the exact same way.

This one feels like the secret basement. But it’s hugely important: it captures the reasons a system is inconsistent and it’s the natural home of constraints, conservation laws, and “things that must cancel.”

Now for the part where the four become a tidy little ecosystem instead of four random animals.

## The punchline relationships

Two pairs live in different ambient spaces:

1. $\text{Col}(A)\subseteq \mathbb{R}^m$ and $\text{N}(A^\top)\subseteq \mathbb{R}^m$
2. $\text{Row}(A)\subseteq \mathbb{R}^n$ and $\text{N}(A)\subseteq \mathbb{R}^n$

And inside each ambient space, the pair forms an orthogonal split:

$$
\mathbb{R}^m = \text{Col}(A)\ \oplus\ \text{N}(A^\top)
$$

$$
\mathbb{R}^n = \text{Row}(A)\ \oplus\ \text{N}(A)
$$

That $\oplus$ is “direct sum,” meaning: every vector in the big space can be written uniquely as (something in the first subspace) + (something in the second), and the two parts are perpendicular in the geometric sense.

So in $\mathbb{R}^m$, every vector $b$ decomposes into:

* a part that’s achievable as $Ax$ (the column-space component), and
* a part that’s fundamentally unachievable (the left-null-space component).

That is literally the geometric meaning of least squares: when $b$ isn’t in the column space, you settle for the closest point in $\text{Col}(A)$, and the error lives in $\text{N}(A^\top)$. The “residual” is not just some sad leftover; it belongs to a very specific room in the house.

Similarly in $\mathbb{R}^n$, every input vector decomposes into:

* a part the matrix actually “notices” (row space), and
* a part it’s blind to (null space).

> **Mental Model:** A lopsided rectangle labeled “$\mathbb{R}^m$” split into two regions, left side “Column Space (stuff $A$ can make)” and right side “Left Null Space (stuff perpendicular to everything $A$ can make).” Under it, a second rectangle labeled “$\mathbb{R}^n$” split into “Row Space (stuff $A$ cares about)” and “Null Space (invisible directions).” In the middle, a stick-figure matrix wearing a tiny bureaucrat tie stamping papers: APPROVED (col space) and DENIED (left null).

## The misconception twist

A common mental trap is to think “null space” is just a technical nuisance—the place where solutions go to multiply like gremlins. But it’s actually the fingerprint of what information your matrix throws away. If $A$ is a measurement process, the null space is everything your measuring device can’t detect. If $A$ is a model, the null space is the set of changes your model can’t distinguish. That’s not a nuisance; that’s the entire philosophical drama of inference.

Another trap: people think row space and column space are “basically the same.” They’re not. They live in different universes ($\mathbb{R}^n$ vs. $\mathbb{R}^m$). They’re related—mysteriously, beautifully—but confusing them is like confusing “questions” and “answers” because both are written in English.

## Closing thought

A matrix looks like a grid of numbers, but it behaves like a little cosmology: two worlds (input and output), and in each world a bright region of meaningful motion plus a shadow region of invisibility. Linear algebra is, among other things, the art of learning to respect the shadows.
