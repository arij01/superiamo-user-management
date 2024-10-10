import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-instance.supabase.io';
const supabaseKey = 'your-supabase-key';
const supabaseSecret = 'your-supabase-secret';

const supabase = createClient(supabaseUrl, supabaseKey, supabaseSecret);

export default supabase;