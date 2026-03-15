# Automated Image Build Pipeline Lab

This lab simulates what happens behind the scenes in modern Meta-frameworks like **Next.js**, **Gatsby**, or **Nuxt.js** during their "build" steps.

Instead of writing individual resizing or conversion scripts and running them manually one by one, modern projects automate this entirely through a "build pipeline".

## How Automated Pipelines Work
In a real-world project, an editor might upload a single, massive 4000x3000 Hero image. The developer doesn't have the time to manually open Photoshop, crop it to 3 different sizes, and export it as JPEG, WebP, and AVIF.

Instead, the frontend build pipeline intercepts that image file just before the site is deployed to the server (the `dist/` or `out/` folder). A script automatically grabs the master image and outputs 9 different highly-optimized permutations. 

## The `build-images.js` Script
If you open `/scripts/build-images.js`, you'll see a script holding an array of `sizes = [400, 800, 1200]`. 
It iterates through those sizes and uses `Promise.all` to concurrently transform the source image into JPEG, WebP, and AVIF.

### Why do we need so many variants?
Because creating a fully responsive, backwards-compatible `<picture>` tag requires it!

To serve an image flawlessly across a mobile 3G user on an old browser, and a 5G user on a modern Retina MacBook, your HTML requires all of those build outputs:

```html
<picture>
  <!-- Load AVIF if supported, matching width to screen size -->
  <source type="image/avif" srcset="dist/hero-400.avif 400w, dist/hero-800.avif 800w, dist/hero-1200.avif 1200w">
  
  <!-- Fallback to WebP if AVIF unsupported -->
  <source type="image/webp" srcset="dist/hero-400.webp 400w, dist/hero-800.webp 800w, dist/hero-1200.webp 1200w">
  
  <!-- Fallback to standard JPEG if all else fails -->
  <img src="dist/hero-800.jpg" srcset="dist/hero-400.jpg 400w, dist/hero-800.jpg 800w, dist/hero-1200.jpg 1200w" alt="Hero Image">
</picture>
```

## How to use this Lab

**Prerequisites:** Ensure you have Node.js installed and run `npm install` inside this directory to grab the `sharp` dependency.

1. **Run the Pipeline:** 
   Execute the automated build command:
   ```bash
   npm run build
   ```

2. **Watch the Output:**
   Observe the console logs indicating the processing status. 

3. **Check the Deploy Folder:**
   Open the `/dist` directory. You will find exactly 9 cleanly labeled images, ready to be deployed to a CDN or production server!
