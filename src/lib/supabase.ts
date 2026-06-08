import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mcnaefigyakgbspnqguk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbmFlZmlneWFrZ2JzcG5xZ3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MTEyMjQsImV4cCI6MjA5MTE4NzIyNH0.I0J-D0OzMfQeb30XzmLmB9MO9wqvzxewTb_F2j-yfGk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
