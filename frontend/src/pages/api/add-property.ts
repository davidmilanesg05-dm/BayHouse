import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { sqft, ...propertyData } = body;
    
    const { error } = await supabase
      .from('properties')
      .insert([propertyData]);
      
    if (error) throw error;
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating property:', error);
    return new Response(
      JSON.stringify({ error: `Error al crear la propiedad: ${error.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
