const sharp = require('sharp');
const path = require('path');

async function generateBlueLogo() {
  const logoPath = path.join(__dirname, '..', 'logo_main.png');
  const outputPath = path.join(__dirname, '..', 'public', 'logo-main.png');

  try {
    // Load the original logo
    const image = sharp(logoPath);
    const metadata = await image.metadata();
    
    // Get the raw pixel data
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Replace black pixels with blue (keeping transparency)
    // Blue color: RGB(37, 99, 235) - matches your site's blue-600
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Check if pixel is black or very dark (R,G,B < 50)
      if (r < 50 && g < 50 && b < 50 && a > 0) {
        data[i] = 37;      // R
        data[i + 1] = 99;  // G
        data[i + 2] = 235; // B
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

    console.log('✓ Blue logo generated successfully!');
  } catch (error) {
    console.error('Error generating blue logo:', error);
    process.exit(1);
  }
}

generateBlueLogo();
