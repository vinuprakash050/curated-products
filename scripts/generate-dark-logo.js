const sharp = require('sharp');
const path = require('path');

async function generateDarkLogo() {
  const logoPath = path.join(__dirname, '..', 'logomain.png');
  const outputPath = path.join(__dirname, '..', 'public', 'logomain-dark.png');

  try {
    // Load the original logo
    const image = sharp(logoPath);
    const metadata = await image.metadata();
    
    // Get the raw pixel data
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Replace black/dark pixels with white (keeping blue pixels as is)
    // Blue color is around RGB(37, 99, 235) or similar
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Check if pixel is black/dark (not blue)
      // Blue pixels typically have high B value and lower R value
      const isBlue = b > 150 && b > r && b > g;
      
      // If it's dark and NOT blue, make it white
      if (!isBlue && r < 100 && g < 100 && b < 100 && a > 0) {
        data[i] = 255;     // R
        data[i + 1] = 255; // G
        data[i + 2] = 255; // B
        // Keep alpha as is
      }
    }

    // Create new image with modified data
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
      .png()
      .toFile(outputPath);

    console.log('✓ Dark mode logo generated successfully!');
  } catch (error) {
    console.error('Error generating dark logo:', error);
    process.exit(1);
  }
}

generateDarkLogo();
