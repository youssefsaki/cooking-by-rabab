# 🆘 Troubleshooting Guide

**Don't panic!** Every problem has a solution. Here are the most common issues and how to fix them.

---

## 🔴 Problem 1: "npm install" Gives an Error

### Error Message:
```
npm ERR! code ENOENT
npm ERR! syscall open
```

### Solution:
1. Make sure you're in the right folder
2. Open Terminal and type:
   ```bash
   cd /Users/mac/Documents/projects/rabab/cooking-class
   pwd
   ```
3. You should see: `/Users/mac/Documents/projects/rabab/cooking-class`
4. If not, you're in the wrong folder!
5. Try the `cd` command again

---

## 🔴 Problem 2: Can't Login to /admin

### Error Message:
"Wrong username or password" ❌

### Solution A: Check Your .env.local File
1. Open `.env.local` in VS Code
2. Make sure it has these lines:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=YourPassword123
   ```
3. Try logging in with exactly what's in the file
4. **Passwords are case-sensitive!** (A ≠ a)

### Solution B: Restart the Dev Server
1. In Terminal, press `Ctrl + C` to stop the server
2. Type: `npm run dev` to start it again
3. Try logging in again

---

## 🔴 Problem 3: Page Shows "Error 500"

### What This Means:
Something broke on the server side

### Solution A: Check Database Connection
1. Go to vercel.com
2. Click your project → Storage → Postgres
3. Click "Query" tab
4. Run this to check if table exists:
   ```sql
   SELECT * FROM website_content;
   ```
5. If you see an error, run the CREATE TABLE command again (from the guide)

### Solution B: Check Environment Variables
1. Open `.env.local`
2. Make sure ALL these are filled in:
   - BLOB_READ_WRITE_TOKEN
   - POSTGRES_URL
   - POSTGRES_PRISMA_URL
   - POSTGRES_URL_NON_POOLING
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - ADMIN_USERNAME
   - ADMIN_PASSWORD
3. No line should be empty!

### Solution C: Check Terminal for Errors
1. Look at your Terminal window (where you ran `npm run dev`)
2. Scroll up and look for red text
3. Copy the error message and tell me - I'll help!

---

## 🔴 Problem 4: Images Won't Upload

### Error Message:
"Upload failed" ❌

### Solution A: Check Blob Token
1. Open `.env.local`
2. Find the line: `BLOB_READ_WRITE_TOKEN=...`
3. Make sure it starts with `vercel_blob_`
4. If it's empty, go back to Vercel and get it again:
   - Vercel → Your Project → Storage → Blob
   - Click "Connect" or "Settings"
   - Copy the token

### Solution B: Check File Size
1. Your image might be too big!
2. Try a smaller image (under 5MB)
3. You can compress images at: https://tinypng.com

### Solution C: Check File Type
1. Only these work: .jpg, .jpeg, .png, .gif, .webp
2. PDFs, videos, etc. won't work
3. Make sure your file has the right extension

---

## 🔴 Problem 5: Changes Don't Show on Website

### Solution A: Hard Refresh the Page
1. On the website (not /admin), press:
   - **Mac:** `Cmd + Shift + R`
   - **Windows:** `Ctrl + Shift + R`
2. This clears the cache and reloads everything

### Solution B: Check Database
1. Go to Vercel → Storage → Postgres → Query
2. Run:
   ```sql
   SELECT * FROM website_content;
   ```
3. Check if your changes are saved there
4. If not, the upload might have failed

### Solution C: Check Homepage Code
1. Your homepage needs to fetch from the database
2. We'll need to update your homepage to use the database
3. Tell me and I'll help you with this part!

---

## 🔴 Problem 6: "Module not found" Error

### Error Message:
```
Module not found: Can't resolve '@vercel/blob'
```

### Solution:
1. You forgot to install the packages!
2. Open Terminal
3. Run these commands:
   ```bash
   npm install @vercel/blob
   npm install @vercel/postgres
   npm install next-auth
   npm install bcryptjs
   npm install @types/bcryptjs --save-dev
   ```
4. Wait for them to finish
5. Restart dev server: `npm run dev`

---

## 🔴 Problem 7: /admin Page is Blank

### Solution A: Check Browser Console
1. Open your browser
2. Press `F12` (or right-click → Inspect)
3. Click "Console" tab
4. Look for red errors
5. Copy the error and tell me

### Solution B: Check if Files Exist
Make sure these files exist in your project:
- [ ] `app/admin/page.tsx`
- [ ] `app/admin/layout.tsx`
- [ ] `app/api/auth/[...nextauth]/route.ts`

If any are missing, tell me which one!

---

## 🔴 Problem 8: Vercel Deployment Fails

### Error Message:
"Build failed" on Vercel

### Solution A: Add Environment Variables to Vercel
1. Go to Vercel → Your Project → Settings
2. Click "Environment Variables" on the left
3. Add EVERY line from your `.env.local` file
4. Make sure to change `NEXTAUTH_URL` to your real URL:
   ```
   NEXTAUTH_URL=https://your-site.vercel.app
   ```
5. Click "Redeploy" button

### Solution B: Check Build Logs
1. On Vercel, click "Deployments"
2. Click the failed deployment
3. Scroll down to see the error
4. Look for red text
5. Copy the error and tell me

---

## 🔴 Problem 9: Git Push Fails

### Error Message:
```
fatal: not a git repository
```

### Solution:
1. Make sure you're in the right folder
2. Check if it's a git repo:
   ```bash
   git status
   ```
3. If you see an error, initialize git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

---

## 🔴 Problem 10: "Permission Denied" Error

### Solution:
1. You might need admin rights
2. Try adding `sudo` before the command:
   ```bash
   sudo npm install @vercel/blob
   ```
3. It will ask for your computer password
4. Type it (you won't see it as you type - that's normal!)
5. Press Enter

---

## 🎯 Still Stuck?

If none of these solutions work, tell me:

1. **Which step you're on** (from the checklist)
2. **The exact error message** (copy and paste it)
3. **What you tried** (which solutions from above)
4. **A screenshot** (if it helps)

I'll help you fix it! 💪

---

## 📞 Quick Help Checklist

Before asking for help, try these:

- [ ] Restart dev server (`Ctrl + C`, then `npm run dev`)
- [ ] Hard refresh browser (`Cmd + Shift + R`)
- [ ] Check `.env.local` file exists and is filled in
- [ ] Check Terminal for error messages
- [ ] Check browser console (F12) for errors
- [ ] Make sure all npm packages are installed

---

## 🎓 Common Mistakes (We All Make Them!)

### Mistake 1: Forgot to Save File
- Always press `Cmd + S` after editing!
- Look for the dot (•) next to filename - that means unsaved

### Mistake 2: Wrong Folder
- Always check you're in the right folder with `pwd`
- Should be: `/Users/mac/Documents/projects/rabab/cooking-class`

### Mistake 3: Typo in .env.local
- Variable names must be EXACT
- No spaces around the `=` sign
- Example: `ADMIN_USERNAME=admin` ✅
- Example: `ADMIN_USERNAME = admin` ❌ (spaces are bad!)

### Mistake 4: Forgot to Restart Server
- After changing `.env.local`, ALWAYS restart:
  - Press `Ctrl + C`
  - Type `npm run dev`

### Mistake 5: Wrong Password
- Passwords are case-sensitive!
- `Password123` ≠ `password123`
- Copy-paste from `.env.local` to be sure

---

## 💡 Pro Tips

### Tip 1: Keep Terminal Open
- Don't close the Terminal window
- You need it running for the website to work

### Tip 2: Use Two Browser Tabs
- Tab 1: `http://localhost:3000/admin` (admin page)
- Tab 2: `http://localhost:3000` (homepage)
- Easy to test changes!

### Tip 3: Check Vercel Dashboard
- Go to vercel.com often
- Check if deployments are successful
- Look at the logs if something breaks

### Tip 4: Git Commit Often
- After each working step, save your progress:
  ```bash
  git add .
  git commit -m "Describe what you did"
  ```
- If something breaks, you can go back!

---

## 🌟 You're Doing Great!

Remember: **Every developer gets errors!** Even professionals with 10+ years experience.

The difference between a beginner and a pro?

- ❌ Beginner: "Oh no, an error! I give up!"
- ✅ Pro: "Oh, an error! Let me read it and fix it!"

**You're learning to be a pro!** 🚀

Keep going, you got this! 💪
