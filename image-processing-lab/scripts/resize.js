const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Define input and output paths
const inputPath = path.join(__dirname, '../images/original.jpg');
const outputDir = path.join(__dirname, '../output');

// Ensure output directory exists (create it if not)
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Define the target widths we want to generate
const sizes = [400, 800, 1200];

console.log('Starting image resizing...');

// Loop through each size and create a resized copy
sizes.forEach(width => {
    // Determine the new filename: e.g., original-400w.jpg
    const outputPath = path.join(outputDir, `original-${width}w.jpg`);

    // Use Sharp to process the image
    sharp(inputPath)
        .resize({ width: width }) // Sharp automatically calculates height to maintain aspect ratio!
        .toFile(outputPath)
        .then(info => {
            console.log(`✅ Success: Created ${width}w image -> Size: ${(info.size / 1024).toFixed(1)} KB`);
        })
        .catch(err => {
            console.error(`❌ Error resizing to ${width}w:`, err);
        });
});
