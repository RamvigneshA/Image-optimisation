const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './images';
const OUTPUT_DIR = './dist/images';
const MANIFEST_PATH = './dist/image-manifest.json';

const widths = [400, 800, 1200];
const formats = ['avif', 'webp', 'jpeg'];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const manifest = {};

async function build() {
    console.log('🚀 Starting Multi-Image Build Pipeline...');

    // 1. Scan the directory for images
    const files = fs.readdirSync(INPUT_DIR).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    console.log(`🔍 Found ${files.length} images to process: ${files.join(', ')}`);

    for (const file of files) {
        const inputPath = path.join(INPUT_DIR, file);
        const inputBasename = file;
        
        console.log(`\n📦 Processing: ${inputBasename}`);
        manifest[inputBasename] = {};

        for (const width of widths) {
            const baseImage = sharp(inputPath).resize({ width: width });

            for (const format of formats) {
                // Adjust filename to include the original image name prefix
                const prefix = path.parse(file).name;
                const filename = `${prefix}-${width}.${format}`;
                const outputFilePath = path.join(OUTPUT_DIR, filename);

                console.log(`  ⏱️  Generating ${filename}...`);

                await baseImage.clone()
                    .toFormat(format, {
                        quality: format === 'avif' ? 50 : 80
                    })
                    .toFile(outputFilePath);

                if (!manifest[inputBasename][format]) {
                    manifest[inputBasename][format] = [];
                }

                manifest[inputBasename][format].push({
                    width: width,
                    src: `/dist/images/${filename}`
                });
            }
        }
    }

    fs.writeFileSync(
        MANIFEST_PATH,
        JSON.stringify(manifest, null, 2)
    );

    console.log('\n✅ All images generated successfully!');
    console.log(`✅ Manifest saved to ${MANIFEST_PATH}`);
}

build().catch(err => {
    console.error('❌ Build failed:', err);
});
