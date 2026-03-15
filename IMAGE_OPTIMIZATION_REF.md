# 🖼️ Web Image Optimization: The Ultimate Reference

This repository is a comprehensive learning lab covering the full spectrum of image optimization, from basic HTML attributes to professional-grade on-demand optimization engines.

---

## 📂 Laboratory Overview

### 1. `image-optimization-lab` (Frontend Fundamentals)
**Goal:** Understanding how browsers handle images.
- **Key Concepts:**
  - `01-basic-img`: Preventing Layout Shift with `width`/`height`.
  - `02-srcset-responsive`: Resolution switching with `srcset` and `sizes`.
  - `03-picture-format-switch`: Format fallbacks using `<picture>` (AVIF > WebP > JPG).
  - `04-lazy-loading`: Performance with `loading="lazy"`.
  - `05-fetch-priority`: prioritizing LCP images with `fetchpriority="high"`.
  - `07-browser-selection-algorithm`: Interactive playground for DPR and browser math.

### 2. `image-processing-lab` (Node.js & Sharp)
**Goal:** Manual backend processing.
- **Key Tools:** [Sharp](https://sharp.pixelplumbing.com/)
- **Operations:** resizing by width, converting to modern formats (WebP, AVIF) with quality controls.

### 3. `image-build-pipeline-lab` (Automation)
**Goal:** Scaling the process.
- **Workflow:** A single `npm run build` command that generates 9 variants (3 sizes × 3 formats) in one pass using `Promise.all`.

### 4. `nextjs-image-engine-lab` (The Holy Grail)
**Goal:** Simulating modern meta-framework internals.
- **Scenario A (Manifest):** Build-time generation + JSON metadata map. Frontend component (`<smart-image>`) hydrates the manifest into a `<picture>` tag.
- **Scenario B (Dynamic/On-Demand):** An Express server (`server.js`) that optimizes images **at runtime** via a specialized route (`/_image?url=...`). Features on-the-fly resizing and cache-to-disk logic.

---

## 🚀 Quick Reference: The Optimization Checklist

### 📐 Size & Dimensions
- **Always** provide `width` and `height` to the `<img>` tag to reserve space and prevent **Cumulative Layout Shift (CLS)**.
- Use `srcset` to provide options (e.g., `400w`, `800w`, `1200w`).
- Define `sizes` to tell the browser how much space the image occupies (e.g., `(max-width: 600px) 100vw, 50vw`).

### 📦 Modern Formats
- **AVIF:** Highest compression, best for modern browsers (Chrome, Safari, Firefox).
- **WebP:** Great quality/size ratio, universal modern support.
- **JPEG:** Reliable fallback for ancient browsers.

### ⚡ Performance
- **Lazy Load:** Use `loading="lazy"` for everything below the fold.
- **High Priority:** Use `fetchpriority="high"` for the "Hero" or LCP image.
- **Async Decoding:** Use `decoding="async"` to prevent the browser from blocking the main thread while decoding high-res images.

---

## 🛠️ The Sharp "Pro" Settings
- **WebP:** `quality: 80` is usually the sweet spot.
- **AVIF:** `quality: 50` often looks as good as WebP at 80 but is significantly smaller.
- **Resize:** Always prefer `fit: 'cover'` or simply providing a `width` (Sharp maintains aspect ratio by default).

---

## 🧮 The Browser Math
`Needed Width = Display Width (CSS pixels) × Device Pixel Ratio (DPR)`
*Example: A 300px image on an iPhone (DPR 3) requires a 900px wide file for a sharp, non-blurry look.*
