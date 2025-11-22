# ✅ Code Review Checklist - Booking System

## Pre-Testing Review Complete

### ✅ Fixed Issues:
1. **Removed unused imports** - Cleaned up `useState` from DatePicker components
2. **Added global CSS import** - Added react-datepicker CSS to globals.css
3. **Environment variables** - Created .env.local with credentials
4. **No linter errors** - All files pass TypeScript/linting checks

### ✅ Verified Components:

#### API Routes:
- ✅ `/api/bookings/activity/route.ts` - Activity booking endpoint
- ✅ `/api/bookings/package/route.ts` - Package booking endpoint
- ✅ Both handle errors properly
- ✅ Both validate environment variables

#### Booking Forms:
- ✅ `ActivityBookingForm.tsx` - Complete with validation
- ✅ `PackageBookingForm.tsx` - Complete with date range
- ✅ Both show success/error states
- ✅ Both handle form submission correctly

#### Date Pickers:
- ✅ `DatePicker.tsx` - Single date selection
- ✅ `DateRangePicker.tsx` - Date range with duration calculation
- ✅ Both use react-datepicker correctly
- ✅ Both have proper styling

#### Google Sheets Service:
- ✅ `lib/google-sheets.ts` - Handles authentication
- ✅ Properly processes private key
- ✅ Error handling in place

### ✅ Integration:
- ✅ Activity detail pages import booking form
- ✅ "CHOOSE DATE" button triggers form modal
- ✅ All imports are correct

---

## ⚠️ Before Testing - You Need To:

### 1. Verify Google Sheet Setup:
   - [ ] Open your Google Sheet
   - [ ] Verify spreadsheet ID matches: `1kpt7tEXe0eoWIBhHaKhyYJ328Bf9waNoZLqjkLRnWVA`
   - [ ] Create "Packages" tab with headers:
     ```
     Timestamp | Name | Email | Phone | Package Type | Start Date | End Date | Number of Guests | Special Requests | Status
     ```
   - [ ] Create "Activities" tab with headers:
     ```
     Timestamp | Name | Email | Phone | Activity Type | Activity Date | Number of Guests | Time Slot | Special Requests | Status
     ```
   - [ ] Share sheet with: `playa-booking-submission@playa-surf-house.iam.gserviceaccount.com` (Editor permission)

### 2. Update Spreadsheet ID (if needed):
   - If your sheet ID is different, update `.env.local`:
   ```env
   GOOGLE_SHEETS_SPREADSHEET_ID=your-actual-id-here
   ```

### 3. Restart Dev Server:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```
   - Important: Restart after changing .env.local

---

## 🧪 Testing Steps:

1. **Test Activity Booking:**
   - Go to `/activities/sandboarding`
   - Click "CHOOSE DATE" button
   - Fill out form (use test data)
   - Submit
   - Check Google Sheet "Activities" tab for new row

2. **Expected Behavior:**
   - Form opens in modal
   - Date picker shows calendar
   - Validation works (try submitting empty form)
   - Success message appears after submission
   - Data appears in Google Sheet

3. **Error Scenarios to Test:**
   - Submit without filling required fields
   - Submit with invalid email
   - Submit without selecting date
   - Check console for any errors

---

## 🐛 If Something Doesn't Work:

1. **Check Console (F12):**
   - Look for JavaScript errors
   - Check Network tab for failed API calls

2. **Check Terminal:**
   - Look for server-side errors
   - Check if API routes are hit

3. **Common Issues:**
   - Wrong spreadsheet ID → Update .env.local
   - Sheet not shared → Share with service account
   - Missing headers → Create correct headers in sheet
   - Server not restarted → Restart after .env changes

---

## ✅ Everything Looks Good!

The code is ready for testing. Just verify your Google Sheet setup and restart the server!

