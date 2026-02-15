# 🎮 How to Build an Admin Dashboard - Super Simple Guide

**Think of this like building with LEGO blocks - we'll do it step by step!**

---

## 🎯 What We're Building

An admin page where your client can:
- Change pictures on the website
- Change text
- Click "Save" and see changes INSTANTLY (no texting you!)

---

## 📦 Step 1: Sign Up for Free Accounts

### A) Vercel Blob (for storing pictures)
1. Go to: https://vercel.com
2. Click "Sign Up" (use the same account you use to deploy your site)
3. Click on your project name
4. Click "Storage" tab at the top
5. Click "Create Database"
6. Choose "Blob" (it's for images!)
7. Click "Create"
8. **COPY** the code they show you - it looks like this:
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
   ```
9. Save this somewhere safe (like a Notes app)

### B) Vercel Postgres (for storing data)
1. Still on Vercel, same "Storage" tab
2. Click "Create Database" again
3. Choose "Postgres" this time
4. Click "Create"
5. **COPY** all the codes they show - looks like:
   ```
   POSTGRES_URL=postgres://xxxxx
   POSTGRES_PRISMA_URL=postgres://xxxxx
   (and a few more lines)
   ```
6. Save these too!

### C) NextAuth Secret (for password protection)
1. Open your Terminal (the black window with text)
2. Type this and press Enter:
   ```bash
   openssl rand -base64 32
   ```
3. It will show you a random code - **COPY IT**
4. Save it as: `NEXTAUTH_SECRET=the_code_you_got`

---

## 🔧 Step 2: Install the Tools We Need

1. Open Terminal
2. Make sure you're in your project folder:
   ```bash
   cd /Users/mac/Documents/projects/rabab/cooking-class
   ```
3. Copy and paste these commands ONE BY ONE (press Enter after each):

```bash
npm install @vercel/blob
```
(Wait for it to finish... you'll see a progress bar)

```bash
npm install @vercel/postgres
```
(Wait again...)

```bash
npm install next-auth
```
(Wait again...)

```bash
npm install bcryptjs
```
(Wait again...)

```bash
npm install @types/bcryptjs --save-dev
```
(Last one! Wait for it...)

**When you see your username again, you're done!** ✅

---

## 📝 Step 3: Create Secret Files

### A) Create .env.local file
1. In VS Code (or Cursor), look at the left side where all your files are
2. Right-click in the empty space
3. Click "New File"
4. Name it: `.env.local`
5. Paste ALL the codes you saved from Step 1:

```
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
POSTGRES_URL=postgres://xxxxx
POSTGRES_PRISMA_URL=postgres://xxxxx
POSTGRES_URL_NON_POOLING=postgres://xxxxx
NEXTAUTH_SECRET=your_secret_from_step_1c
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChangeThisPassword123!
```

6. **IMPORTANT:** Change the last line! Put a password YOU want (but remember it!)
7. Press `Cmd + S` to save

---

## 🏗️ Step 4: Create the Database Table

1. Go to Vercel website
2. Click your project
3. Click "Storage" → Click on your Postgres database
4. Click "Query" tab (it's like a text box)
5. Copy and paste this:

```sql
CREATE TABLE website_content (
  id SERIAL PRIMARY KEY,
  content_key VARCHAR(255) UNIQUE NOT NULL,
  content_value TEXT NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO website_content (content_key, content_value, content_type) VALUES
('hero_image_desktop', '/hero/desktop/bg.jpg', 'image'),
('hero_image_mobile', '/hero/mobile/bg.jpg', 'image'),
('hero_title', 'Welcome to Our Cooking Class', 'text'),
('hero_subtitle', 'Learn authentic Moroccan cuisine', 'text');
```

6. Click "Run Query" button
7. You should see "Success!" ✅

---

## 💻 Step 5: Copy and Paste Code Files

Now I'll tell you EXACTLY which files to create and what to put in them.

### File 1: Database Helper
1. In your project, find the `lib` folder (left side of VS Code)
2. Right-click on `lib` folder
3. Click "New File"
4. Name it: `db.ts`
5. Copy EVERYTHING from the code block I'll show you next
6. Paste it in the file
7. Press `Cmd + S` to save

### File 2: Upload API
1. Find the `app` folder
2. Inside `app`, right-click → "New Folder" → name it: `api`
3. Inside `api`, right-click → "New Folder" → name it: `upload`
4. Inside `upload`, right-click → "New File" → name it: `route.ts`
5. Copy the code I'll give you
6. Paste and save

### File 3: Content API
1. Inside `app/api`, right-click → "New Folder" → name it: `content`
2. Inside `content`, right-click → "New File" → name it: `route.ts`
3. Copy the code I'll give you
4. Paste and save

### File 4: Login API
1. Inside `app/api`, right-click → "New Folder" → name it: `auth`
2. Inside `auth`, right-click → "New Folder" → name it: `[...nextauth]`
3. Inside `[...nextauth]`, right-click → "New File" → name it: `route.ts`
4. Copy the code I'll give you
5. Paste and save

### File 5: Admin Page
1. Inside `app`, right-click → "New Folder" → name it: `admin`
2. Inside `admin`, right-click → "New File" → name it: `page.tsx`
3. Copy the code I'll give you
4. Paste and save

---

## 🎨 Step 6: Test It!

1. In Terminal, type:
   ```bash
   npm run dev
   ```
2. Wait until you see: "Ready in X seconds"
3. Open your browser (Chrome, Safari, etc.)
4. Go to: `http://localhost:3000/admin`
5. You should see a login page! 🎉

**Login with:**
- Username: `admin`
- Password: (whatever you put in .env.local file)

---

## 🚀 Step 7: Put It Online (Deploy to Vercel)

1. In Terminal, type:
   ```bash
   git add .
   git commit -m "Add admin dashboard"
   git push
   ```
2. Go to Vercel website
3. It will automatically deploy! (takes 1-2 minutes)
4. When done, click "Visit" button
5. Go to: `https://your-site.vercel.app/admin`
6. **IT WORKS!** 🎊

---

## 🎓 Step 8: Show Your Client How to Use It

Tell your client:
1. Go to: `https://your-site.com/admin`
2. Login with username and password (you'll give them)
3. Click "Choose File" to pick a new picture
4. Click "Upload"
5. Wait 2 seconds
6. **DONE!** The picture changes on the website immediately!

---

## 🆘 If Something Goes Wrong

### "I get an error when running npm install"
- Make sure you're in the right folder
- Try: `cd /Users/mac/Documents/projects/rabab/cooking-class`

### "I can't login to /admin"
- Check your `.env.local` file
- Make sure ADMIN_PASSWORD matches what you're typing

### "Pictures don't upload"
- Check if BLOB_READ_WRITE_TOKEN is in `.env.local`
- Go to Vercel → Settings → Environment Variables
- Add all your .env.local variables there too!

### "Page shows error 500"
- Check if you ran the SQL query in Step 4
- Check if all environment variables are on Vercel

---

## 🎁 What Your Client Can Change

With this setup, your client can change:
- ✅ Hero image (desktop)
- ✅ Hero image (mobile)
- ✅ Hero title text
- ✅ Hero subtitle text

**Want to add more things they can change?** Just tell me and I'll show you how!

---

## 📞 Need Help?

If you get stuck on any step, just tell me:
1. Which step number you're on
2. What error message you see (if any)
3. Take a screenshot if it helps!

I'll help you fix it! 🚀

---

**Remember:** You're building something REALLY cool! Professional developers do this exact same thing. Take your time, follow each step, and you'll have an awesome admin dashboard! 💪
