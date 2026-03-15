/**
 * THE DYNAMIC IMAGE COMPONENT (v2)
 * 
 * Unlike the first version, this component DOES NOT need a manifest.
 * It dynamically generates URLs that point to our server-side /_image route.
 */
class DynamicImage extends HTMLElement {
    
    connectedCallback() {
        this.render();
    }

    render() {
        const src = this.getAttribute('src'); // e.g., "hero.jpg"
        const alt = this.getAttribute('alt') || '';
        const sizes = this.getAttribute('sizes') || '100vw';

        if (!src) {
            this.innerHTML = `<p style="color:red">Error: dynamic-image requires a 'src' attribute.</p>`;
            return;
        }

        // We define our target widths for the srcset
        const widths = [400, 800, 1200, 1600];

        // Create srcset strings by pointing to our DYNAMIC server route
        // /_image?url=...&w=...&fm=...
        const createDynamicSrcset = (format) => {
            return widths
                .map(w => `/_image?url=${src}&w=${w}&fm=${format}&q=75 ${w}w`)
                .join(', ');
        };

        // Construct the picture block using the dynamic URL architecture
        this.innerHTML = `
            <picture>
                <source type="image/avif" srcset="${createDynamicSrcset('avif')}" sizes="${sizes}">
                <source type="image/webp" srcset="${createDynamicSrcset('webp')}" sizes="${sizes}">
                <img 
                    src="/_image?url=${src}&w=800&fm=jpeg&q=75" 
                    srcset="${createDynamicSrcset('jpeg')}" 
                    sizes="${sizes}" 
                    alt="${alt}" 
                    loading="lazy"
                    decoding="async"
                >
            </picture>
        `;
    }
}

customElements.define('dynamic-image', DynamicImage);
