# Next.js Style Image Engine Lab

This lab culminates all core concepts of web image optimization by replicating the internal architecture of the Next.js `<Image />` component using Vanilla JS and Node.js.

## The Architecture

Powerful meta-frameworks abstract away the complexity of `<picture>`, `<source>`, `srcset`, and `sizes` by handling the heavy lifting in two phases:

### Phase 1: The Build Step (`build-images.js`)
When you run a build command, the server-side Node.js script uses the `sharp` library to read raw `.jpg` or `.png` assets. It then recursively loops through:
1. **Target Viewport Widths** (e.g., 400px, 800px, 1200px)
2. **Target Modern Formats** (AVIF, WebP, JPEG fallback)

Crucially, it doesn't just generate these files. It creates an `image-manifest.json` file. This acts as a centralized database detailing *exactly* what optimizations exist on the server.

### Phase 2: The Frontend Engine (`smart-image` Web Component)
The developer experience (DX) is purposefully kept simple:
```html
<smart-image sizes="(max-width: 768px) 100vw, 800px"></smart-image>
```

When the browser parses this HTML:
1. The custom `SmartImage` Web Component activates.
2. It fetches the `image-manifest.json` database.
3. It iterates through the arrays inside the JSON.
4. It dynamically builds the massive, complex `<picture>` block, filling out `type="image/avif"`, generating the `400w, 800w` comma-separated `srcset` strings via a helper function, and applying `loading="lazy"` automatically.
5. It injects the result into the DOM.

A developer never has to write a 15-line `<picture>` tag ever again!

## How to use this Lab

**Prerequisites:** 
You must run a local server (like `Live Server` in VS Code, or `python -m http.server`) to view `index.html`. Browsers block local `.html` files from making `fetch()` requests to `.json` files due to CORS security policies!

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Build Pipeline:**
   ```bash
   npm run build
   ```
   *Watch the `dist/` folder. Ensure the JSON manifest appears alongside the images.*

3. **Serve the HTML:**
   Start your local server and open `index.html`.

4. **Inspect the Magic:**
   Right-click the rendered image on the webpage and select **Inspect**. You will see that your tiny `<smart-image>` tag generated a massive, production-grade `<picture>` element!
