import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseInstance;
}

// Backwards-compatible default export for client components
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as Record<string, unknown>)[prop as string];
  },
});

/**
 * Database schema types matching our Supabase tables.
 * Create these tables in Supabase SQL editor after setup.
 */
export type Tables = {
  profiles: {
    id: string;
    email: string;
    full_name: string | null;
    firm_name: string | null;
    created_at: string;
  };
  documents: {
    id: string;
    user_id: string;
    file_name: string;
    file_size: number;
    file_type: string;
    status: "uploading" | "processing" | "completed" | "failed";
    original_text: string;
    analysis_json: Record<string, unknown> | null;
    error_message: string | null;
    created_at: string;
    updated_at: string;
  };
  subscriptions: {
    id: string;
    user_id: string;
    plan_tier: "starter" | "pro" | "business";
    status: "active" | "cancelled" | "past_due" | "trialing";
    current_period_start: string;
    current_period_end: string;
    stripe_subscription_id: string;
    created_at: string;
  };
};
