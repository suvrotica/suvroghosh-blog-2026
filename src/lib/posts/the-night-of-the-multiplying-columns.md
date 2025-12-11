---
title: "The Night of the Multiplying Columns"
date: "2025-12-11"
description: "A matrix is just a rectangular grid of numbers, but the way we multiply them is so specific, so oddly ritualistic, that sometimes I think it could only have been invented in a civilization intimately familiar with bureaucracy."
thumbnail: "/images/IMG-20251207-WA0018.jpg"
category: "mathematics"
color: "green"
published: true
---

<Pi
    src="IMG-20251207-WA0018.jpg" 
    caption="Matrix multiplication is, at heart, composing transformations"
/>

The first time a matrix product really hit me in the gut—not the exam kind of hit, the existential kind—was not in school, or college, or even during those GRE years when I was pretending to be a serious man of numbers.

It was in my late forties, at a cheap wooden table in a decaying North Calcutta room, under a ceiling fan that made a sound like a pensioned-off helicopter, when I realized that my entire life could be written as a very sad dot product.

One vector: all the things I managed to learn—linear algebra, probability, a smattering of measure theory, enough programming languages to confuse any HR manager.
Another vector: all the things this economy actually rewards—networking, sycophancy, photogenic confidence, an instinct for flattering the nearest powerful posterior while keeping one’s own hygienic and well-insured.

Take the dot product of those two, and you get a scalar.
My scalar is small. Let us say… numerically unimpressive.

This is the thing about matrix and vector products. They look like sterile notation—arrows and brackets and indices—but each of them is secretly a different way of asking: What happens when this tangled human mess meets that tangled human mess? Alignment, misalignment, area of conflict, volume of compromise, how patterns echo, how patterns die.

Underneath, they’re all just ways of combining lists of numbers. But then, a human life is also just combining lists—grocery lists, grudges, unfinished tasks, unread books, unpaid bills. When you stack enough lists, what you have is either a matrix or a psychiatric file. In my case, both.

## Vectors: Grocery Lists with Attitude

A vector is just a list with direction, which is a fancy way of saying: it’s a grocery list that cares about where you are in the supermarket.

If you write down:
* 2 kg rice
* 1 kg potatoes
* 0.5 kg onions

This is already a vector. A small, domestic, carbohydrate-heavy vector. If I assign each of these items a price and take the dot product with the quantity vector, I get the bill. This is the original, brutally honest, pre-Facebook use of the dot product: to remind you you’re poor.

Historically, the idea of “multiplying” vectors starts with geometry: lengths, angles, projections. Euclid, of course, did geometry without vectors, the way our politicians do development—lots of waving hands, minimal coordinates. The real shift came when people started turning geometry into algebra. Descartes gave us the idea of coordinates; later, people quietly realized that once you have coordinates, a point is just a vector that has accepted a fixed origin in its life.

The dot product—$a \cdot b$—is where that all crystallizes. It says:

1. If two vectors point in the same direction, their dot product is big and positive.
2. If they are perpendicular, the product is zero.
3. If they are opposed, the product is negative, like a bad marriage score.

In my head, the dot product has always felt like a meddling family elder evaluating compatibility. “How aligned are these two?” they ask, peering at your occupation vector and your partner’s horoscope vector. If the dot product is large, the committee nods. If it is negative, you will be advised to pray or to adjust your expectations (usually both).

Of course no one calls it that in the textbooks. In the textbooks, it’s “inner product,” and when you go to more abstract spaces, you get Hilbert spaces and sesquilinear forms and other phrases that sound like well-funded medical conditions. But underneath all the solemn terminology is a simple question: how much of you points in the same direction as that?

Which is also how I experience my moods. On some days, my internal state vector has a high dot product with “functioning adult”: emails sent, dishes washed, a little algebra done. On other days, my state vector is almost orthogonal to everything useful. The projection onto “basic chores” is nearly zero; the projection onto “lying like a stunned amphibian, scrolling news about collapsing democracies” is close to maximal.

Mathematicians don’t call this mental health. They call it “components along a basis.”

## Cross Product: The Rude Perpendicular

