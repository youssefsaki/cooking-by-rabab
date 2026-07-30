# Google Sheets Booking Setup

Server-side booking uses a Google Apps Script web app as the system of record. The Next.js API (`/api/availability`, `/api/bookings`) talks to it via `BOOKING_SCRIPT_URL`.

If the script URL is not set, the API falls back to a local JSON store at `data/bookings-store.json` (dev only).

---

## Step 1: Create the spreadsheet

1. Go to [Google Sheets](https://sheets.google.com) and create a blank spreadsheet
2. Name it **Cooking Class Bookings**
3. Put these headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Full Name | Phone | Country | Email | Package | SlotDate | SlotPeriod | Dish | Adults | ChildrenJson | Location | Allergies | TotalPrice | Status |

---

## Step 2: Apps Script (locked writes + availability)

1. In the sheet: **Extensions → Apps Script**
2. Replace all code with:

```javascript
var CONFLICT_MESSAGE =
  'This time slot is already booked. Please choose another available slot.';
var BASIC_MAX_GUESTS = 13;

function doGet(e) {
  try {
    var action = (e.parameter && e.parameter.action) || 'list';
    if (action !== 'list') {
      return json_({ success: false, error: 'Unknown action' });
    }

    var from = e.parameter.from || '';
    var to = e.parameter.to || '';
    var bookings = readBookings_().filter(function (b) {
      if (from && b.slotDate < from) return false;
      if (to && b.slotDate > to) return false;
      return true;
    });

    return json_({ success: true, bookings: bookings });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    var payload = JSON.parse(e.postData.contents);
    var action = payload.action || 'create';
    if (action !== 'create') {
      return json_({ success: false, error: 'Unknown action' });
    }

    var booking = payload.booking || payload;
    var conflict = evaluateConflict_(booking);
    if (!conflict.ok) {
      return json_({
        success: false,
        error: 'conflict',
        message: CONFLICT_MESSAGE,
      });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      booking.createdAt || new Date().toISOString(),
      booking.fullName,
      booking.phone,
      booking.country,
      booking.email,
      booking.packageType,
      booking.slotDate,
      booking.slotPeriod,
      booking.dish || '',
      booking.adults,
      JSON.stringify(booking.children || []),
      booking.location || '',
      booking.allergies || '',
      booking.totalPrice || 0,
      booking.status || 'confirmed',
    ]);

    return json_({ success: true, booking: booking });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignore) {}
  }
}

function readBookings_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  var bookings = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (!row[5] || !row[6] || !row[7]) continue;

    var children = [];
    try {
      children = JSON.parse(row[10] || '[]');
    } catch (ignore) {
      children = [];
    }

    bookings.push({
      id: 'sheet-' + (i + 1),
      createdAt: String(row[0] || ''),
      fullName: String(row[1] || ''),
      phone: String(row[2] || ''),
      country: String(row[3] || ''),
      email: String(row[4] || ''),
      packageType: String(row[5] || ''),
      slotDate: formatDate_(row[6]),
      slotPeriod: String(row[7] || ''),
      dish: String(row[8] || ''),
      adults: Number(row[9]) || 0,
      children: children,
      location: String(row[11] || ''),
      allergies: String(row[12] || ''),
      totalPrice: Number(row[13]) || 0,
      status: String(row[14] || 'confirmed'),
    });
  }
  return bookings;
}

function formatDate_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return String(value || '').slice(0, 10);
}

function guestCount_(adults, children) {
  var count = Number(adults) || 0;
  (children || []).forEach(function (c) {
    if (Number(c.age) >= 4) count += 1;
  });
  return count;
}

function isPrivate_(pkg) {
  return pkg === 'private' || pkg === 'private-at-location';
}

function isBasic_(pkg) {
  return pkg === 'basic';
}

function evaluateConflict_(booking) {
  var existing = readBookings_().filter(function (b) {
    return b.slotDate === booking.slotDate && b.slotPeriod === booking.slotPeriod;
  });

  var hasPrivate = existing.some(function (b) {
    return isPrivate_(b.packageType);
  });
  var basicUsed = existing.reduce(function (sum, b) {
    return isBasic_(b.packageType) ? sum + guestCount_(b.adults, b.children) : sum;
  }, 0);

  if (isBasic_(booking.packageType)) {
    if (hasPrivate) return { ok: false };
    var incoming = guestCount_(booking.adults, booking.children);
    if (basicUsed + incoming > BASIC_MAX_GUESTS) return { ok: false };
    return { ok: true };
  }

  if (isPrivate_(booking.packageType)) {
    if (hasPrivate || basicUsed > 0) return { ok: false };
    return { ok: true };
  }

  return { ok: true };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

3. Save the project (e.g. **Booking Form Handler**)

---

## Step 3: Deploy as a web app

1. **Deploy → New deployment → Web app**
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Authorize, then copy the `/exec` URL

Redeploy with a **new version** whenever you change the script.

---

## Step 4: Configure the website

Set the environment variable (Vercel project settings or `.env.local`):

```bash
BOOKING_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Do **not** hardcode the URL in client components. The Next.js routes call this URL server-side:

- `GET /api/availability?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `POST /api/bookings`

---

## Conflict rules (enforced in script + API)

For a given `SlotDate` + `SlotPeriod`:

- **Basic**: rejected if any Private booking exists; otherwise allowed while Basic guest total ≤ 13 (ages 0–3 do not count toward capacity)
- **Private / private-at-location**: rejected if any Basic booking exists; once Private is confirmed the slot is fully locked
- Conflict response message:

> This time slot is already booked. Please choose another available slot.

`LockService.getScriptLock()` prevents concurrent double-book races on write.

---

## Optional: email on create

Inside `doPost`, after a successful `appendRow`, you can send:

```javascript
MailApp.sendEmail({
  to: 'YOUR_EMAIL@example.com',
  subject: 'New Cooking Class Booking',
  body:
    'Name: ' +
    booking.fullName +
    '\nPackage: ' +
    booking.packageType +
    '\nSlot: ' +
    booking.slotDate +
    ' ' +
    booking.slotPeriod,
});
```

---

## Troubleshooting

1. Confirm `BOOKING_SCRIPT_URL` is set in the deployed environment
2. Access must be **Anyone** for the web app
3. After script edits: Deploy → Manage deployments → Edit → **New version**
4. Check **Executions** in Apps Script for errors
5. Without `BOOKING_SCRIPT_URL`, bookings are stored locally in `data/bookings-store.json` only
