import { createClient } from "@supabase/supabase-js";

// Supabase public URL and anon key are provided by Lovable's Supabase integration.
// If not injected automatically, set them via project secrets and reload the app.
const supabaseUrl = (window as any).__SUPABASE_URL__ || "";
const supabaseAnonKey = (window as any).__SUPABASE_ANON_KEY__ || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
