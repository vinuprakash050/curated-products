import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll('images') as File[];
    
    if (!images || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    if (images.length > 5) {
      return NextResponse.json({ error: 'Maximum 5 images allowed' }, { status: 400 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'ImgBB API key not configured' }, { status: 500 });
    }

    const imageUrls: string[] = [];

    // Upload each image to ImgBB
    for (const image of images) {
      // Convert image to base64
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString('base64');

      // Upload to ImgBB
      const uploadFormData = new FormData();
      uploadFormData.append('image', base64Image);
      uploadFormData.append('key', apiKey);

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();

      if (result.success) {
        imageUrls.push(result.data.url);
      } else {
        return NextResponse.json({ 
          error: 'Failed to upload one or more images to ImgBB' 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ 
      success: true, 
      imageUrls 
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}