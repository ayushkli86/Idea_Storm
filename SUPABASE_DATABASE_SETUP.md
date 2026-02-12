# 🗄️ Supabase Database Setup Guide

## Quick Setup (5 Minutes)

### Step 1: Access Supabase Dashboard

1. Open your browser and go to: https://supabase.com/dashboard
2. Sign in with your account
3. You should see your project: `bshvpxzkezzxgfewbzax`

### Step 2: Open SQL Editor

1. In the **left sidebar**, click on **"SQL Editor"** (icon looks like `</>`)
2. Click the **"+ New Query"** button at the top

### Step 3: Copy and Run the Migration Script

**Copy this entire SQL script:**

```sql
-- Initial schema migration for MediChain
-- Run this in your Supabase SQL editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manufacturer', 'pharmacy', 'consumer', 'dda')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medicines table
CREATE TABLE IF NOT EXISTS medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(255) NOT NULL,
  batch_number VARCHAR(100) NOT NULL,
  manufacture_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  description TEXT,
  blockchain_tx VARCHAR(255),
  registered_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QR Records table
CREATE TABLE IF NOT EXISTS qr_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_hash VARCHAR(255) UNIQUE NOT NULL,
  product_id VARCHAR(50) REFERENCES medicines(product_id),
  nonce VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verification Logs table
CREATE TABLE IF NOT EXISTS verification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(50) REFERENCES medicines(product_id),
  is_valid BOOLEAN NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT,
  metadata JSONB
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_medicines_product_id ON medicines(product_id);
CREATE INDEX IF NOT EXISTS idx_medicines_manufacturer ON medicines(manufacturer);
CREATE INDEX IF NOT EXISTS idx_qr_records_hash ON qr_records(qr_hash);
CREATE INDEX IF NOT EXISTS idx_qr_records_product_id ON qr_records(product_id);
CREATE INDEX IF NOT EXISTS idx_verification_logs_product_id ON verification_logs(product_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to medicines table
CREATE TRIGGER update_medicines_updated_at
  BEFORE UPDATE ON medicines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Then:**
1. Paste it into the SQL Editor
2. Click the **"Run"** button (or press `Ctrl+Enter`)
3. Wait for "Success. No rows returned" message

### Step 4: Verify Tables Were Created

1. In the left sidebar, click on **"Table Editor"**
2. You should see 4 new tables:
   - ✅ `users`
   - ✅ `medicines`
   - ✅ `qr_records`
   - ✅ `verification_logs`

### Step 5: (Optional) Add Sample Data for Testing

If you want to test with sample data, run this in SQL Editor:

```sql
-- Insert a test user (password is 'password123' hashed with bcrypt)
INSERT INTO users (email, password, name, role) VALUES
  ('test@manufacturer.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIiIiIiI', 'Test Manufacturer', 'manufacturer')
ON CONFLICT (email) DO NOTHING;

-- Insert a test medicine
INSERT INTO medicines (product_id, name, manufacturer, batch_number, manufacture_date, expiry_date, description) VALUES
  ('MED-TEST0001', 'Test Medicine 500mg', 'Test Pharma Ltd.', 'TEST-2026-001', '2026-01-01', '2027-01-01', 'Test medicine for verification')
ON CONFLICT (product_id) DO NOTHING;
```

---

## ✅ What You Just Created

### Database Tables

#### 1. **users** - User accounts
- Stores user credentials
- Roles: admin, manufacturer, pharmacy, consumer, dda
- Used for authentication

#### 2. **medicines** - Medicine products
- Product information
- Batch details
- Blockchain transaction reference
- Expiry dates

#### 3. **qr_records** - QR code security
- One-time use QR codes
- 5-minute expiration
- Tracks usage to prevent duplication

#### 4. **verification_logs** - Audit trail
- Every verification attempt logged
- IP addresses tracked
- Metadata for analysis

---

## 🔍 How to Check If It's Working

### Method 1: Using Supabase Dashboard

1. Go to **Table Editor** in left sidebar
2. Click on `medicines` table
3. You should see the table structure with columns

### Method 2: Using SQL Editor

Run this query:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see:
- users
- medicines
- qr_records
- verification_logs

### Method 3: Test Backend Connection

Your backend is already configured! Just restart it:

```bash
# Backend should already be running
# Check the logs for "Server running on port 5000"
```

---

## 🚀 Next Steps

### 1. Test User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manufacturer@test.com",
    "password": "password123",
    "name": "Test Manufacturer",
    "role": "manufacturer"
  }'
```

### 2. Login and Get Token

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manufacturer@test.com",
    "password": "password123"
  }'
```

Save the `token` from the response!

### 3. Register a Medicine

```bash
curl -X POST http://localhost:5000/api/medicines/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Aspirin 500mg",
    "manufacturer": "PharmaCorp",
    "batchNumber": "BATCH-2026-001",
    "manufactureDate": "2026-01-01",
    "expiryDate": "2027-01-01",
    "description": "Pain relief medication"
  }'
```

### 4. Verify the Medicine

```bash
curl -X POST http://localhost:5000/api/verify \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "MED-XXXXXXXX"
  }'
```

Replace `MED-XXXXXXXX` with the product ID from step 3!

---

## 🔧 Troubleshooting

### Error: "relation does not exist"
- **Solution**: Run the migration script again in SQL Editor

### Error: "permission denied"
- **Solution**: Make sure you're using the service key in backend `.env`

### Tables not showing in Table Editor
- **Solution**: Refresh the page, or check SQL Editor for errors

### Backend can't connect
- **Solution**: Verify these in `backend/.env`:
  ```
  SUPABASE_URL=https://bshvpxzkezzxgfewbzax.supabase.co
  SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

---

## 📊 View Your Data

### In Supabase Dashboard

1. Click **"Table Editor"** in sidebar
2. Select a table (e.g., `medicines`)
3. You'll see all records in a spreadsheet view
4. You can add/edit/delete records manually here

### Using SQL Queries

```sql
-- See all medicines
SELECT * FROM medicines;

-- See all users
SELECT id, email, name, role FROM users;

-- See verification logs
SELECT * FROM verification_logs ORDER BY verified_at DESC LIMIT 10;

-- See QR records
SELECT * FROM qr_records WHERE used = false;
```

---

## ✅ Success Checklist

- [ ] Opened Supabase dashboard
- [ ] Ran migration script in SQL Editor
- [ ] Saw "Success" message
- [ ] Verified 4 tables exist in Table Editor
- [ ] Backend is running (port 5000)
- [ ] Tested user registration
- [ ] Tested medicine registration
- [ ] Tested verification

---

## 🎉 You're Done!

Your Supabase database is now set up and connected to your backend!

The system is ready to:
- ✅ Store user accounts
- ✅ Register medicines
- ✅ Generate QR codes
- ✅ Verify authenticity
- ✅ Log all verifications

**Next**: Update the frontend to call the real backend API instead of using dummy data!
