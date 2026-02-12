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

<Pl href="/blog/maths/mathematical-fomo">
  Cartesian Product: The Fear of Missing Out (FOMO) Space
</Pl>

<Pl href="/blog/maths/blackboard-runes">
  Capital Letters: Blackboard Bold
</Pl>

I was always fascinated with vectors as a child, to be honest with anyone reading this, and that fascination is something I can finally express here when I am not extremely depressed. It will be less mathematical and more a common man's view of the vector, but of course, because both the common man and the mathematician use some language and symbols, I won't stray away from them. I will use LaTeX here, which makes it easy to type mathematical equations and such things in blog posts.

Again, I am not an expert, but I worked extensively as a machine learning engineer and a statistician in the US when AI was so unpopular that you were advised not to use words like "neural networks" or "AI" in your paper or your curriculum vitae. Of course, now the world has changed, but I want to tell the story that AI is still mostly just mathematics—in fact, a large part of it is vectors, or linear algebra. And so this is what many of these small posts will introduce.

It will take quite some time for me to organize my thoughts, write these posts, and create the visualizations that I think will help people understand the underlying issues of why we ascribe intelligence to machines when it is only mathematics under the hood, and why not understanding that—or understanding why this currently prevalent, at least apparently, superficially successful mathematics is different from the wet biological mathematics in animal brains—may lead to designing more explainable, deterministic synthetic intelligence that may one day be safely merged with our own brains.

The problem that I faced in India with technology then, and that I see now, is that people don’t know what they don’t know because they are driven by schooling and by the syllabus into thinking in certain ways; they don’t ask questions, or, strangely, it never even comes up to ask those questions. This is the sort of deficiency that gets worse if you work in a place where you are not allowed to think independently, or when, by habit, as now with social media, we destroy our inner curiosity with fluffed-up lies or substitute facts that cannot hold up if you knew how to ask hard questions. That’s why religious fundamentalism and cults are still possible, and why inane people like Trump and Modi are leaders. Because I unwisely moved back to India and lost all my contacts and ways back to where any real work is being done, I can, at the very least, catch up on what is happening out there in the real world while I slowly rot and die in the proverbial frog's well. In any case, at my age, and given my mental disability, I am ill-suited for a fast life of pressured achievement, and I don't believe that artificial pressure—academic or industry—can make advances. The true advances happen in quiet moments when thinkers are not rushed, and that can happen anywhere. 

But Calcutta still is, in fact, a wonderful place if you can cocoon yourself from the filthy air and water in a quiet environment in your own room, and that's what I do when I write these posts. I don't know if anyone will read them or not, but if they do, they'll be sharing the same thought space with me for a little while, and I am indebted for that.



## $\mathbb{R}^0$: The Point of Singularity

Let’s start with absolutely nothing. Well, not *nothing* nothing, but a location with no room to move. Imagine you are stuck in a single moment, frozen. You cannot move forward or backward, left or right, up or down. You just *are*. In mathematics, we call this a zero-dimensional space, or $\mathbb{R}^0$. It is the lonely singularity, the starting point of all things, but contains no direction itself. It is just a dot, existing in the void.

<VectorViz space="r0" />

### The Monad and the Bindu

Philosophically, this "lonely singularity" is what Gottfried Wilhelm Leibniz called the **Monad**.

In the 17th century, Leibniz argued that the universe wasn't made of atoms (which are physical), but of "Monads"—simple, immaterial points of perception. Like our mathematical point, a Monad has no parts, no extension, and no shape. It occupies no space, yet it is the fundamental building block of reality. He famously said, *"The Monad has no windows,"* meaning nothing can enter or leave it. It is a perfect, isolated universe of one.

Centuries earlier, Indian philosophy described the same concept as the **Bindu**—the dot. In Tantric cosmology, the *Bindu* is the point from which the entire universe expands. It is the dimensionless center where the unmanifest becomes manifest. It is not "nothing"; it is *everything* in potential, squeezed into a space of zero size.

