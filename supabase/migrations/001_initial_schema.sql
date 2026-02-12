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

-- Indexes
CREATE INDEX idx_medicines_product_id ON medicines(product_id);
CREATE INDEX idx_medicines_manufacturer ON medicines(manufacturer);
CREATE INDEX idx_qr_records_hash ON qr_records(qr_hash);
CREATE INDEX idx_qr_records_product_id ON qr_records(product_id);
CREATE INDEX idx_verification_logs_product_id ON verification_logs(product_id);
CREATE INDEX idx_users_email ON users(email);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medicines_updated_at
  BEFORE UPDATE ON medicines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