Then you have the cross product, which exists mainly to punish three-dimensional vectors who were feeling too important.

Unlike the dot product, which gives a scalar, the cross product of two 3D vectors gives another vector—perpendicular to both, with a magnitude equal to the area of the parallelogram they span. It is the vector equivalent of a third party barging into an argument and saying, “You two are boring; I’m going to stand at right angles to this entire discussion.”

Historically, the cross product is tangled with the birth of vector calculus. William Rowan Hamilton invented quaternions (a sort of four-dimensional numeric contraption for rotations), and then Josiah Willard Gibbs and Oliver Heaviside came along and, like efficient corporate consultants, stripped quaternions down into the more marketable “vector calculus” with the dot and cross products as user-facing widgets.

If the dot product is a measure of alignment, the cross product is a measure of sidewaysness. It encodes area and orientation. It’s what you secretly compute when you feel torque—like when you’re trying to open a rusted iron gate in Calcutta humidity, applying force at a handle far from the hinge. The bigger the perpendicular component and the farther out you push, the more the gate groans in protest. That’s physics phrased in cross-productese.

There is something deeply petty about the cross product’s insistence on dimensional exclusivity. It works in three dimensions (our everyday world) and, for extremely mysterious reasons, also in seven. Everywhere else, the universe shrugs. As if to say: “I gave you three dimensions to mess up roads, politics, and climate; do you really need a neat little perpendicular gadget in five?”

In my life, the cross product is the measure of how much area I cover while pacing during hypomania, the frantic rectangle traced between window, desk, bed, and bathroom. Two directions of restlessness produce a third direction of displacement: I start the day planning to read a serious paper and end up, several perpendicular mental jumps later, watching videos of obscure Soviet-era documentaries on photon physics. The magnitude of this cross product is always much larger than I intended.

## Matrix Multiplication: Bureaucracy in Brackets

Now we come to the main villain–hero: matrix multiplication.

If vectors are grocery lists, matrices are the entire ration shop, with all the counters and queues and clerks and ledger books stacked on top of each other. A matrix is just a rectangular grid of numbers, but the way we multiply them is so specific, so oddly ritualistic, that sometimes I think it could only have been invented in a civilization intimately familiar with bureaucracy.

You take a row from the first matrix and a column from the second, do a dot product, and put the result in the corresponding entry. Then you do this again and again, like a babu stamping forms that pass under his hand: one row meets one column, thump, next.

Historically, the word “matrix” itself came from James Joseph Sylvester in the 19th century, who imagined a matrix as a sort of “womb” from which determinants are born. Arthur Cayley then wrote one of the first serious papers on matrix algebra, basically saying, “These rectangular things deserve their own life.” Much of this work was, in a very British way, ignored for a while—too abstract, too early—until physics, engineering, and then computer science arrived panting at the door, desperately needing a way to tame systems of equations, rotations, networks, quantum states, and later, via neural networks, our entire online behaviour.

Matrix multiplication is, at heart, composing transformations. You send a vector through one matrix—stretching and rotating it in some shabby but deterministic manner—and then through another, and the combined effect is just another matrix. This is the algebraic version of how a middle-class Indian life is transformed by school, then college, then job: each institution a linear operator, shaving off some components, amplifying others, until the original vector is unrecognizable.

In my case, the school matrix took a child who liked drawing and daydreaming and multiplied him into someone who could perform long division on command but had no idea why anyone would want to. The engineering-education matrix (okay, computer science, but in India the distinction is cosmetic) applied another transformation: learned helplessness about asking “why,” exaggerated confidence about reciting algorithms from memory.

You could write my entire educational journey as:

$$
\text{Adult Me} = M_{\text{job}} \cdot M_{\text{university}} \cdot M_{\text{school}} \cdot \text{Child Me}
$$

with each $M$ quietly erasing a few dimensions: curiosity, joy, spontaneity. The determinant of the combined transformation is probably close to zero.

## Outer Product: Broadcasting Obsessions

If the dot product answers, “How aligned are these two?”, the outer product answers, “What happens if I broadcast this obsession in all directions?”

