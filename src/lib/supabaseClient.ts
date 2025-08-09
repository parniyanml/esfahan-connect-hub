import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lovable's Supabase integration injects public URL and anon key when connected.
const injectedUrl = (window as any).__SUPABASE_URL__;
const injectedAnonKey = (window as any).__SUPABASE_ANON_KEY__;

let client: SupabaseClient | null = null;
if (injectedUrl && injectedAnonKey) {
  client = createClient(injectedUrl, injectedAnonKey);
}

export const isSupabaseConfigured = Boolean(client);

export function getSupabase(): SupabaseClient {
  if (!client) {
    throw new Error(
      "Supabase is not configured. Please connect the Lovable project to Supabase."
    );
  }
  return client;
}
