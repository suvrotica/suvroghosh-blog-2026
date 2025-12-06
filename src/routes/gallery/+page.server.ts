import fs from 'node:fs';
import path from 'node:path';

// CRITICAL: This forces the code to run at build time, where 'static/images' is accessible.
// On Vercel runtime, this folder does not exist in the serverless function sandbox.
export const prerender = true;

export const load = async () => {
    // Construct path reliably using process.cwd()
    const imagesDir = path.join(process.cwd(), 'static', 'images');
    
    // Safety check
    if (!fs.existsSync(imagesDir)) {
        console.warn(`[Gallery] Directory not found: ${imagesDir}`);
        return { images: [] };
    }
    
    const files = await fs.promises.readdir(imagesDir);
    
    // Filter for images and create root-relative paths (e.g., /images/photo.jpg)
    const images = files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map((file) => `/images/${file}`);

    return { images };
};