Take a column vector $u$ and a row vector $v^\top$. Multiply them, and you get a matrix: each entry is $u_i v_j$. Rank one. One-dimensional in its soul, but smeared over a grid. This is the mathematical wallpaper pattern made from a single motif.

This is exactly how my mind behaves during hypomania. One idea—say, “I will write a gigantic exposition on matrix products and life” (you are currently trapped in the result)—multiplies with every other half-formed thought, covering the intellectual walls with an unreasonably grand design. Everything I see becomes a candidate for that same pattern: I go from vector products to road engineering to Indian politics to American decline to bipolar diagnostics, all from the same column vector of anxiety, multiplied by a row vector of passing stimuli.

Outer products show up everywhere: in statistics (covariance matrices), in machine learning (low-rank approximations), in physics (dyadics), in frighteningly earnest research papers that say things like “rank-1 update” as if it is not just a particularly efficient way of making the same mistake at scale.

If the modern web economy had to choose a mascot, it would be the outer product: one tiny preference of yours multiplied by every advertiser’s campaign vector, yielding a vast matrix of “personalized” nonsense.

## Hadamard: Elementwise Entanglements

Then there is the Hadamard product, which is what happens when someone says, “Can we just multiply the entries one by one, please, without all this row-column drama?”

Given two matrices of the same size, the Hadamard product is just:

$$
(A \circ B)_{ij} = A_{ij} B_{ij}
$$

No dot products, no sums; just a quiet marriage of corresponding entries. It is the introvert of matrix products: you stay in your lane, I stay in mine, we multiply and move on.

Named after Jacques Hadamard, who did many more impressive things than invent this modest operation, it shows up in modern deep learning, signal processing, and every place where you want “masking” or “gating” behaviour. You have one matrix of data and another matrix of weights, switches, or probabilities; you Hadamard them together and get something selectively amplified or muted.

This feels eerily like adulthood. You have your original personality matrix—rows of traits, columns of contexts—and then you have a mask matrix made of social expectations, unspoken family rules, collective hysteria, and the very real need to not jeopardize food and rent. Multiply them elementwise, and you get the person you actually present to the world. Some entries become zero, some shrink, a few lucky ones are allowed to stay near one.

On days of deep depression, my personal mask matrix is mostly zeros. On hypomanic days, it is mostly ones, sometimes greater than one, which is when emails become uncomfortably long and conversations acquire the intensity of a badly tuned spotlight.

## Kronecker: Bureaucracy, Repeated and Enlarged

The Kronecker product is what you get when a normal matrix looks at a system and says, “No, no, this is not nearly complicated enough; let me make a bigger mess.”

Given two matrices $A$ and $B$, the Kronecker product $A \otimes B$ replaces each entry of $A$ with that entry multiplied by the entire matrix $B$. You start with something manageable and end up with a massive block matrix. It’s like when the government says, “We will create a single form to simplify things,” and then every department copies that form and adds three more pages of their own.

Historically, it is named after Leopold Kronecker, who had many opinions about arithmetic and famously distrusted the more airy branches of analysis. Ironically, his product is now loved by people who want to write elegant tensor equations for sprawling systems—signal-processing folks, quantum information theorists, and anyone trying to model networks that have sub-networks inside them.

In my life, the Kronecker product is the intellectual equivalent of opening too many browser tabs. You start with one small task—say, reading about the history of the dot product—and then for each paragraph you open three more references, which themselves explode into another set. Very soon, the mental matrix has dimension $n^2$ instead of $n$, and you are paralyzed, sipping cold tea and staring at a forest of unopened PDFs.

The Internet is essentially humanity’s global Kronecker product: every opinion multiplied by every platform, every prejudice tiled across every feed, until the resulting matrix is so huge that no one even pretends to understand it. We just sample a few rows and assume it is representative. It usually isn’t.

## Convolution as a Product: Smoothing and Smearing

There is another kind of “product” that hides behind the scenes: convolution. Analysts will insist it is not a simple product but an integral, a sum, a transform; but computationally, on a discrete grid, it is matrix multiplication in disguise.

