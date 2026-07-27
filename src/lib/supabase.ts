import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
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
