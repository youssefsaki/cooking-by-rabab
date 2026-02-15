// 🗄️ DATABASE HELPER FILE
// This file talks to the database (like a filing cabinet for your website data)

import { sql } from '@vercel/postgres';

// 📖 GET content from database (like reading a file from the cabinet)
export async function getContent(key: string) {
  try {
    const result = await sql`
      SELECT * FROM website_content WHERE content_key = ${key}
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting content:', error);
    return null;
  }
}

// 📝 UPDATE content in database (like updating a file in the cabinet)
export async function updateContent(key: string, value: string, type: string) {
  try {
    await sql`
      INSERT INTO website_content (content_key, content_value, content_type, updated_at)
      VALUES (${key}, ${value}, ${type}, NOW())
      ON CONFLICT (content_key) 
      DO UPDATE SET content_value = ${value}, updated_at = NOW()
    `;
    return { success: true };
  } catch (error) {
    console.error('Error updating content:', error);
    return { success: false, error };
  }
}

// 📚 GET ALL content (like reading all files from the cabinet)
export async function getAllContent() {
  try {
    const result = await sql`
      SELECT * FROM website_content ORDER BY content_key
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting all content:', error);
    return [];
  }
}
