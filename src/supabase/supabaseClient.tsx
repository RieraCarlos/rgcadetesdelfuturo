import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://sdlqvpvntazgfypoqbur.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkbHF2cHZudGF6Z2Z5cG9xYnVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI3NTk0OCwiZXhwIjoyMDkwODUxOTQ4fQ.lQ3LJCiZQLKn4M_jIzi00JZABulrPIbxxgPc416nASY"; // usa publishable key si anon key no existe

declare global {
  interface Window { __SUPABASE_CLIENT__?: SupabaseClient }
}

// Cachear instancia para evitar múltiples GoTrueClient en HMR
const getSupabaseClient = (): SupabaseClient => {
  if (typeof window !== "undefined" && window.__SUPABASE_CLIENT__) {
    return window.__SUPABASE_CLIENT__!;
  }

  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true }, // opcional
  });

  if (typeof window !== "undefined") {
    window.__SUPABASE_CLIENT__ = client;
  }
  return client;
};

const supabase = getSupabaseClient();
export default supabase;