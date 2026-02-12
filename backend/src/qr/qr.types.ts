export interface QRPayload {
  qrHash: string;
  productId: string;
  nonce: string;
  timestamp: number;
  expiresAt: number;
}

export interface QRRecord {
  qr_hash: string;
  product_id: string;
  nonce: string;
  expires_at: string;
  used: boolean;
  used_at?: string;
  created_at: string;
}

export interface QRVerificationRequest {
  qrData: string;
}

export interface QRVerificationResponse {
  isValid: boolean;
  productId?: string;
  message: string;
  medicine?: any;
}

export interface QRGenerationOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export interface ParsedQRData {
  qrHash: string;
  productId: string;
  timestamp: number;
}