You slide a small “kernel” vector along a longer signal and take dot products at each shift. This is how images are blurred, edges detected, audio filtered, neurons approximated in early vision models, and also, metaphorically, how memory treats our past: we convolve experiences with a kernel of nostalgia or resentment and store the result as “what really happened.”

The kernel my brain uses is not stable. On good days, it is a gentle averaging filter: everything seems softer, the worst bits smoothed out. On bad days, it is a high-pass filter that amplifies every sharp edge—every slight, every humiliation, every bureaucratic affront. The original signal of events is the same; the subjective convolution kernel changes with blood sugar and air pollution.

Mathematically, convolution is commutative under the right conditions: $f * g = g * f$. Psychologically, not so much. The experience convolved with mood is not the same as mood convolved with experience. One precedes, one follows. The order in which you apply operators matters—a fact that matrix multiplication also screams at us, since in general $AB \neq BA$.

If there is a single deep lesson from all of this, it is: order matters. In transformations, in politics, in education, in the sequence of traumas you survive. The same matrices composed in a different order produce a different life.

## Wedge Product: Shadows of Area and Volume

The exterior product, commonly written as a wedge $u \wedge v$, is like the cross product’s cooler, more abstract cousin who left home early and refuses to attend family functions.

Before Gibbs and Heaviside simplified everything into dot and cross, there was Hermann Grassmann, a German schoolteacher who invented an astonishingly modern algebra of “extensive magnitudes”—things that could represent lines, areas, volumes in a single unified framework. His work was so far ahead of his time that the mathematical establishment of the day mostly ignored him, the way India ignores anyone who talks sense without the correct institutional letterhead.

In Grassmann’s exterior algebra, $u \wedge v$ is an oriented area element, living not as a vector in the original space but as a bivector in a slightly different one. The wedge product of more vectors gives you higher-dimensional “volume” elements. You can then define integrals, flux, and other delicious things without constantly drawing arrows and right-hand-rule diagrams.

I like the wedge product partly because of Grassmann’s biography—teacher by day, innovator in his spare time, recognized fully only after his usefulness to contemporary gatekeepers had lapsed. It feels familiar. The wedge for me is the product that encodes those invisible, forgotten areas: the spaces between what I imagined my life would be and the flat reality that followed.

You take two directions of aspiration, wedge them together, and what you get is the area of disappointment.

## Gram, Inner Products, and Redundant Bookshelves

Take a collection of vectors and compute all their pairwise dot products. Arrange these into a matrix. This is the Gram matrix. It tells you how redundant your set of vectors is: if many of them point in similar directions, the matrix has low effective rank.

My bookshelves are a physical Gram matrix of my delusions of productivity. Linear algebra textbooks stacked next to functional analysis, probability next to statistics, physics monographs, philosophy paperbacks—all of them bought with the dim hope that this one will be the key.

If I were honest, I would admit that half of them are nearly linearly dependent: different authors, same subspace. Strang, Axler, Lax, Halmos—different bases for the same conceptual space. The Gram matrix of my library has significant eigenvalues only in a few dimensions. I like to imagine myself as a broad, high-dimensional intellect; the spectral decomposition of my actual reading suggests a somewhat narrower band.

Inner products in general are just ways of deciding what “angle” means. In school, we inherit the Euclidean inner product without consent, the way we inherit caste, religion, or nationality. Later, you realize you can define different inner products that weight directions differently. Some components count more; some count less. Suddenly, orthogonality changes: what used to be “unrelated” becomes “closely aligned” under a new metric.

This is exactly how ideological shifts work. You redefine the inner product on the space of citizens: suddenly, linguistic identity counts more, religious conformity counts more, economic justice counts less. Under the new inner product, the same population is now orthogonal or aligned in different ways. Old friendships become awkward, new alliances form.

Mathematically, it is just a positive-definite matrix $M$ so that $\langle x, y \rangle_M = x^\top M y$. Politically, it is propaganda and policy. Psychologically, it is what happens when a depressive phase reweights everything so that small embarrassments from twenty years ago have enormous norm and current achievements have almost none.

## America, India, and the Product of Expectations

