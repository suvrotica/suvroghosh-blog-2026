<script lang="ts">
	import ComplexPlane from '$lib/components/viz/ComplexPlane.svelte';
    	import SEO from '$lib/components/seo/SEO.svelte';

        	let title = 'Visualizing Complex Functions';
            	let description = 'An interactive exploration of the complex plane using Domain Coloring.';
                </script>

                <SEO {title} {description} />

                <article class="container mx-auto py-12 max-w-4xl">
                	<header class="mb-10 text-center">
                    		<h1 class="mb-4">{title}</h1>
                            		<p class="text-neutral-500 dark:text-neutral-400 font-mono text-sm uppercase tracking-widest">
                                    			Interactive Engineering
                                                		</p>
                                                        	</header>

                                                            	<div class="prose dark:prose-invert max-w-none mb-12">
                                                                		<p>
                                                                        			Complex analysis is often beautiful but hard to visualize. We are mapping a 2D plane (the Domain) to another 2D plane (the Codomain). 
                                                                                    			Since we need 4 dimensions to see this graph fully ($x, y$ in, $u, v$ out), we use <strong>Domain Coloring</strong>.
                                                                                                		</p>
                                                                                                        		<p>
                                                                                                                			In the visualization below, every pixel represents a complex number $z = x + iy$. We calculate $w = f(z)$. 
                                                                                                                            			The <strong>color</strong> of the pixel represents the angle (argument) of $w$, and the <strong>contour bands</strong> represent the magnitude (modulus) of $w$.
                                                                                                                                        		</p>
                                                                                                                                                	</div>

                                                                                                                                                    	<ComplexPlane initialExpression="1 / (z - 1)" />

                                                                                                                                                        	<div class="prose dark:prose-invert max-w-none mt-12">
                                                                                                                                                            		<h2>Try these functions:</h2>
                                                                                                                                                                    		<ul>
                                                                                                                                                                            			<li>
                                                                                                                                                                                        				<strong>Möbius Transformation:</strong> <code>(z - 1) / (z + 1)</code> — Maps the right half-plane to the unit disk.
                                                                                                                                                                                                        			</li>
                                                                                                                                                                                                                    			<li>
                                                                                                                                                                                                                                				<strong>Exponential:</strong> <code>exp(z)</code> — Notice how vertical lines map to circles and horizontal lines map to rays.
                                                                                                                                                                                                                                                			</li>
                                                                                                                                                                                                                                                            			<li>
                                                                                                                                                                                                                                                                        				<strong>Riemann Zeta (approx):</strong> <code>1 + 1/(2^z) + 1/(3^z)</code> — A simple finite series approximation.
                                                                                                                                                                                                                                                                                        			</li>
                                                                                                                                                                                                                                                                                                    		</ul>
                                                                                                                                                                                                                                                                                                            		
                                                                                                                                                                                                                                                                                                                    		<h3 class="mt-8">Technical Note</h3>
                                                                                                                                                                                                                                                                                                                            		<p>
                                                                                                                                                                                                                                                                                                                                    			This component runs entirely in your browser using Svelte 5 runes for state management and Math.js for parsing. 
                                                                                                                                                                                                                                                                                                                                                			It iterates over {200*200} pixels in real-time to generate the texture.
                                                                                                                                                                                                                                                                                                                                                            		</p>
                                                                                                                                                                                                                                                                                                                                                                    	</div>
                                                                                                                                                                                                                                                                                                                                                                        </article>