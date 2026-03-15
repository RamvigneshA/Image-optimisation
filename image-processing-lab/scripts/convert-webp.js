const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Define input and output paths
const inputPath = path.join(__dirname, '../images/original.jpg');
const outputDir = path.join(__dirname, '../output');

// Define the new filename
const outputPath = path.join(outputDir, 'original.webp');

// Ensure output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

console.log('Starting WebP conversion...');

// Use Sharp to convert the image format
sharp(inputPath)
    .webp({ quality: 80 }) // 80 is a good balance between visual quality and file size
    .toFile(outputPath)
    .then(info => {
        console.log(`✅ Success: Converted to WebP -> Size: ${(info.size / 1024).toFixed(1)} KB`);
    })
    .catch(err => {
        console.error('❌ Error converting to WebP:', err);
    });
