# TERRA 3 - Fase 1: Backend Setup Guide

**Estado**: 🚀 Semana 1 - Setup Inicial

## ✅ Completado

- ✅ Cliente Supabase configurado (`src/lib/supabaseClient.ts`)
- ✅ Sistema de Autenticación con Context (`src/app/contexts/AuthContext.tsx`)
- ✅ Página de Login funcional (`src/app/pages/LoginPage.tsx`)
- ✅ Hooks para queries a BD (`src/app/hooks/useQueries.ts`)
- ✅ Rutas protegidas (`src/app/contexts/ProtectedRoute.tsx`)
- ✅ Schema PostgreSQL preparado (`supabase_schema.sql`)

## 📋 Pasos para Completar Semana 1

### 1️⃣ Crear Proyecto Supabase (5 min)

1. Ir a https://supabase.com
2. Haz clic en **"Sign Up"**
3. Usa email o GitHub para registrarte
4. Confirma tu email
5. En el dashboard, haz clic en **"+ New Project"**
   - Nombre: `terra-3-dev`
   - Contraseña PostgreSQL: Elige una segura (guárdala)
   - Región: `us-east-1` (o más cercana a ti)
6. **Espera 2-3 minutos** a que se inicialice

### 2️⃣ Obtener Credenciales (5 min)

Una vez que el proyecto esté listo:

1. En el dashboard de Supabase, ve a **Settings → API**
2. Copia los valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon (public) Key**: `eyJ...` (la clave larga)
3. Guarda estos valores

### 3️⃣ Configurar Variables de Entorno (2 min)

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza los placeholders:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
3. Guarda el archivo

### 4️⃣ Crear Schema de Base de Datos (5 min)

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Haz clic en **"New Query"**
3. Copia TODO el contenido del archivo `supabase_schema.sql` (desde la raíz del proyecto)
4. Pega en el SQL Editor
5. Haz clic en **"Run"** (botón azul abajo)
6. Espera a que terminen todas las queries (debe decir "Success")

### 5️⃣ Habilitar Auth con Contraseña (3 min)

1. En Supabase, ve a **Authentication → Providers**
2. Busca **Email** (debe estar habilitado)
3. Verifica que esté activado "Email" (default está bien)

### 6️⃣ Instalar Dependencias en React (2 min)

Abre un terminal en VS Code y ejecuta:

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-react
```

O si usas pnpm:

```bash
pnpm add @supabase/supabase-js @supabase/auth-helpers-react
```

### 7️⃣ Probar Login (5 min)

1. Inicia el servidor de desarrollo: `npm run dev` o `pnpm dev`
2. La app debería redirigirse a `/login`
3. **Crea una cuenta**:
   - Email: `test@example.com` (puede ser ficticio)
   - Contraseña: `Test1234!`
4. Si todo funciona, deberías ver el dashboard principal ✅

## 🧪 Testing Rápido

**¿Está funcionando?**
- [ ] Página de login aparece al abrir la app
- [ ] Puedo crear una cuenta
- [ ] Puedo iniciar sesión con esa cuenta
- [ ] Veo el dashboard después del login
- [ ] Si recargo la página, sigue autenticado (sesión persiste)
- [ ] Click en logout desconecta

## 🔐 Seguridad

**Credenciales en `.env.local`:**
- ✅ `.env.local` está en `.gitignore` (no se sube a Git)
- ✅ La clave `VITE_SUPABASE_ANON_KEY` es pública (diseño de Supabase)
- ✅ Las contraseñas de usuarios se encriptan en Supabase

**Lo que NO hacer:**
- ❌ No guardes tokens en localStorage (Supabase ya lo hace)
- ❌ No compartas las keys de Supabase en público
- ❌ No guardes credenciales de API en plain text (las encriptaremos en Semana 2)

## 📊 Base de Datos

Tablas creadas:
- `clients` — Clientes ISP
- `client_connections` — Conexiones de clientes
- `api_connections` — Credenciales de APIs (encriptadas)
- `equipment_metrics` — Histórico de métricas
- `alerts` — Sistema de alertas
- `configurations` — Configuraciones guardadas

Todas tienen **Row Level Security (RLS)** → Cada usuario ve solo sus datos.

## 🚨 Problemas Comunes

### "Error: Missing Supabase environment variables"
→ Verifica que `.env.local` tenga los valores correctos y que el servidor se reinició

### "Cannot create new project" en Supabase
→ Supabase free tier tiene límites. Si es error de crédito, usa otro email

### "PGRST116" al hacer queries
→ Normal, significa "no hay datos". Estamos en desarrollo, todavía no hay datos reales

## 📅 Próximos Pasos (Semana 2)

Una vez que Semana 1 esté ✅:
- [ ] Reemplazar mock data en `ClientsList` con datos reales de BD
- [ ] Crear Edge Functions para SmartOLT y Mikrotik APIs
- [ ] Conectar métricas reales de equipos

## 📞 Ayuda

Si algo no funciona:
1. Verifica en DevTools → Console si hay errores
2. Comprueba que variables `.env.local` sean exactas (sin espacios)
3. Verifica en Supabase Dashboard que el proyecto esté "Healthy"
4. Intenta desactivar VPN si es que estás usando una

---

**Versión**: 1.0 | **Fecha**: 29-04-2026 | **Fase**: 1 de 4
