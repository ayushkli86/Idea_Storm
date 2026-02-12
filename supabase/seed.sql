-- Seed data for MediChain
-- This creates sample data for testing

-- Insert sample users (password is 'password123' hashed with bcrypt)
INSERT INTO users (id, email, password, name, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@medichain.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIiIiIiI', 'Admin User', 'admin'),
  ('550e8400-e29b-41d4-a716-446655440002', 'manufacturer@pharma.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIiIiIiI', 'PharmaCorp', 'manufacturer'),
  ('550e8400-e29b-41d4-a716-446655440003', 'pharmacy@local.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIiIiIiI', 'Local Pharmacy', 'pharmacy'),
  ('550e8400-e29b-41d4-a716-446655440004', 'consumer@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIiIiIiI', 'John Consumer', 'consumer'),
  ('550e8400-e29b-41d4-a716-446655440005', 'dda@gov.in', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIiIiIiIiI', 'DDA Officer', 'dda')
ON CONFLICT (email) DO NOTHING;

-- Insert sample medicines
INSERT INTO medicines (product_id, name, manufacturer, batch_number, manufacture_date, expiry_date, description, registered_by) VALUES
  ('MED-SAMPLE01', 'Aspirin 500mg', 'PharmaCorp', 'BATCH-2026-001', '2026-01-01', '2027-01-01', 'Pain relief medication', '550e8400-e29b-41d4-a716-446655440002'),
  ('MED-SAMPLE02', 'Paracetamol 650mg', 'PharmaCorp', 'BATCH-2026-002', '2026-01-15', '2027-01-15', 'Fever and pain relief', '550e8400-e29b-41d4-a716-446655440002'),
  ('MED-SAMPLE03', 'Amoxicillin 250mg', 'PharmaCorp', 'BATCH-2026-003', '2026-02-01', '2027-02-01', 'Antibiotic', '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (product_id) DO NOTHING;

-- Note: QR records and verification logs will be created dynamically by the application
