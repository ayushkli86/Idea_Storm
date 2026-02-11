# ⚡ Quick Start - 3 Steps to Get Running

## Step 1: Setup Supabase Database (2 minutes)

1. Go to: https://supabase.com/dashboard
2. Open your project: `bshvpxzkezzxgfewbzax`
3. Click **"SQL Editor"** → **"+ New Query"**
4. Copy the SQL from `supabase/migrations/001_initial_schema.sql`
5. Paste and click **"Run"**
6. ✅ Done! Tables created.

## Step 2: Backend is Already Running ✅

Your backend is already running on port 5000!

Check by opening: http://localhost:5000/api/verify

## Step 3: Test the System

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123","name":"Test","role":"manufacturer"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'
```

Copy the `token` from response!

### Register Medicine
```bash
curl -X POST http://localhost:5000/api/medicines/register \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Aspirin 500mg",
    "manufacturer":"PharmaCorp",
    "batchNumber":"BATCH001",
    "manufactureDate":"2026-01-01",
    "expiryDate":"2027-01-01",
    "description":"Pain relief"
  }'
```

### Verify Medicine
```bash
curl -X POST http://localhost:5000/api/verify \
  -H "Content-Type: application/json" \
  -d '{"productId":"MED-XXXXXXXX"}'
```

---

## 🎯 What's Next?

After Supabase setup, I can:

1. **Update Frontend** - Connect Verify page to real API
2. **Update Dashboard** - Show real data from backend
3. **Remove Dummy Data** - Replace all mock data with API calls

**Ready to proceed?** Just let me know after you've set up Supabase!

---

## 📚 Full Guides

- `SUPABASE_DATABASE_SETUP.md` - Detailed Supabase setup
- `VERIFICATION_SYSTEM_GUIDE.md` - How verification works
- `CHANGES_SUMMARY.md` - What was changed
