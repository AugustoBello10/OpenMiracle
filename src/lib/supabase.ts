import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mcnaefigyakgbspnqguk.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_ANON_KEY) {
  console.warn('[OpenMiracle] VITE_SUPABASE_ANON_KEY não foi configurada no arquivo .env.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
