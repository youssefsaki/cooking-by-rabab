/**
 * Google Apps Script — append-only mirror for Cooking by Rabab
 *
 * Deploy as Web App (Anyone) and set in .env.local / Vercel:
 *   SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec
 *
 * Create sheet tabs named: Bookings, Contact
 *
 * Bookings headers (row 1):
 * Timestamp | Full Name | Phone | Country | Email | Package | Slot Date | Slot Period |
 * Dish | Adults | Children | Location | Total EUR | Dietary / Allergies | Status
 *
 * Contact headers (row 1):
 * Timestamp | Name | Email | Subject | Message
 *
 * Also accepts the older 2.1.0 payload shape: { action: 'create', booking: {...} }
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Contact form
    if (data.type === 'contact') {
      const sheet = ensureSheet_(ss, 'Contact', [
        'Timestamp',
        'Name',
        'Email',
        'Subject',
        'Message',
      ]);
      sheet.appendRow([
        new Date(),
        data.name || '',
        data.email || '',
        data.subject || '',
        data.message || '',
      ]);
      return json_({ success: true });
    }

    // Booking — either { type: 'booking', ... } or { action: 'create', booking: {...} }
    const booking = data.action === 'create' && data.booking ? data.booking : data;
    const sheet = ensureSheet_(ss, 'Bookings', [
      'Timestamp',
      'Full Name',
      'Phone',
      'Country',
      'Email',
      'Package',
      'Slot Date',
      'Slot Period',
      'Dish',
      'Adults',
      'Children',
      'Location',
      'Total EUR',
      'Dietary / Allergies',
      'Status',
    ]);

    const children =
      typeof booking.children === 'string'
        ? booking.children
        : Array.isArray(booking.children)
          ? JSON.stringify(booking.children)
          : '';

    sheet.appendRow([
      new Date(),
      booking.fullName || '',
      booking.phone || '',
      booking.country || '',
      booking.email || '',
      booking.packageLabel || booking.packageType || '',
      booking.slotDate || '',
      booking.slotPeriod || '',
      booking.dish || booking.dishName || '',
      booking.adults != null ? booking.adults : '',
      children,
      booking.location || '',
      booking.totalPrice != null ? booking.totalPrice : booking.total_price_eur || '',
      booking.allergies || booking.dietaryNotes || booking.dietaryPreference || 'None',
      booking.status || 'new',
    ]);

    return json_({ success: true });
  } catch (error) {
    return json_({ success: false, error: String(error) });
  }
}

function doGet() {
  return json_({ ok: true, service: 'cooking-by-rabab-sheets-mirror' });
}

function ensureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
