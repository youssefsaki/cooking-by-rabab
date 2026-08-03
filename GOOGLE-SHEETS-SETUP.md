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
| Timestamp | Full Name | Phone | Country | Email | Package | SlotDate | SlotPeriod | Dish | Adults | ChildrenJson | Location | Allergies | Total (€) | Status |

Package column values:

- `Basic`
- `Weekly Event`
- `Private at workshop`
- `Private at your location`

---

## Step 2: Apps Script (locked writes + availability)

1. In the sheet: **Extensions → Apps Script**
2. Replace all code with:

```javascript
var CONFLICT_MESSAGE =
  'This time slot is already booked. Please choose another available slot.';
var BASIC_MAX_GUESTS = 13;
var BASIC_MIN_ADULTS = 3;
var SHEET_TZ = 'Africa/Casablanca';

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
    // Keep SlotDate as plain text (yyyy-MM-dd) so Sheets does not
    // auto-convert it and shift the day by timezone.
    var slotDateText = String(booking.slotDate || '').slice(0, 10);
    var timestamp = Utilities.formatDate(
      new Date(booking.createdAt || new Date()),
      SHEET_TZ,
      'yyyy-MM-dd HH:mm'
    );
    var totalEur = Number(booking.totalPrice) || 0;
    var packageLabel =
      booking.packageLabel || packageTypeSheetLabel_(booking.packageType);

    sheet.appendRow([
      timestamp,
      booking.fullName,
      booking.phone,
      booking.country,
      booking.email,
      packageLabel,
      "'" + slotDateText,
      booking.slotPeriod,
      booking.dish || '',
      booking.adults,
      JSON.stringify(booking.children || []),
      booking.location || '',
      booking.allergies || '',
      totalEur + ' €',
      booking.status || 'confirmed',
    ]);

    // Force SlotDate column to text so future edits stay stable
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 7).setNumberFormat('@').setValue(slotDateText);

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

    var locationText = String(row[11] || '');
    var packageType = parsePackageType_(String(row[5] || ''));
    // Legacy rows stored only "private" — infer at-location from Location column
    if (
      packageType === 'private' &&
      /villa|riad|comes to you|at your/i.test(locationText)
    ) {
      packageType = 'private-at-location';
    }

    bookings.push({
      id: 'sheet-' + (i + 1),
      createdAt: String(row[0] || ''),
      fullName: String(row[1] || ''),
      phone: String(row[2] || ''),
      country: String(row[3] || ''),
      email: String(row[4] || ''),
      packageType: packageType,
      slotDate: formatDate_(row[6]),
      slotPeriod: String(row[7] || ''),
      dish: String(row[8] || ''),
      adults: Number(row[9]) || 0,
      children: children,
      location: locationText,
      allergies: String(row[12] || ''),
      totalPrice: parsePrice_(row[13]),
      status: String(row[14] || 'confirmed'),
    });
  }
  return bookings;
}

function formatDate_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    // Format at noon Casablanca to avoid off-by-one day shifts
    return Utilities.formatDate(value, SHEET_TZ, 'yyyy-MM-dd');
  }
  return String(value || '')
    .replace(/^'/, '')
    .slice(0, 10);
}

function parsePrice_(value) {
  if (typeof value === 'number') return value;
  var match = String(value || '').replace(',', '.').match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
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

/** Clear labels written to the Package column */
function packageTypeSheetLabel_(pkg) {
  if (pkg === 'basic') return 'Basic';
  if (pkg === 'weekly-event') return 'Weekly Event';
  if (pkg === 'private') return 'Private at workshop';
  if (pkg === 'private-at-location') return 'Private at your location';
  return String(pkg || '');
}

/** Map sheet labels (and legacy codes) back to package codes for conflict checks */
function parsePackageType_(value) {
  var raw = String(value || '').trim().toLowerCase();
  if (raw === 'basic') return 'basic';
  if (raw === 'weekly-event' || raw === 'weekly event') return 'weekly-event';
  if (
    raw === 'private-at-location' ||
    raw === 'private at your location' ||
    raw.indexOf('at your location') !== -1 ||
    raw.indexOf('comes to you') !== -1
  ) {
    return 'private-at-location';
  }
  if (
    raw === 'private' ||
    raw === 'private at workshop' ||
    raw.indexOf('at workshop') !== -1 ||
    raw.indexOf('at our workshop') !== -1
  ) {
    return 'private';
  }
  if (raw.indexOf('private') !== -1) return 'private';
  return 'basic';
}

function evaluateConflict_(booking) {
  // Normalize in case sheet labels are passed through
  booking.packageType = parsePackageType_(booking.packageType);

  var existing = readBookings_().filter(function (b) {
    return b.slotDate === booking.slotDate && b.slotPeriod === booking.slotPeriod;
  });

  var hasPrivate = existing.some(function (b) {
    return isPrivate_(b.packageType);
  });
  var hasWeekly = existing.some(function (b) {
    return b.packageType === 'weekly-event';
  });
  var basicUsed = existing.reduce(function (sum, b) {
    return isBasic_(b.packageType) ? sum + guestCount_(b.adults, b.children) : sum;
  }, 0);

  // Same date + same period only (morning OR afternoon)
  if (isBasic_(booking.packageType)) {
    if (hasPrivate) return { ok: false };
    var remaining = BASIC_MAX_GUESTS - basicUsed;
    // Below Basic minimum (3) — slot is closed for new Basic bookings
    if (remaining < BASIC_MIN_ADULTS) return { ok: false };
    var incoming = guestCount_(booking.adults, booking.children);
    if (basicUsed + incoming > BASIC_MAX_GUESTS) return { ok: false };
    return { ok: true };
  }

  if (isPrivate_(booking.packageType)) {
    // Locked only by another Private, Weekly, or a full Basic slot (13)
    if (hasPrivate || hasWeekly || basicUsed >= BASIC_MAX_GUESTS) return { ok: false };
    return { ok: true };
  }

  if (booking.packageType === 'weekly-event') {
    if (hasPrivate) return { ok: false };
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

All locks are for the **same date + same period** (morning or afternoon):

| Existing hold | Blocks |
|---|---|
| **Private** | Basic, another Private, Weekly Event |
| **Basic** (partial) | More Basic only if remaining capacity is exceeded |
| **Basic** (under 3 spots left) | More Basic (min 3 adults required) |
| **Basic** (full 13) | More Basic, and Private on that period |
| **Weekly Event** | Private on that Saturday afternoon |

- Basic capacity max **13** (ages 0–3 do not count)
- Multiple Weekly Event bookings on the same Saturday are allowed
- Conflict message:

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