So when we write , we aren't just writing a math symbol. We are writing the seed of the universe.

## $\mathbb{R}^1$: The Freedom of a Line

Now, let's grant this lonely point a single freedom: the ability to move. But there is a catch—it can only move along a single track. Think of it like a train on a rail (that never curves) or the mercury in a thermometer. You can go forward (positive) or backward (negative), but you cannot step sideways. This is one-dimensional space, $\mathbb{R}^1$. A vector here is just a single number, like $2.5$, which tells you exactly how far you've traveled from the start.

<VectorViz space="r1" vec={[2.5]} />

### The King of Lineland

In 1884, the schoolmaster Edwin Abbott wrote a satire called *Flatland*. In one chapter, the protagonist visits a world called **Lineland**.

The King of Lineland lives on this single straight line. Because he is stuck on the track, he cannot turn his head left or right; those directions simply do not exist to him. When he looks at his subjects (who are also lines), he doesn't see their length. He sees only their endpoints—mere **dots**.

To the King, the universe is not a vast space; it is a queue. He can scream at the person in front of him, but he can never walk around them. When the visitor tries to explain the concept of "stepping sideways," the King calls him a madman and tries to execute him.

It serves as a humbling reminder: Dimensions don't just define where we can move; they define what we are capable of imagining. In , "sideways" isn't just impossible—it's heresy.

## $\mathbb{R}^2$: The Flatland

Life gets infinitely more interesting when you add a second freedom. Now, imagine you are an ant on a table. You aren't stuck on a rail anymore; you can crawl forward and backward, but you can also scoot left and right. By combining these two movements, you can go anywhere on the flat surface. This is $\mathbb{R}^2$, the 2D plane. To describe your position, I now need *two* numbers (components): one for how far you went "East" ($x$) and one for how far you went "North" ($y$).

<VectorViz space="r2" vec={[3, 2]} />





### The Taxicab in Manhattan

In the 19th century, a mathematician named Hermann Minkowski looked at the 2D plane and asked a strange question: *"What if you can't walk diagonally?"*

In standard Euclidean geometry (the kind we learn in school), the shortest distance between two points is a straight line. If you are a bird, you fly straight across. But if you are a taxi driver in Manhattan, you can't drive through buildings. To get from 1st Avenue & 1st Street to 4th Avenue & 5th Street, you have to drive *across* the avenues and *up* the streets.

This created a whole new kind of mathematics called **Taxicab Geometry** (or the Manhattan Distance). In this world, a "circle" (all points equidistant from the center) looks like a square turned 45 degrees.

It reminds us that even on a flat table, the rules of movement define the shape of the world. Vectors are just instructions, but the "cost" of following them depends on the map you're driving on.


## $\mathbb{R}^3$: The World We Breathe In

Finally, we arrive at the space we actually inhabit. We aren't flat ants; we can jump. We have length, width, and *height*. This third dimension lifts us off the page. In $\mathbb{R}^3$, a vector is an arrow floating in the air. To find the tip of that arrow, you need three numbers: $x$ (forward), $y$ (sideways), and $z$ (up). This is the space where birds fly and where reality happens, projected here onto your 2D screen so you can try to perceive the depth.

<VectorViz space="r3" vec={[3, 2, 3]} />



### The Fly on the Ceiling

Legend has it that René Descartes—the father of modern philosophy and the guy who said "I think, therefore I am"—invented this whole system while lying in bed.

He was a sickly child and spent most of his mornings in bed (something I deeply relate to). One day, he was staring up at the ceiling and saw a fly crawling in the corner. He realized he could describe the fly’s exact position using just its distance from the two adjacent walls and the ceiling.

Before that moment, geometry was just shapes on paper (Euclid). But Descartes realized that *space itself* could be turned into algebra. By assigning three numbers——he could freeze the fly in time. He turned the chaotic, buzzing reality of a room into a rigid grid of numbers.

