import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://rbjgmchzzuzfyjfmtpkv.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZGdwa2pyeHFyZGR3dG9za2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNjk2NDMsImV4cCI6MjA3MTk0NTY0M30.dJIRqF4KlYl280UWQap8Ks4-hdLruwy5xhcwCs0hOEY"; // reemplaza o usa .env

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