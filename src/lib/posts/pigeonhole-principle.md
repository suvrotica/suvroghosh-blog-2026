---
title: "The Pigeonhole Principle"
date: "2025-12-25"
description: "It’s so obvious you think it can’t possibly do anything… and then it strolls into a proof like a bored uncle at a wedding and solves the whole problem."
thumbnail: "/Photos/IMG-20251225-WA0003.jpg"
category: "math"
color: "green"
published: true
---

<Pi
    src="/Photos/IMG-20251225-WA0003.jpg" 
    caption="The drawer principle: fewer nests than birds means someone has to share."
/>

<Yc />
<Yt src="https://youtu.be/Z1zgrgstVAw?si=gz19kVM8dgze4btY" />

The pigeonhole principle is one of those bits of mathematics that feels like it should be illegal: it’s so obvious you think it can’t possibly *do* anything… and then it strolls into a proof like a bored uncle at a wedding and solves the whole problem with one sentence.

## “What” it says (in plain human)

If you put more objects than containers into the containers, at least one container must end up with more than one object.

That’s it. That’s the whole thing. The entire principle fits on the back of a tea packet.

* If you have 11 socks and only 10 drawers, some drawer has at least 2 socks.
* If 367 people are in a room, at least two share a birthday (because there are only 366 possible birthdays if you include Feb 29).

## A simple proof by contradiction (The "Uh-Oh" method)

The contradiction-style proof is basically: assume the principle is false, then watch arithmetic reality punch that assumption in the face. If your brain refuses to accept this as an absolute law of the universe, here is the logic broken down:

Imagine 5 boxes. You try to put 6 balls in them.

1. **Pretend** you can do it with *no* box getting two balls.
2. Then each box can take only one ball.
3. So 5 boxes can take only 5 balls.
4. But you have 6 balls.
5. So where does the 6th ball go?

It has to go into a box that already has a ball.
**Meaning:** some box *must* have two.

## The “why” (why anyone should care)

Because this tiny idea is a crowbar. It pries open problems where you can’t see any structure. You don’t need to know *which* drawer has two socks. The power is: it guarantees *existence* without telling you where to look.

Pattern appears because you’re forcing lots of things to share a small set of “types.” You first decide what “type” means (month of birthday, remainder after dividing by 5, drawer number, weekday, etc.). If there are only, say, 5 types available, then the first 5 items could each take a different type, but the 6th item has no new type left to claim, so it must repeat a type already used. The moment two items share the same type, you’ve got a guaranteed match—a pattern. The cleverness is choosing types so that “same type” automatically implies something interesting (same remainder means their difference is divisible by 5; same month means shared birthday month; same drawer means a collision).

That’s a recurring theme in modern math and computer science: proving something must happen even if you can’t point to it directly. Pigeonhole is the baby version of that instinct, and it shows up everywhere:

* **In number theory:** proving patterns in remainders and divisibility.
* **In combinatorics:** proving “some pair must share something.”
* **In computer science:** hashing and collisions—if more keys than hash slots, collisions are inevitable.
* **In cryptography:** why perfect “collision-free” hash functions can’t exist if outputs are fixed-size.
* **In geometry and data:** guarantees about clustering, nearest neighbors, and overlaps.

## “Who / when / where” (the little history tour)

The principle is most famously associated with **Peter Gustav Lejeune Dirichlet** (1805–1859), a German mathematician who worked in places like **Berlin** and **Göttingen**, and who used it in the 19th century while doing what number theorists love most: forcing integers to confess patterns they didn’t want to reveal.

Dirichlet used it in results about **Diophantine approximation**—that is, how well real numbers can be approximated by rationals. The core move is “there are more attempts than outcomes, so two attempts must land in the same outcome,” which sounds like a bureaucratic complaint but becomes deep mathematics.

The name “pigeonhole” came later as a friendly metaphor: Victorian-era desks often had little cubbyholes for letters—like literal pigeonholes. The French sometimes call it the **“principe des tiroirs”** (the drawer principle), which is frankly more elegant: fewer birds, more furniture.

## The basic statement

**First form:**
If you have $(n+1)$ objects and $n$ boxes, then some box contains at least 2 objects.

**A slightly more powerful version (the one mathematicians actually use):**
If you place $N$ objects into $k$ boxes, then some box contains at least:

$$
\left\lceil \frac{N}{k} \right\rceil
$$

objects. That ceiling symbol $\lceil \cdot \rceil$ just means “round up.”

Example: 100 people, 12 months $\rightarrow$ some month has at least $\lceil 100/12\rceil = \lceil 8.33…\rceil = 9$ birthdays.

## A “dot product style” example

**Main idea:** pigeonhole is about **forced overlap**. When possibilities are fewer than attempts, duplicates must occur.

**Example:** Pick any 6 integers. Show that two of them differ by a multiple of 5.

**How:** Every integer has a remainder when divided by 5. The possible remainders are:
$$
0, 1, 2, 3, 4
$$
That’s 5 “boxes” (remainder classes).

Your 6 integers are the “objects.”

With 6 objects and only 5 boxes, pigeonhole says: at least two integers land in the same remainder box. Suppose two integers $a$ and $b$ have the same remainder mod 5. Then:

$$
a \equiv b \pmod{5}
$$

Subtract:

$$
a - b \equiv 0 \pmod{5}
$$

So $(a-b)$ is divisible by 5. Done.

Notice the vibe: we never needed the actual integers. We forced a property to exist by counting possibilities.

## A couple of “this is why it’s sneaky” applications

1. **The handshakes in a party trick** In any group of people, two people have shaken hands the same number of times (assuming no one shakes their own hand, and handshake counts are between 0 and $n-1$).  
   *Why it works:* You can’t simultaneously have someone with 0 handshakes and someone with $n-1$ handshakes in the same group (if someone shook hands with everyone, nobody can have 0). That leaves only $n-1$ possible handshake counts for $n$ people $\rightarrow$ overlap.

2. **Hashing in computing** If a hash function outputs 256-bit values, there are only $2^{256}$ possible outputs. Feed it more than $2^{256}$ different inputs and collisions are guaranteed. Pigeonhole doesn’t tell you *which* collision, just that the universe cannot avoid one.

3. **Geometry / “crowded room” thinking** Put 13 points inside a unit square. Then two points are within distance $\le \frac{\sqrt{2}}{3}$.  
   *Why:* Divide the square into 9 smaller squares of side $1/3$. With 13 points and 9 squares, some small square gets at least 2 points. The farthest two points inside a small square are its diagonal:
   
   $$
   \sqrt{(1/3)^2+(1/3)^2}=\frac{\sqrt{2}}{3}
   $$

   That’s pigeonhole wearing a geometry costume.

## The deeper philosophical point

Physics often runs on conservation laws: energy can’t vanish, charge can’t disappear, entropy has opinions. Pigeonhole is a conservation law for *possibilities*. When outcomes are limited, repetition isn’t a surprise—it’s a necessity.

And that’s why it’s such a staple in proofs: it’s a way to turn “life is messy” into “life is cornered.”

If you later want to push this into the next tier, the two natural upgrades are the **probabilistic method** (where you prove something exists by showing it has nonzero probability) and **Ramsey theory** (the “complete order is forced by enough chaos” school of thought). Pigeonhole is the small, polite doorway into that strange mansion.
