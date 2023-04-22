import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { env } from "@/env.mjs"

const globalForSupabase = globalThis as unknown as {
	supabase: SupabaseClient | undefined
}

export const supabase = globalForSupabase.supabase ?? createClient(env.SUPABASE_DB_URL, env.SUPABASE_ANON_KEY)

if (env.NODE_ENV !== "production") globalForSupabase.supabase = supabase
