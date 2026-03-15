const express = require('express');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const IMAGE_DIR = path.join(__dirname, 'images');
const CACHE_DIR = path.join(__dirname, 'dist/cache');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

/**
 * THE CORE DYNAMIC IMAGE ROUTE
 * Mimics Next.js /_next/image or Vercel's image optimization
 * Usage: /_image?url=hero.jpg&w=800&q=75&fm=webp
 */
app.get('/_image', async (req, res) => {
    const { url, w, q = 75, fm = 'webp' } = req.query;

    if (!url) {
        return res.status(400).send('Missing url parameter');
    }

    const width = parseInt(w);
    if (!width || isNaN(width)) {
        return res.status(400).send('Missing or invalid width (w) parameter');
    }

    const sourcePath = path.join(IMAGE_DIR, url);

    if (!fs.existsSync(sourcePath)) {
        return res.status(404).send('Image not found');
    }

    // 1. SIMPLE CACHE CHECK
    // In a real system (like Next.js), we hash the params for the filename
    const cacheKey = `${url}-${width}-q${q}.${fm}`;
    const cachePath = path.join(CACHE_DIR, cacheKey);

    if (fs.existsSync(cachePath)) {
        console.log(`🚀 Serving cached: ${cacheKey}`);
        return res.sendFile(cachePath);
    }

    try {
        console.log(`🔥 Optimizing on-demand: ${url} -> ${width}px, format: ${fm}`);

        // 2. SHARP DYNAMIC PROCESSING
        const transformer = sharp(sourcePath)
            .resize({ width: width })
            .toFormat(fm, {
                quality: parseInt(q)
            });

        // 3. CACHE THE RESULT
        await transformer.toFile(cachePath);

        // 4. RESPOND
        res.type(`image/${fm}`);
        res.sendFile(cachePath);

    } catch (err) {
        console.error('Sharp Processing Error:', err);
        res.status(500).send('Error processing image');
    }
});

// Serve static files (index.html, script.js, etc.)
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`
🌟 NEXT.JS IMAGE ENGINE SIMULATOR (DYNAMIC V2)
-----------------------------------------------
Server running at: http://localhost:${PORT}

GET /_image?url=hero.jpg&w=400&q=75&fm=webp
    `);
});
