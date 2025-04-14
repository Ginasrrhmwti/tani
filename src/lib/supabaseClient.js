import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zlcwuuievxmuwjlksztx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsY3d1dWlldnhtdXdqbGtzenR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTMwNDAsImV4cCI6MjA1OTY4OTA0MH0.XNbqRKoYic9Zk_k3F9OrBtD7p7uhCMMUwRR6iNa-7rQ"
export const supabase = createClient(supabaseUrl, supabaseKey)
