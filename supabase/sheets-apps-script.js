/**
 * Google Apps Script for Cooking by Rabab
 * Deploy as Web App (Anyone) and set SHEETS_WEBAPP_URL to the /exec URL.
 *
 * Create two sheets named: Bookings, Contact
 * Bookings headers: Timestamp | Full Name | Phone | Country | Email | Package | Dietary Preference | Allergies
 * Contact headers: Timestamp | Name | Email | Subject | Message
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'contact') {
      const sheet = ss.getSheetByName('Contact') || ss.insertSheet('Contact');
      sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.subject,
        data.message,
      ]);
    } else {
      const sheet = ss.getSheetByName('Bookings') || ss.getActiveSheet();
      sheet.appendRow([
        new Date(),
        data.fullName,
        data.phone,
        data.country,
        data.email,
        data.packageType,
        data.dietaryPreference,
        data.allergies || 'None',
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
