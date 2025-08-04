import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = 'https://dzdeewebxsfxeabdxtiq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6ZGVld2VieHNmeGVhYmR4dGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MzA3ODAsImV4cCI6MjA2MjUwNjc4MH0.45f2zLmFlr8td1iOJV8FYPoVUtn7x5R7NHw6Wq_Ceo8'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
