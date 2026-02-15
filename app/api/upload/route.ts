// 📤 UPLOAD API - Handles image uploads
// When someone uploads a picture, this code saves it to the cloud

import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { updateContent } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // 1️⃣ Get the uploaded file from the form
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const contentKey = formData.get('contentKey') as string;

    // 2️⃣ Check if file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // 3️⃣ Upload file to Vercel Blob (cloud storage)
    const blob = await put(file.name, file, {
      access: 'public', // Anyone can see it
    });

    // 4️⃣ Save the image URL to database
    await updateContent(contentKey, blob.url, 'image');

    // 5️⃣ Send success message back
    return NextResponse.json({
      success: true,
      url: blob.url,
      message: 'Image uploaded successfully! 🎉'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
