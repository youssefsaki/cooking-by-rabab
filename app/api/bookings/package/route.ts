import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet, getTimestamp } from '@/lib/google-sheets';

// Server-side input sanitization
const sanitizeInput = (input: any): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim()
    .substring(0, 500); // Limit length
};

// Sanitize phone number (preserve + and numbers/spaces)
const sanitizePhone = (input: any): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove HTML tags only
    .trim()
    .substring(0, 30); // Limit length
};

// Server-side validation
const validatePackageBooking = (data: any): { valid: boolean; error?: string } => {
  // Name validation
  const name = sanitizeInput(data.name);
  if (!name || name.length < 2 || name.length > 100) {
    return { valid: false, error: 'Invalid name' };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { valid: false, error: 'Invalid name format' };
  }

  // Email validation
  const email = sanitizeInput(data.email?.toLowerCase());
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { valid: false, error: 'Invalid email' };
  }

  // Phone validation
  const phone = sanitizePhone(data.phone);
  if (!phone || phone.length < 8) {
    return { valid: false, error: 'Invalid phone number' };
  }
  if (!/^\+?[\d\s\-\(\)]+$/.test(phone)) {
    return { valid: false, error: 'Invalid phone format' };
  }

  // Date validation
  if (!data.startDate || !data.endDate) {
    return { valid: false, error: 'Dates are required' };
  }
  
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (startDate < today) {
    return { valid: false, error: 'Start date cannot be in the past' };
  }
  if (endDate <= startDate) {
    return { valid: false, error: 'End date must be after start date' };
  }

  // Number of guests validation
  const guests = parseInt(data.numberOfGuests);
  if (isNaN(guests) || guests < 1 || guests > 50) {
    return { valid: false, error: 'Invalid number of guests' };
  }

  return { valid: true };
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let data;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validatePackageBooking(data);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Validation failed' },
        { status: 400 }
      );
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const timestamp = getTimestamp();
    
    // Sanitize all inputs before storing
    const rowData = [
      timestamp,
      sanitizeInput(data.name),
      sanitizeInput(data.email?.toLowerCase()),
      sanitizePhone(data.phone), // Use phone-specific sanitization
      sanitizeInput(data.packageType),
      data.startDate,
      data.endDate,
      data.numberOfGuests,
      data.specialRequests ? sanitizeInput(data.specialRequests).substring(0, 1000) : '',
      'Pending' // Status
    ];

    await appendToSheet(spreadsheetId, 'Packages!A:J', [rowData]);

    return NextResponse.json({ 
      success: true,
      message: 'Booking submitted successfully!' 
    });
  } catch (error: any) {
    console.error('Error submitting package booking:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to submit booking. Please try again.';
    
    if (error?.message) {
      errorMessage = error.message;
      
      // Check for specific Google Sheets API errors
      if (error.message.includes('PERMISSION_DENIED') || error.message.includes('403')) {
        errorMessage = 'Permission denied: Please check Google Sheets service account permissions.';
      } else if (error.message.includes('NOT_FOUND') || error.message.includes('404')) {
        errorMessage = 'Spreadsheet not found: Please check the spreadsheet ID and ensure it exists.';
      } else if (error.message.includes('QUOTA_EXCEEDED') || error.message.includes('429')) {
        errorMessage = 'API quota exceeded: Please try again later.';
      } else if (error.message.includes('401') || error.message.includes('UNAUTHENTICATED')) {
        errorMessage = 'Authentication failed: Please check Google Sheets credentials.';
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}

