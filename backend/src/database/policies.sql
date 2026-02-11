-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Medicines policies
CREATE POLICY "Anyone can view medicines"
  ON medicines FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Manufacturers and admins can insert medicines"
  ON medicines FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('manufacturer', 'admin')
    )
  );

CREATE POLICY "Manufacturers can update their own medicines"
  ON medicines FOR UPDATE
  TO authenticated
  USING (
    registered_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- QR Records policies
CREATE POLICY "Anyone can view QR records"
  ON qr_records FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can insert QR records"
  ON qr_records FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "System can update QR records"
  ON qr_records FOR UPDATE
  TO authenticated
  USING (true);

-- Verification Logs policies
CREATE POLICY "Anyone can insert verification logs"
  ON verification_logs FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Admins can view all verification logs"
  ON verification_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Grant permissions
GRANT SELECT ON users TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON medicines TO authenticated;
GRANT SELECT, INSERT, UPDATE ON qr_records TO authenticated, anon;
GRANT SELECT, INSERT ON verification_logs TO authenticated, anon;
