import { createClient, SupabaseClient } from '@supabase/supabase-js';
import logger from '../utils/logger';

class SupabaseClientService {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

    this.client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false
      }
    });

    logger.info('Supabase client initialized');
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  async testConnection(): Promise<boolean> {
    try {
      const { error } = await this.client.from('users').select('count').limit(1);
      if (error) throw error;
      return true;
    } catch (error) {
      logger.error('Supabase connection test failed', error);
      return false;
    }
  }
}

export default new SupabaseClientService();
