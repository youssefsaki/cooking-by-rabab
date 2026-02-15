# 🎯 Quick Reference Card

**Print this out and keep it next to your computer!**

---

## 🚀 Common Commands

```bash
# Start dev server
npm run dev

# Stop dev server
Ctrl + C

# Install a package
npm install package-name

# Go to project folder
cd /Users/mac/Documents/projects/rabab/cooking-class

# Check current folder
pwd

# Git commands
git add .
git commit -m "your message"
git push

# Generate secret
openssl rand -base64 32
```

---

## 🌐 Important URLs

| What | URL |
|------|-----|
| Local Admin | http://localhost:3000/admin |
| Local Homepage | http://localhost:3000 |
| Live Admin | https://your-site.com/admin |
| Vercel Dashboard | https://vercel.com |
| Vercel Storage | https://vercel.com → Project → Storage |

---

## 📁 Important Files

| File | What It Does |
|------|--------------|
| `.env.local` | Secret keys (NEVER share!) |
| `app/admin/page.tsx` | Admin dashboard page |
| `lib/db.ts` | Database helper |
| `app/api/upload/route.ts` | Image upload handler |
| `app/api/content/route.ts` | Text update handler |

---

## 🔑 Environment Variables

**Must be in `.env.local` file:**

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
POSTGRES_URL=postgres://xxxxx
POSTGRES_PRISMA_URL=postgres://xxxxx
POSTGRES_URL_NON_POOLING=postgres://xxxxx
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourPassword123!
```

**Also add these to Vercel:**
- Go to: Vercel → Project → Settings → Environment Variables
- Add ALL of the above
- Change `NEXTAUTH_URL` to your live URL

---

## 🆘 Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Can't login | Check `.env.local` password, restart server |
| Error 500 | Check database table exists, check env vars |
| Upload fails | Check BLOB_READ_WRITE_TOKEN in `.env.local` |
| Module not found | Run `npm install` for missing packages |
| Changes don't show | Hard refresh: `Cmd + Shift + R` |
| Blank page | Check browser console (F12) for errors |

---

## 📦 Required Packages

```bash
npm install @vercel/blob
npm install @vercel/postgres
npm install next-auth
npm install bcryptjs
npm install @types/bcryptjs --save-dev
```

---

## 🎯 Testing Checklist

- [ ] Run `npm run dev`
- [ ] Go to `http://localhost:3000/admin`
- [ ] Login with username and password
- [ ] Upload an image - should work
- [ ] Edit text and save - should work
- [ ] Check homepage - changes should appear
- [ ] Deploy to Vercel
- [ ] Test live URL - should work

---

## 🔐 Default Login

**Username:** admin  
**Password:** (whatever you set in `.env.local`)

**Change these before giving to client!**

---

## 📊 Database Table

```sql
CREATE TABLE website_content (
  id SERIAL PRIMARY KEY,
  content_key VARCHAR(255) UNIQUE NOT NULL,
  content_value TEXT NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_timestamp
);
```

---

## 🎨 What Client Can Change

| Content Key | Type | What It Is |
|-------------|------|------------|
| hero_image_desktop | image | Main hero image (desktop) |
| hero_image_mobile | image | Main hero image (mobile) |
| hero_title | text | Hero section title |
| hero_subtitle | text | Hero section subtitle |

**Want to add more? Just ask me!**

---

## 🚦 Deployment Steps

1. Add environment variables to Vercel
2. `git add .`
3. `git commit -m "Add admin dashboard"`
4. `git push`
5. Wait for Vercel to deploy (1-2 min)
6. Test at `https://your-site.com/admin`

---

## 💡 Pro Tips

- ✅ Always save files (`Cmd + S`)
- ✅ Restart server after changing `.env.local`
- ✅ Check Terminal for error messages
- ✅ Use browser console (F12) to debug
- ✅ Git commit after each working step
- ✅ Keep this reference card handy!

---

## 📞 Help Resources

1. **START-HERE.md** - Overview
2. **HOW-IT-WORKS.md** - Explains system
3. **CHECKLIST.md** - Step-by-step tasks
4. **ADMIN-DASHBOARD-GUIDE.md** - Detailed guide
5. **TROUBLESHOOTING.md** - Fix problems
6. **QUICK-REFERENCE.md** - This file!

---

## 🎯 Success Indicators

✅ **It's working when:**
- No errors in Terminal
- Can login to /admin
- Can upload images
- Can save text
- Changes appear on website
- Works on live Vercel URL

❌ **Something's wrong when:**
- Red errors in Terminal
- Can't login
- Upload fails
- Error 500 page
- Changes don't save

---

## 🏆 You're Ready!

Keep this card handy and refer to it whenever you need a quick reminder!

**You got this!** 💪🚀
