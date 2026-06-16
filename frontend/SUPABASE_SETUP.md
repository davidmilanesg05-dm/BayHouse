# Configuración de Supabase

Este proyecto utiliza Supabase como base de datos y almacenamiento de imágenes. Aquí te explico cómo configurarlo:

## Paso 1: Crear una cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com/)
2. Haz clic en "Start your project"
3. Inicia sesión con GitHub o tu email
4. Crea una nueva organización (si es la primera vez)

## Paso 2: Crear un proyecto nuevo

1. Haz clic en "New project"
2. Nombra tu proyecto (ej: "BayHouse")
3. Elige una contraseña segura para la base de datos (GUARDA ESTA CONTRASEÑA!)
4. Selecciona una región cercana a ti
5. Haz clic en "Create new project"
6. Espera a que el proyecto termine de crearse (puede tardar 1-2 minutos)

## Paso 3: Ejecutar el SQL para crear la tabla de propiedades

1. Una vez que el proyecto esté listo, ve a **SQL Editor** en el menú izquierdo
2. Haz clic en "New query"
3. Copia y pega el contenido del archivo `supabase-setup.sql` en el editor
4. Haz clic en "Run" para ejecutar el SQL
5. Deberías ver un mensaje de éxito confirmando que la tabla se creó correctamente

## Paso 4: Obtener tus credenciales de API

1. Ve a **Settings > API** en el menú izquierdo
2. En la sección "Project URL", copia la URL (será algo como `https://xxxxxxxx.supabase.co`)
3. En la sección "Project API keys", copia la "anon public" key

## Paso 5: Configurar las variables de entorno

1. En el directorio `frontend`, crea un archivo llamado `.env` (si no existe ya)
2. Abre el archivo y agrega tus credenciales:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-clave-publica-ano
```

**Importante**: Reemplaza los valores con tus credenciales reales obtenidas en el paso 4!

## Paso 6: Configurar el Storage para imágenes (opcional)

Si quieres almacenar imágenes directamente en Supabase en lugar de usar URLs externas:

1. Ve a **Storage** en el menú izquierdobh
2. Haz clic en "New bucket"
3. Nombra el bucket como `property-images`
4. Activa la opción "Public bucket"
5. Haz clic en "Create bucket"
6. Ve a **Policies** en la sección Storage y agrega políticas para permitir lectura y escritura (solo para desarrollo, en producción deberías restringir más)

## Paso 7: Probar la aplicación

1. Ejecuta el servidor de desarrollo con `npm run dev`
2. Ve a `/admin` para acceder al panel de administración
3. Inicia sesión con las credenciales:
   - Usuario: `david05`
   - Contraseña: `sanders74`
4. Agrega tu primera propiedad usando el botón "Nueva Venta"
5. Las propiedades que agregues se guardarán en la base de datos y serán visibles en `/propiedades`

## Notas importantes

- La autenticación del panel de admin es local (almacenada en localStorage del navegador). Para producción, deberías implementar una autenticación real con Supabase Auth.
- Por defecto, la tabla de propiedades tiene políticas de seguridad que permiten acceso público. Para producción, deberías restringir esto.
- Las imágenes por ahora se guardan como URLs externas. Si quieres implementar la subida de archivos a Supabase Storage, necesitarás agregar código adicional para la subida.
