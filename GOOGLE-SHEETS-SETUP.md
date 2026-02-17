# Google Sheets Integration Setup Guide

## FREE Solution - No Cost, No Credit Card Required

This guide will help you set up automatic booking data collection in Google Sheets.

---

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it **"Cooking Class Bookings"**
4. In the first row, add these exact headers:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
|---|---|---|---|---|---|---|---|
| Timestamp | Full Name | Phone | Country | Email | Package | Dietary Preference | Allergies |

---

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add row with timestamp
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.phone,
      data.country,
      data.email,
      data.packageType,
      data.dietaryPreference,
      data.allergies || 'None'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
5. Name your project: **"Booking Form Handler"**

---

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description:** "Booking Form Handler"
   - **Execute as:** **Me** (your email)
   - **Who has access:** **Anyone**
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to Booking Form Handler (unsafe)**
9. Click **Allow**
10. **IMPORTANT:** Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

---

## Step 4: Update Your Website Code

1. Open the file: `app/book/page.tsx`
2. Find this line (around line 24):
   ```typescript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your Web App URL:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save the file
5. Deploy your website

---

## Step 5: Test the Integration

1. Go to your website's booking page
2. Fill out the form with test data
3. Click "Continue to WhatsApp"
4. Check your Google Sheet - you should see a new row with the booking data!

---

## What Happens When a User Books?

1. User fills out the booking form
2. Data is automatically sent to your Google Sheet
3. A new row is added with timestamp
4. User is redirected to WhatsApp to confirm with you
5. You have both the Google Sheet record AND WhatsApp conversation

---

## Viewing Your Bookings

- Open your Google Sheet anytime to see all bookings
- Data includes: Timestamp, Name, Phone, Country, Email, Package, Dietary Preferences, Allergies
- You can sort, filter, and export the data
- Set up email notifications (optional - see below)

---

## Optional: Email Notifications

To get email notifications for each new booking:

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Replace the code with this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add row with timestamp
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.phone,
      data.country,
      data.email,
      data.packageType,
      data.dietaryPreference,
      data.allergies || 'None'
    ]);
    
    // Send email notification
    const emailBody = `
New Booking Received!

Name: ${data.fullName}
Phone: ${data.phone}
Country: ${data.country}
Email: ${data.email}
Package: ${data.packageType}
Dietary Preference: ${data.dietaryPreference}
Allergies: ${data.allergies || 'None'}

Time: ${new Date().toLocaleString()}
    `;
    
    MailApp.sendEmail({
      to: 'YOUR_EMAIL@example.com', // Replace with your email
      subject: '🎉 New Cooking Class Booking!',
      body: emailBody
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Replace `'YOUR_EMAIL@example.com'` with your actual email
4. Save and deploy again (Deploy → Manage deployments → Edit → Version: New version → Deploy)

---

## Troubleshooting

### Data not appearing in Google Sheet?

1. Check that you copied the correct Web App URL
2. Make sure you selected "Anyone" for "Who has access"
3. Try redeploying: Deploy → Manage deployments → Edit → Version: New version → Deploy

### Script not authorized?

1. Go to Extensions → Apps Script
2. Click Deploy → Test deployments
3. Click "Authorize access" and allow permissions

### Need to update the script?

1. Make your changes in Apps Script
2. Click Deploy → Manage deployments
3. Click the pencil icon (Edit)
4. Change "Version" to "New version"
5. Click "Deploy"
6. The Web App URL stays the same!

---

## Benefits of This Solution

✅ **100% FREE** - No costs, no credit card required
✅ **Automatic** - Data saved instantly
✅ **Reliable** - Powered by Google infrastructure
✅ **Accessible** - View from any device
✅ **Exportable** - Download as Excel, CSV, PDF
✅ **Shareable** - Give team members access
✅ **Searchable** - Find bookings easily
✅ **Backup** - Google automatically backs up your data

---

## Support

If you need help:
1. Check the troubleshooting section above
2. Verify each step was completed correctly
3. Test with a simple booking first
4. Check the Apps Script execution logs: Apps Script → Executions

---

**That's it! Your booking form now automatically saves all data to Google Sheets for FREE! 🎉**