Between 1998 and 2014, I inhabited an America that felt—perhaps naively—like a high-dimensional space of possibilities. Not equal possibilities, mind you; systemic inequity is everywhere; but still, there was a sense that matrices could be reconfigured, that linear combinations could be explored.

You could be a mildly eccentric, brown, unglamorous person and still find niche subspaces to live in: university labs, slightly shabby apartments, long bookstore aisles, used-CD racks. Your state vector might be small in some directions (charisma, height, creditworthiness), but nontrivial in others (technical competence, curiosity), and the system had some tolerance for that.

The America of the Trump years, glimpsed from here, looks like someone has replaced the transformation matrix with a more brutal one—one that amplifies the components of performative grievance and suppresses the components of quiet competence. But this is not a uniquely American sin. In India, we have been doing this spectral editing for decades. We simply lacked the marketing budget to brand it.

Both countries are now engaged, in their own flavours, in a large, ugly matrix product:

$$
\text{Future} = M_{\text{capital}} \cdot M_{\text{propaganda}} \cdot M_{\text{extraction}} \cdot \text{Present}
$$

And then we pretend the result is “destiny” or “civilizational resurgence,” depending on which television channel you watch.

The irony, of course, is that all the miraculous machinery of modern power—from surveillance capitalism to AI to logistics—runs on precisely the matrix and vector products that very few citizens are encouraged to actually understand. The same dot products and convolutions that drive recommendation engines could, in a healthier world, be used to teach people how to reason about evidence, uncertainty, and bias. Instead, they are mostly used to optimize which advertisement best exploits your late-night anxiety.

## My Life as a Degenerate Product

Every now and then, when the mood is marginally breathable, I like to think of myself not as a static, failed point in space but as a long composition of operators. Parents, school, tuition teachers, college professors, bosses, lovers, doctors, random strangers on buses—all linear maps of varying niceness, some orthogonal, some highly skew, many poorly conditioned.

You start with a noisy but hopeful vector and apply:

$$
M_n \cdots M_2 M_1
$$

until the result is whatever middle-aged creature now stares at half-written drafts and cooling cups of green tea.

In linear algebra, if the product of a bunch of matrices ends up collapsing most directions, you say the system is nearly singular. Small changes in input produce wild changes in output. That’s not a terrible description of bipolarity either: minor fluctuations in sleep, food, or social friction can flip me from hypo-verbose academic clown to flattened, monosyllabic fossil. The condition number is high.

The nice thing about linear maps, though, is that sometimes you can change basis. You cannot change the underlying transformation, but you can find a coordinate system in which it looks simpler, less threatening—perhaps diagonal, perhaps block-upper-triangular.

For me, writing is a change-of-basis operation. Same messy operator, but expressed in a basis of sentences instead of a basis of “to-do items” or “respectable achievements.” The matrix of my life in the career basis looks terrible; in the basis of private metaphors and half-baked mathematical essays, it has at least a few diagonal entries that are not zero.

It is not redemption. It is numerical conditioning.

## Small Products, Still Nonzero

At the end of a day like this, with the fan sawing the same warm air and the city’s noise diffused into a dull background convolution, I close the notebook on which I have drawn yet another rectangle of numbers.

Somewhere, enormous data centers are performing trillions of matrix multiplications per second to decide what advertisement to show a 17-year-old in Ohio or which news headline will maximize outrage in Bengaluru. Somewhere, an overworked teacher is trying to explain $(AB)C = A(BC)$ to a classroom whose real concern is whether there will be decent jobs in ten years. Somewhere, a lonely student is staring at a cross product formula, wondering why the world insists on three dimensions when two are already hard enough.

Here, at this table, I am just one small vector, trying to take the inner product of my limited time with the things that still make sense—numbers that talk to each other, spaces that can be rotated in the head, the tiny thrill when a metaphor fits exactly like a well-chosen basis.

The scalar that comes out is not large. It will not move markets or win prizes or even pay for better furniture.

But for tonight, it is nonzero.

I put the pen down, let the matrices remain unfinished, and allow the fan’s tired blades to keep rotating—the simplest, most faithful vector product in the room, still turning, still perpendicular to its own axis, stubbornly multiplying air by time.
