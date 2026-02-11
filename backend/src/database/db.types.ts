export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password: string;
          name: string;
          role: 'admin' | 'manufacturer' | 'pharmacy' | 'consumer' | 'dda';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password: string;
          name: string;
          role?: 'admin' | 'manufacturer' | 'pharmacy' | 'consumer' | 'dda';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password?: string;
          name?: string;
          role?: 'admin' | 'manufacturer' | 'pharmacy' | 'consumer' | 'dda';
          updated_at?: string;
        };
      };
      medicines: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          manufacturer: string;
          batch_number: string;
          manufacture_date: string;
          expiry_date: string;
          description: string | null;
          blockchain_tx: string | null;
          registered_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          manufacturer: string;
          batch_number: string;
          manufacture_date: string;
          expiry_date: string;
          description?: string | null;
          blockchain_tx?: string | null;
          registered_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          manufacturer?: string;
          batch_number?: string;
          manufacture_date?: string;
          expiry_date?: string;
          description?: string | null;
          updated_at?: string;
        };
      };
      qr_records: {
        Row: {
          id: string;
          qr_hash: string;
          product_id: string;
          nonce: string;
          expires_at: string;
          used: boolean;
          used_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          qr_hash: string;
          product_id: string;
          nonce: string;
          expires_at: string;
          used?: boolean;
          used_at?: string | null;
          created_at?: string;
        };
        Update: {
          used?: boolean;
          used_at?: string | null;
        };
      };
      verification_logs: {
        Row: {
          id: string;
          product_id: string;
          is_valid: boolean;
          verified_at: string;
          ip_address: string | null;
          user_agent: string | null;
          metadata: any | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          is_valid: boolean;
          verified_at?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          metadata?: any | null;
        };
      };
    };
  };
}
