// 📝 CONTENT API - Handles text updates and getting content
// This is like a messenger that carries information back and forth

import { NextResponse } from 'next/server';
import { getAllContent, updateContent } from '@/lib/db';

// 📖 GET - Read all content from database
export async function GET() {
  try {
    const content = await getAllContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// ✏️ POST - Update text content
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contentKey, contentValue, contentType } = body;

    // Check if all required fields are provided
    if (!contentKey || !contentValue || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update the content in database
    const result = await updateContent(contentKey, contentValue, contentType);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Content updated successfully! ✅'
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to update content' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
