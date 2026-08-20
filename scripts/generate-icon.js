const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcon() {
  const logoPath = path.join(__dirname, '..', 'logo.png');
  const outputPath = path.join(__dirname, '..', 'src', 'app', 'icon.png');

  try {
    // Resize logo to fit within 128x128 without cropping
    const resizedLogo = await sharp(logoPath)
      .resize(128, 128, { 
        fit: 'contain', // Fit entire image without cropping
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .toBuffer();

    // Create rounded mask
    const roundedMask = Buffer.from(`
      <svg width="128" height="128">
        <rect x="0" y="0" width="128" height="128" rx="24" ry="24" fill="white"/>
      </svg>
    `);

    // Apply rounded corners mask to the logo
    await sharp(resizedLogo)
      .composite([
        {
          input: roundedMask,
          blend: 'dest-in'
        }
      ])
      .png()
      .toFile(outputPath);

    console.log('✓ Icon generated successfully with rounded corners!');
  } catch (error) {
    console.error('Error generating icon:', error);
    process.exit(1);
  }
}

generateIcon();
