# Supabase Integration Guide

## Overview

This backend integrates Supabase as the database layer with proper authentication, authorization, and data management.

## Configuration

### Environment Variables

```env
SUPABASE_URL=https://bshvpxzkezzxgfewbzax.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Project Structure

```
backend/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── supabase.client.ts   # Supabase client initialization
│   │   ├── auth.service.ts      # Auth business logic
│   │   ├── auth.middleware.ts   # JWT middleware
│   │   └── auth.types.ts        # Auth TypeScript types
│   │
│   ├── blockchain/              # Blockchain module
│   │   ├── blockchain.service.ts
│   │   └── blockchain.types.ts
│   │
│   ├── qr/                      # QR code module
│   │   ├── qr.service.ts
│   │   ├── qr.controller.ts
│   │   ├── qr.routes.ts
│   │   └── qr.types.ts
│   │
│   ├── database/                # Database schemas
│   │   ├── schema.sql           # Table definitions
│   │   ├── policies.sql         # Row Level Security
│   │   └── db.types.ts          # Database types
│   │
│   ├── utils/                   # Utility functions
│   │   ├── crypto.ts            # Encryption utilities
│   │   ├── logger.ts            # Winston logger
│   │   └── time.ts              # Time utilities
│   │
│   └── server.ts                # Express server
│
├── supabase/
│   ├── migrations/              # Database migrations
│   │   └── 001_initial_schema.sql
│   ├── seed.sql                 # Sample data
│   └── config.toml              # Supabase config
│
└── .env                         # Environment variables
```

## Database Schema

### Tables

1. **users** - User accounts with roles
2. **medicines** - Medicine products
3. **qr_records** - QR code records with expiry
4. **verification_logs** - Verification audit trail

### Roles

- `admin` - Full system access
- `manufacturer` - Can register medicines
- `pharmacy` - Can verify medicines
- `consumer` - Can verify medicines
- `dda` - Drug regulatory authority

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and anon key

### 2. Run Database Migrations

In Supabase SQL Editor, run:

```sql
-- Copy content from supabase/migrations/001_initial_schema.sql
```

### 3. Apply Row Level Security

```sql
-- Copy content from backend/src/database/policies.sql
```

### 4. Seed Sample Data (Optional)

```sql
-- Copy content from supabase/seed.sql
```

### 5. Update Environment Variables

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
```

## API Endpoints

### Authentication

```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login user
POST /api/auth/refresh   - Refresh JWT token
```

### Medicines

```
POST /api/medicines/register  - Register medicine (Auth: manufacturer, admin)
GET  /api/medicines           - Get all medicines
GET  /api/medicines/:id       - Get medicine by ID
```

### QR Codes

```
GET  /api/qr/:productId  - Generate QR code (Auth: manufacturer, admin)
POST /api/qr/verify      - Verify QR code (Public)
```

### Verification

```
POST /api/verify     - Verify medicine by product ID
POST /api/verify/qr  - Verify by QR code
```

## Authentication Flow

1. User registers/logs in
2. Backend generates JWT token
3. Client includes token in Authorization header
4. Middleware verifies token
5. Request proceeds with user context

## QR Code Flow

1. Manufacturer registers medicine
2. System generates unique QR code with nonce
3. QR hash stored in database
4. QR hash registered on blockchain
5. Consumer scans QR code
6. System verifies:
   - QR not expired (5 min)
   - QR not used
   - QR exists on blockchain
7. Medicine details returned
8. QR marked as used

## Security Features

- JWT authentication
- Role-based access control
- Row Level Security (RLS)
- One-time QR codes
- QR expiration (5 minutes)
- Blockchain verification
- Audit logging

## Testing

### Test User Credentials

```
Email: admin@medichain.com
Password: password123
Role: admin

Email: manufacturer@pharma.com
Password: password123
Role: manufacturer
```

### Sample API Calls

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "consumer"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Register Medicine (with token)
curl -X POST http://localhost:5000/api/medicines/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Aspirin 500mg",
    "manufacturer": "PharmaCorp",
    "batchNumber": "BATCH001",
    "manufactureDate": "2026-01-01",
    "expiryDate": "2027-01-01",
    "description": "Pain relief"
  }'
```

## Troubleshooting

### Connection Issues

- Verify SUPABASE_URL is correct
- Check SUPABASE_SERVICE_KEY is valid
- Ensure tables are created

### Authentication Errors

- Verify JWT_SECRET is set
- Check token expiration
- Validate user role

### QR Verification Fails

- Check QR not expired
- Verify QR not already used
- Confirm blockchain registration

## Next Steps

1. Run migrations in Supabase
2. Test authentication endpoints
3. Register sample medicines
4. Generate and verify QR codes
5. Monitor verification logs

## Support

For issues, check:
- Backend logs: `backend/logs/`
- Supabase logs: Dashboard > Logs
- Blockchain logs: Ganache console
