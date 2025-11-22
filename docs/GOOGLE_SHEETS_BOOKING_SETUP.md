# Google Sheets API Booking Form Implementation Guide

## Overview
This document explains how to implement booking forms for Packages and Activities that:
1. Collect booking information including date selections
2. Submit data to Google Sheets automatically
3. Support date range selection (start date - end date) for packages
4. Support single date selection for activities

## Architecture

### Frontend Flow:
```
User fills form → Date Selection → Form Validation → API Call → Google Sheets → Success Response
```

### Components Needed:
1. **Booking Form Component** - Reusable form for packages/activities
2. **Date Picker Component** - Calendar for date selection
3. **API Route Handler** - Next.js API route to handle submissions
4. **Google Sheets Service** - Backend service to write to sheets

---

## Step 1: Set Up Google Sheets API

### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable "Google Sheets API"

### 1.2 Create Service Account
1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Name it "Playa Booking Service"
4. Create JSON key file (download and save securely)

### 1.3 Create Google Sheet
1. Create a new Google Sheet
2. Name it "Playa Bookings"
3. Create two tabs: "Packages" and "Activities"

**Packages Sheet Headers:**
```
Timestamp | Name | Email | Phone | Package Type | Start Date | End Date | Number of Guests | Special Requests | Status
```

**Activities Sheet Headers:**
```
Timestamp | Name | Email | Phone | Activity Type | Activity Date | Number of Guests | Time Slot | Special Requests | Status
```

### 1.4 Share Sheet with Service Account
1. Open the sheet
2. Click "Share"
3. Add the service account email (from JSON key file: `client_email`)
4. Give it "Editor" permissions

---

## Step 2: Install Dependencies

```bash
npm install googleapis date-fns react-datepicker
npm install -D @types/react-datepicker
```

---

## Step 3: Environment Variables

Create `.env.local`:
```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-from-url
```

**How to get Spreadsheet ID:**
- From URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
- Copy the ID between `/d/` and `/edit`

---

## Step 4: Implementation Structure

### File Structure:
```
lib/
  google-sheets.ts          # Google Sheets service
app/
  api/
    bookings/
      package/
        route.ts           # API route for package bookings
      activity/
        route.ts           # API route for activity bookings
components/
  booking/
    BookingForm.tsx        # Main booking form component
    DateRangePicker.tsx    # Date range picker (packages)
    DatePicker.tsx         # Single date picker (activities)
  BookingModal.tsx         # Modal wrapper for booking form
```

---

## Step 5: Google Sheets Service

Create `lib/google-sheets.ts`:
```typescript
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function appendToSheet(
  spreadsheetId: string,
  range: string,
  values: any[][]
) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}
```

---

## Step 6: API Routes

### Package Booking Route: `app/api/bookings/package/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    const timestamp = new Date().toISOString();
    
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.packageType,
      data.startDate,
      data.endDate,
      data.numberOfGuests,
      data.specialRequests || '',
      'Pending'
    ];

    await appendToSheet(spreadsheetId, 'Packages!A:J', [rowData]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit booking' },
      { status: 500 }
    );
  }
}
```

### Activity Booking Route: `app/api/bookings/activity/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    const timestamp = new Date().toISOString();
    
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.activityType,
      data.activityDate,
      data.numberOfGuests,
      data.timeSlot || '',
      data.specialRequests || '',
      'Pending'
    ];

    await appendToSheet(spreadsheetId, 'Activities!A:J', [rowData]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit booking' },
      { status: 500 }
    );
  }
}
```

---

## Step 7: Booking Form Components

The form will include:
- Personal info (name, email, phone)
- Date selection (range for packages, single for activities)
- Number of guests
- Special requests
- Submit button

---

## Step 8: Integration Points

### For Packages:
1. Update `/packages` page - Add booking modal/form
2. Pass package type/ID to form
3. Show date range picker (start - end date)

### For Activities:
1. Update activity detail pages
2. Update `/activities` page
3. Show single date picker
4. Optionally add time slot selection

---

## Security Considerations

1. **Rate Limiting**: Add rate limiting to API routes
2. **Validation**: Validate all inputs server-side
3. **Environment Variables**: Never commit service account keys
4. **Error Handling**: Handle errors gracefully
5. **CORS**: Configure CORS properly

---

## Next Steps

1. ✅ Set up Google Cloud project and service account
2. ✅ Install dependencies
3. ✅ Create Google Sheet with headers
4. ✅ Configure environment variables
5. ⏭️ Create Google Sheets service file
6. ⏭️ Create API routes
7. ⏭️ Create booking form components
8. ⏭️ Integrate with existing pages
9. ⏭️ Test end-to-end flow
10. ⏭️ Deploy and test in production

---

## Testing

Test by:
1. Filling out form with test data
2. Submitting and checking Google Sheet
3. Verifying data appears correctly
4. Testing date validation
5. Testing error scenarios

