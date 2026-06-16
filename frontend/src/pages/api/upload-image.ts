import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    // Generar un nombre único para el archivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `properties/${fileName}`;

    // Subir el archivo a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Obtener la URL pública
    const { data: urlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    return new Response(
      JSON.stringify({ url: publicUrl }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to upload image' }),
      { status: 500 }
    );
  }
};
