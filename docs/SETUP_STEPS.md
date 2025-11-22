# Step-by-Step Setup Guide

## FIRST THING YOU NEED TO DO: Google Cloud Setup

### Step 1: Create Google Cloud Project (5 minutes)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click the project dropdown at the top
   - Click "New Project"
   - Name: "Playa Surf House Bookings"
   - Click "Create"
   - Wait for project to be created

### Step 2: Enable Google Sheets API (2 minutes)

1. **Enable API**
   - In the search bar, type "Google Sheets API"
   - Click on "Google Sheets API"
   - Click the "Enable" button
   - Wait for it to enable (green checkmark)

### Step 3: Create Service Account (5 minutes)

1. **Create Service Account**
   - In the left menu, go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account" at the top

2. **Fill in Details**
   - Service account name: `playa-booking-service`
   - Service account ID: (auto-filled)
   - Description: "Service account for booking form submissions"
   - Click "Create and Continue"

3. **Grant Access (Skip this step)**
   - Click "Continue" (skip role assignment for now)

4. **Create Key**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Select "JSON"
   - Click "Create"
   - **IMPORTANT**: The JSON file will download automatically - SAVE THIS FILE SECURELY
   - You'll need the `client_email` and `private_key` from this file

### Step 4: Create Google Sheet (3 minutes)

1. **Create New Sheet**
   - Go to https://sheets.google.com
   - Click "Blank" to create new spreadsheet
   - Name it: "Playa Bookings"

2. **Create Tabs**
   - At the bottom, click the "+" to add a new tab
   - You should have two tabs:
     - Tab 1: "Packages"
     - Tab 2: "Activities"

3. **Add Headers to Packages Tab**
   - In Row 1, add these headers (one per column):
   ```
   Timestamp | Name | Email | Phone | Package Type | Start Date | End Date | Number of Guests | Special Requests | Status
   ```

4. **Add Headers to Activities Tab**
   - Switch to Activities tab
   - In Row 1, add these headers:
   ```
   Timestamp | Name | Email | Phone | Activity Type | Activity Date | Number of Guests | Time Slot | Special Requests | Status
   ```

5. **Get Spreadsheet ID**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit`
   - Copy the ID between `/d/` and `/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1abc123xyz/edit`
   - Then ID is: `1abc123xyz`
   - **SAVE THIS ID** - you'll need it

### Step 5: Share Sheet with Service Account (2 minutes)

1. **Get Service Account Email**
   - Open the JSON file you downloaded in Step 3
   - Find the `client_email` field
   - Copy the email (looks like: `playa-booking-service@project-123456.iam.gserviceaccount.com`)

2. **Share Sheet**
   - In your Google Sheet, click "Share" button (top right)
   - Paste the service account email
   - Change permission to "Editor"
   - Uncheck "Notify people" (optional)
   - Click "Share"

---

## What You Need to Give Me:

Once you complete the above steps, you'll have:

1. ✅ **JSON Key File** - The downloaded service account key file
2. ✅ **Spreadsheet ID** - From the Google Sheets URL
3. ✅ **Service Account Email** - From the JSON file (client_email field)

**NEVER share the full JSON file publicly!** Only share:
- The `client_email` (safe to share)
- The `private_key` (ONLY in environment variable, never commit to git)
- The `spreadsheet_id` (safe to share)

---

## Next: I'll Set Up the Code

Once you have the above, I'll:
1. Create the booking form components
2. Set up API routes
3. Configure environment variables
4. Test the integration

But first, **complete Step 1-5 above** and let me know when you're done!

