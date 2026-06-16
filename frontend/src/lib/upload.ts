import { supabase } from './supabase';

// Sube un archivo a Supabase Storage y devuelve la URL pública
export const uploadFile = async (file: File): Promise<string | null> => {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.name}`;
  const bucket = 'property-images';

  try {
    // Subir el archivo
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError.message);
      throw uploadError;
    }

    // Obtener la URL pública
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    if (!data || !data.publicUrl) {
      throw new Error('Could not get public URL for the uploaded file.');
    }

    return data.publicUrl;

  } catch (error) {
    console.error('An error occurred during file upload:', error);
    return null;
  }
};
