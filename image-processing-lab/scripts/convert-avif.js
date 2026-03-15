const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Define input and output paths
const inputPath = path.join(__dirname, '../images/original.jpg');
const outputDir = path.join(__dirname, '../output');

// Define the new filename
const outputPath = path.join(outputDir, 'original.avif');

// Ensure output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

console.log('Starting AVIF conversion (this may take slightly longer than WebP)...');

// Use Sharp to convert the image format
sharp(inputPath)
    .avif({ quality: 50 }) // AVIF is incredibly efficient, quality 50-60 often looks great!
    .toFile(outputPath)
    .then(info => {
        console.log(`✅ Success: Converted to AVIF -> Size: ${(info.size / 1024).toFixed(1)} KB`);
    })
    .catch(err => {
        console.error('❌ Error converting to AVIF:', err);
    });
