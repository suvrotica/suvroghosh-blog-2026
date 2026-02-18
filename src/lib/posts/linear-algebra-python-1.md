---
title: "Lab 01: Vectors in Python"
thumbnail: "/images/IMG-20251202-WA0009.jpg"
description: "Forget hand calculations. We start Linear Algebra by implementing it in Python immediately."
category: "engineering"
published: true
color: "blue"
---

<script>
  // We define the code here to prevent Markdown from messing up the indentation
  const vectorCode = `import numpy as np
import matplotlib.pyplot as plt

# 1. Define the vector
v = np.array([2, 3])

# 2. Setup the plot
plt.figure(figsize=(5, 5))
plt.grid(True, alpha=0.3)
plt.axhline(0, color='black', linewidth=1)
plt.axvline(0, color='black', linewidth=1)
plt.xlim(-5, 5)
plt.ylim(-5, 5)

# 3. Plot the vector as an arrow
# quiver(x, y, u, v) -> x,y is origin, u,v is direction
plt.quiver(0, 0, v[0], v[1], angles='xy', scale_units='xy', scale=1, color='blue', label='v')

plt.legend()
plt.title(f"Vector v: {v}")`;
</script>

# The Engineer's Definition

Mathematicians will tell you a vector is an object that satisfies certain axioms. Physics teachers will talk about magnitude and direction.

As a Machine Learning Engineer, a vector is simply **an ordered list of numbers**.

That's it. It's a row in your database. It's the pixel values of an image flattened out.

## Your First Vector

We don't use Python's built-in lists for this. We use **NumPy**, the bedrock of all AI.

Hit **Run** below. You will see us create a vector $\vec{v} = [2, 3]$ and plot it.

<Py code={vectorCode} />

## Challenge

Modify the code above:
1.  Create a second vector `w = np.array([-1, 2])`.
2.  Add it to the plot in `red`.
3.  Print the sum: `print(v + w)`. 

See how Python handles the element-wise addition automatically? That is the power of Linear Algebra in code.