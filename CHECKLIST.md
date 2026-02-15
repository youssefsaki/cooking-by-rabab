# ✅ Admin Dashboard Checklist

Print this out and check off each box as you complete it!

---

## 📦 STEP 1: Sign Up for Accounts

- [ ] Go to vercel.com and sign up/login
- [ ] Click on your project
- [ ] Click "Storage" tab
- [ ] Create "Blob" database
- [ ] Copy the `BLOB_READ_WRITE_TOKEN` code
- [ ] Create "Postgres" database  
- [ ] Copy ALL the Postgres codes (about 5 lines)
- [ ] Open Terminal and run: `openssl rand -base64 32`
- [ ] Copy the secret code it gives you

---

## 🔧 STEP 2: Install Tools

Open Terminal and run these commands ONE BY ONE:

- [ ] `cd /Users/mac/Documents/projects/rabab/cooking-class`
- [ ] `npm install @vercel/blob`
- [ ] `npm install @vercel/postgres`
- [ ] `npm install next-auth`
- [ ] `npm install bcryptjs`
- [ ] `npm install @types/bcryptjs --save-dev`

---

## 📝 STEP 3: Create .env.local File

- [ ] In VS Code, right-click in file list
- [ ] Click "New File"
- [ ] Name it: `.env.local`
- [ ] Paste all your codes from Step 1
- [ ] Change the ADMIN_PASSWORD to something you'll remember
- [ ] Press `Cmd + S` to save

Your `.env.local` should look like this:
```
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
POSTGRES_URL=postgres://xxxxx
POSTGRES_PRISMA_URL=postgres://xxxxx
POSTGRES_URL_NON_POOLING=postgres://xxxxx
NEXTAUTH_SECRET=your_secret_code_here
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourPasswordHere123!
```

---

## 🏗️ STEP 4: Create Database Table

- [ ] Go to vercel.com
- [ ] Click your project → Storage → Your Postgres database
- [ ] Click "Query" tab
- [ ] Copy the SQL code from the guide (the CREATE TABLE part)
- [ ] Paste it in the query box
- [ ] Click "Run Query"
- [ ] See "Success!" message

---

## 💻 STEP 5: Check Files Are Created

Look in VS Code - you should see these NEW files:

- [ ] `lib/db.ts` ✅
- [ ] `app/api/upload/route.ts` ✅
- [ ] `app/api/content/route.ts` ✅
- [ ] `app/api/auth/[...nextauth]/route.ts` ✅
- [ ] `app/admin/page.tsx` ✅
- [ ] `app/admin/layout.tsx` ✅
- [ ] `.env.local` ✅

**If any are missing, tell me which one and I'll help!**

---

## 🎨 STEP 6: Test Locally

- [ ] Open Terminal
- [ ] Type: `npm run dev`
- [ ] Wait for "Ready" message
- [ ] Open browser
- [ ] Go to: `http://localhost:3000/admin`
- [ ] See login page
- [ ] Login with username: `admin` and your password
- [ ] See the admin dashboard!

---

## 🚀 STEP 7: Deploy to Vercel

### Part A: Add Environment Variables to Vercel
- [ ] Go to vercel.com
- [ ] Click your project
- [ ] Click "Settings" tab
- [ ] Click "Environment Variables" on the left
- [ ] Add each line from your `.env.local` file:
  - [ ] BLOB_READ_WRITE_TOKEN
  - [ ] POSTGRES_URL
  - [ ] POSTGRES_PRISMA_URL
  - [ ] POSTGRES_URL_NON_POOLING
  - [ ] NEXTAUTH_SECRET
  - [ ] NEXTAUTH_URL (change to: `https://your-site.vercel.app`)
  - [ ] ADMIN_USERNAME
  - [ ] ADMIN_PASSWORD

### Part B: Push Code
- [ ] Open Terminal
- [ ] Type: `git add .`
- [ ] Type: `git commit -m "Add admin dashboard"`
- [ ] Type: `git push`
- [ ] Go to Vercel - watch it deploy (1-2 minutes)
- [ ] Click "Visit" when done
- [ ] Go to: `https://your-site.vercel.app/admin`
- [ ] **IT WORKS!** 🎉

---

## 🎓 STEP 8: Show Client

- [ ] Send client the URL: `https://your-site.com/admin`
- [ ] Send them the username and password
- [ ] Tell them: "Click Choose File → Pick image → It uploads automatically!"
- [ ] Tell them: "Edit text → Click Save Text → Done!"

---

## 🎉 YOU'RE DONE!

**Congratulations!** You just built a professional admin dashboard! 

Your client can now:
- ✅ Change pictures without texting you
- ✅ Change text without texting you  
- ✅ See changes instantly on the website

**You're awesome!** 🌟

---

## 🆘 If You Get Stuck

Just tell me:
1. Which checkbox you're stuck on
2. What error you see
3. Screenshot if helpful

I'll help you fix it! 💪
