// CRITICAL: This file MUST be server-only - never import in client components
// This prevents googleapis from being bundled in the client JavaScript
import 'server-only';
import { google, Auth } from 'googleapis';

// Cache auth instance for better performance
let cachedAuth: Auth.GoogleAuth | null = null;

// Initialize Google Auth (cached for performance)
const getAuth = () => {
  if (!cachedAuth) {
    cachedAuth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
  return cachedAuth;
};

// Append a row to a specific sheet
export async function appendToSheet(
  spreadsheetId: string,
  range: string,
  values: any[][]
) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Format phone numbers to prevent Google Sheets from interpreting them as formulas
    // Optimized: Only process phone column instead of all columns
    const formattedValues = values.map(row => {
      const formattedRow = [...row];
      // Phone column is typically index 3: Timestamp, Name, Email, Phone, ...
      if (formattedRow[3] && typeof formattedRow[3] === 'string' && formattedRow[3].trim()) {
        formattedRow[3] = "'" + formattedRow[3].trim();
      }
      return formattedRow;
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: formattedValues,
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error appending to sheet:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to append to Google Sheet';
    
    if (error?.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.code) {
      errorMessage = `Google Sheets API error: ${error.code}`;
    }
    
    const detailedError = new Error(errorMessage);
    detailedError.name = error?.name || 'GoogleSheetsError';
    throw detailedError;
  }
}

// Get current date/time in ISO format
export function getTimestamp(): string {
  return new Date().toISOString();
}

