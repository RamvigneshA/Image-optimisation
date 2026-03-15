const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../images/hero.jpg');
const outputDir = path.join(__dirname, '../dist');

// Define sizes needed for responsive layout
const sizes = [400, 800, 1200];

// Ensure distribution directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🚀 Starting Build Pipeline: Converting Hero Image...\n');

// Wrap processing in an async function so we can use modern `await` syntax
async function buildImages() {
    try {
        // Iterate over sizes
        for (const width of sizes) {
            console.log(`\n--- Generating images for ${width}px width ---`);

            // Output filenames
            const fileJpg = path.join(outputDir, `hero-${width}.jpg`);
            const fileWebp = path.join(outputDir, `hero-${width}.webp`);
            const fileAvif = path.join(outputDir, `hero-${width}.avif`);

            // Step 1: Create the base Sharp instance resized to current width
            // We clone it so we can run three distinct formatting operations in parallel
            const baseImage = sharp(inputPath).resize({ width: width });

            // Step 2: Kick off all three conversions simultaneously using Promise.all
            console.log(`⏱️  Processing hero-${width}.jpg...`);
            console.log(`⏱️  Processing hero-${width}.webp...`);
            console.log(`⏱️  Processing hero-${width}.avif...`);

            await Promise.all([
                // Generate JPEG
                baseImage.clone()
                    .jpeg({ quality: 80 })
                    .toFile(fileJpg)
                    .then(info => console.log(`   ✅ Created hero-${width}.jpg \t(${(info.size / 1024).toFixed(1)} KB)`)),

                // Generate WebP
                baseImage.clone()
                    .webp({ quality: 80 })
                    .toFile(fileWebp)
                    .then(info => console.log(`   ✅ Created hero-${width}.webp \t(${(info.size / 1024).toFixed(1)} KB)`)),

                // Generate AVIF
                baseImage.clone()
                    .avif({ quality: 50 })
                    .toFile(fileAvif)
                    .then(info => console.log(`   ✅ Created hero-${width}.avif \t(${(info.size / 1024).toFixed(1)} KB)`))
            ]);
        }
        console.log('\n🎉 Build pipeline complete! All images optimized and saved to /dist.');

    } catch (err) {
        console.error('❌ Build pipeline failed:', err);
    }
}

// Execute the pipeline
buildImages();
