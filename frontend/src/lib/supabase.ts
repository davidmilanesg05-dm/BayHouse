import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las propiedades
export type Property = {
  id: string
  title: string
  price: string
  location: string
  beds: number
  baths: number
  sqft: number
  floors: number
  garage: boolean
  patio: boolean
  terrace: boolean
  cistern: boolean
  special_circuit: boolean
  description: string
  main_image_url: string
  other_image_urls: string[]
  created_at: string
}