So whenever you see a 3D coordinate system, remember: it started with a lazy genius watching a bug because he didn't want to get up.

But mathematics, unlike our biological eyes, does not stop at three. The moment you write the number `4` in the exponent ($\mathbb{R}^4$), you step out of the visual world and into the world of ghosts. We cannot build a machine to show you the fourth dimension, but we can feel its shadow.

# $\mathbb{R}^4$: The Time Traveler

For a long time, $\mathbb{R}^4$ was just a parlor trick for mathematicians. "Imagine a cube," they would say, "but in a direction you cannot point to." They called it a **Tesseract**.

But in 1905, a patent clerk named Albert Einstein (and his teacher Hermann Minkowski) realized that $\mathbb{R}^4$ wasn't a shape. It was a *history*.

If you want to meet me, telling me the location $(x, y, z)$ isn't enough.
* "Meet me at the coffee shop (x, y)"
* "On the 2nd floor (z)"

If I go there tomorrow, I will miss you. You need a fourth number: **Time** ($t$).

We are all 4-dimensional worms crawling through spacetime. If you could see yourself from the perspective of $\mathbb{R}^4$, you wouldn't look like a human. You would look like a long, snake-like tube stretching from your birth to your death. Your "current moment" is just a slice of that tube.

# Riemann’s Tragedy

Before Einstein, there was Bernhard Riemann. He was a shy, sickly, devoutly Christian man who died of tuberculosis at 39.

Riemann had a terrifying idea: What if these vector spaces... *bent*?

In our standard $\mathbb{R}^2$ (the flat table), triangles always have 180 degrees. But Riemann imagined a world where the "table" was warped, like the surface of a sphere or a saddle. In this world, the rules of geometry change as you move.

He invented the math for this—**Riemannian Geometry**—but he died before he could see what it was for. Fifty years later, Einstein realized that **Gravity** is not a force; it is just Riemann's geometry. A planet doesn't "pull" you; it bends the $\mathbb{R}^4$ spacetime around it, and you just slide down the curve.

Riemann gave us the language of the universe, but he never heard it spoken.

# $\mathbb{R}^\infty$: The Quantum Ocean

If $\mathbb{R}^4$ is hard to swallow, what happens when we go to $\mathbb{R}^\infty$?

In the early 20th century, physicists broke the atom and found... nothing. Or rather, they found that particles like electrons aren't "things" at all. They are **Probability Waves**.

To describe the state of a single electron, three numbers aren't enough. Four aren't enough. You need an infinite list of numbers to describe the wave's shape.

This brings us to **Hilbert Space** ($\mathbb{R}^\infty$).

In Quantum Mechanics, an electron is a vector in an infinite-dimensional space.
* When we look at it, the vector collapses.
* When we don't, it rotates in dimensions we cannot conceive.

This is the ultimate humiliation for the human brain. We are creatures of the African savannah, evolved to throw rocks at lions in $\mathbb{R}^3$. We are not wired to visualize the infinite.

And yet, we can calculate it. We can predict the color of a star or the operation of the microchip in your phone using math that happens in a space we can never visit.

That, perhaps, is the only bridge we have out of the frog's well.


### The Geometry of Thought

This is why we must care. To a machine, concepts like "love," "justice," or "cat" are not feelings or moral truths; they are just fixed coordinates in a cold, high-dimensional . When an AI "thinks," it is simply performing a vector transformation—rotating, stretching, and warping that space until the points align in a pattern that mimics our reality. If we refuse to understand this alien geometry, we are doomed to treat these machines as magical black boxes, trusting their output without understanding their path. But if we grasp the map of , we can begin to translate their high-dimensional ghosts back into our world. We can ensure that when they navigate their infinite vector spaces, they arrive at a destination that doesn't just minimize error, but actually makes sense to the human heart.
