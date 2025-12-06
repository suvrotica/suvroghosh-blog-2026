import fs from 'node:fs';
import path from 'node:path';

// Prerender this page so it generates a static list of images at build time.
// When you add new images to the repo and deploy, this list updates.
export const prerender = true;

export const load = async () => {
    const imagesDir = path.join(process.cwd(), 'static', 'images');
    
    if (!fs.existsSync(imagesDir)) {
        return { images: [] };
    }
    
    const files = await fs.promises.readdir(imagesDir);
    
    // Filter for valid image extensions and create public paths
    const images = files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map((file) => `/images/${file}`);

    return { images };
};