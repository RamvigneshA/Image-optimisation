# Image Processing Lab (Node.js & Sharp)

This lab demonstrates how frontend/full-stack developers can automate image optimization during a "build" step before deploying a website. Instead of forcing the user's browser to download massive original images (like the one in `images/original.jpg`), we statically generate optimized versions ahead of time.

## What is Sharp?
[Sharp](https://sharp.pixelplumbing.com/) is an incredibly fast, high-performance Node.js image processing module. Under the hood, it uses the C++ `libvips` library, which makes it much faster (and less memory-hungry) than traditional ImageMagick or standard canvas manipulation. It's heavily used in tools like Gatsby, Next.js (`next/image`), and Nuxt for on-the-fly and build-time optimization.

## Core Concepts Taught Here

### 1. The Importance of Resizing
Modern phones take 12-48 Megapixel photos, which translates to file sizes of 3MB to 15MB. Very rarely do you need an image wider than 1200px or 1920px on the web. 
* By scaling down the physical dimensions (width/height), you exponentially reduce the file size.
* **Script:** `resize.js` generates 3 specific widths (400w, 800w, 1200w). These are the exact files you would feed into a `<img srcset="...">` attribute in HTML!

### 2. Modern Formats (WebP and AVIF)
JPEG and PNG have been around for decades. Modern formats use next-generation video compression algorithms adapted for static images.
* **WebP:** Developed by Google. Broadly supported across all modern browsers. It supports both transparency (like PNG) and lossy compression (like JPEG), and is usually 25% to 35% smaller than an equivalent JPEG.
* **AVIF:** (AV1 Image File Format). An open, royalty-free format backed by Google, Apple, and Netflix. It offers significantly better compression than WebP, often yielding file sizes 50% smaller than JPEG with similar visual fidelity.
* **Scripts:** `convert-webp.js` and `convert-avif.js` demonstrate how easy it is to change an image's coding format. You would use these output files inside a `<picture>` tag in your HTML.

## How to use this Lab

**Prerequisites:** Ensure you have Node.js installed and run `npm install` inside this directory to grab the `sharp` dependency.

### Run the Scripts
Execute these commands from your terminal inside the `image-processing-lab` folder:

1. **Resize the image into multiple widths:**
   ```bash
   npm run resize
   ```

2. **Convert the image to WebP:**
   ```bash
   npm run webp
   ```

3. **Convert the image to AVIF:**
   ```bash
   npm run avif
   ```

After running the scripts, open the `output/` folder and look at the file sizes! You'll be amazed at how much space is saved compared to the heavy `images/original.jpg` file.
