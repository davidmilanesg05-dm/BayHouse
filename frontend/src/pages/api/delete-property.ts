import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error al eliminar propiedad' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
