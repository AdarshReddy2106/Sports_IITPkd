// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL='https://jtazbldrflccroyjskuy.supabase.co'
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0YXpibGRyZmxjY3JveWpza3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNTc5NDQsImV4cCI6MjA2NzYzMzk0NH0.wikKBMWUazi4zOtWDezRTR3FxvySIgTRwLlZeJhi_WY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Function to get Supabase client with Clerk token
export const getSupabaseClient = (token) => {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}


