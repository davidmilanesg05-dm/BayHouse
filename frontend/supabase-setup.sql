-- 1. Crear la tabla de propiedades
CREATE TABLE IF NOT EXISTS properties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    location TEXT NOT NULL,
    beds INTEGER NOT NULL DEFAULT 1,
    baths INTEGER NOT NULL DEFAULT 1,
    sqft INTEGER NOT NULL DEFAULT 0,
    floors INTEGER NOT NULL DEFAULT 1,
    garage BOOLEAN DEFAULT false,
    patio BOOLEAN DEFAULT false,
    terrace BOOLEAN DEFAULT false,
    cistern BOOLEAN DEFAULT false,
    special_circuit BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    main_image_url TEXT NOT NULL,
    other_image_urls TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de seguridad (para desarrollo)
-- Permitir lectura pública de propiedades
CREATE POLICY "Permitir lectura pública de propiedades"
ON properties
FOR SELECT
USING (true);

-- Permitir escritura pública de propiedades (SOLO PARA DESARROLLO!)
-- En producción, deberías cambiar esto a una política que solo permita a usuarios autenticados
CREATE POLICY "Permitir escritura pública de propiedades (temporal)"
ON properties
FOR ALL
USING (true)
WITH CHECK (true);

-- 4. Crear la función para actualizar la fecha de modificación
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Crear el trigger para actualizar automáticamente la fecha de modificación
CREATE OR REPLACE TRIGGER update_properties_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------------
-- NOTA: El Storage de Supabase se configura desde la interfaz web:
-- 1. Ve a Storage > New bucket
-- 2. Nombra el bucket como "property-images" y marcalo como Público
-- 3. Ve a Policies en Storage y agrega estas políticas (puedes usar el Editor SQL o la UI de Policies):
--
-- POLÍTICAS PARA STORAGE (copiar en la sección de Policies en Supabase Storage):
--
-- Para permitir lectura pública:
-- CREATE POLICY "Permitir lectura pública de imágenes"
-- ON storage.objects
-- FOR SELECT
-- USING (bucket_id = 'property-images');
--
-- Para permitir subida pública (solo para desarrollo!):
-- CREATE POLICY "Permitir subida pública de imágenes"
-- ON storage.objects
-- FOR INSERT
-- WITH CHECK (bucket_id = 'property-images');
--
-- Para permitir eliminación pública (solo para desarrollo!):
-- CREATE POLICY "Permitir eliminación pública de imágenes"
-- ON storage.objects
-- FOR DELETE
-- USING (bucket_id = 'property-images');
