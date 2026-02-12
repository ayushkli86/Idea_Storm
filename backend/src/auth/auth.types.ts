export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manufacturer' | 'pharmacy' | 'consumer' | 'dda';
  created_at: string;
  updated_at?: string;
}

export interface AuthTokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SessionData {
  userId: string;
  email: string;
  role: string;
  expiresAt: number;
}
