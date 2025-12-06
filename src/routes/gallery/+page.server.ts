import fs from 'node:fs';
import path from 'node:path';

export const load = async () => {
    // Define the path to your static images folder
    const imagesDir = 'static/images';
    
    // Read directory
    const files = await fs.promises.readdir(imagesDir);
    
    // Filter for image extensions and create public URL paths
    const images = files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map((file) => `/images/${file}`);

    return { images };
};
