-- ==========================================
-- ESTRUCTURA LÓGICA DE BASE DE DATOS (LMS)
-- ==========================================

-- 1. ENUMS (Tipos de datos predefinidos)
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS content_type CASCADE;
DROP TYPE IF EXISTS course_status CASCADE;

CREATE TYPE user_role AS ENUM ('estudiante', 'instructor', 'admin');
CREATE TYPE task_status AS ENUM ('pendiente', 'en_proceso', 'completada', 'realizado');
CREATE TYPE content_type AS ENUM ('video', 'texto', 'cuestionario');
CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');

-- 2. GESTIÓN DE IDENTIDAD (Auth & Profiles unificado)
-- Esta tabla reemplaza a `estudiantes`, `instructores`, y `administrativos`
DROP TABLE IF EXISTS insignias CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS actividades CASCADE;
DROP TABLE IF EXISTS tareas CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL, -- Solo para instructores/admins
    role user_role NOT NULL DEFAULT 'estudiante',
    full_name TEXT NOT NULL,
    cedula TEXT UNIQUE NOT NULL, -- Unificando el identificador del proyecto
    zona TEXT,                   -- Utilizado previamente en instructores/admin
    correo TEXT UNIQUE,          -- Añadido para admin e instructores
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ESTRUCTURA ACADÉMICA TEÓRICA (Cursos, Lecciones)
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status course_status DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type content_type NOT NULL,
    sequence INT NOT NULL,
    content_payload JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. MATRICULACIÓN, TAREAS Y SEGUIMIENTO (Legacy & Teórico)

CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(student_id, course_id)
);

-- Tareas (Detectada en frontend: src/routes/pages/Instructores/components/CrearTareas.tsx)
CREATE TABLE tareas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tema TEXT NOT NULL,
    actividad TEXT NOT NULL,
    recursos TEXT[],
    fecha_inicio DATE,
    fecha_fin DATE,
    estado TEXT DEFAULT 'pendiente',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Actividades (Detectada en frontend: src/services/subirTarea.ts)
CREATE TABLE actividades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tema TEXT,
    actividad TEXT,
    recursos TEXT[],
    calificacion NUMERIC DEFAULT 0,
    estado TEXT DEFAULT 'pendiente',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Submissions (Entregas académicas)
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tarea_id UUID REFERENCES tareas(id) ON DELETE CASCADE,
    content TEXT,
    feedback TEXT,
    grade NUMERIC,
    submitted_at TIMESTAMPTZ DEFAULT now()
);

-- Insignias (Detectada en frontend: src/routes/pages/Instructores/components/CrearInsignias.tsx)
CREATE TABLE insignias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    student_group TEXT NOT NULL, -- Se podría cambiar a UUID de grupo/curso en el futuro
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. SEGURIDAD A NIVEL DE FILAS (RLS) - Ejemplos básicos
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles son visibles para todos" ON profiles FOR SELECT USING (true);
CREATE POLICY "Permitir inserción a usuarios autenticados" ON profiles FOR INSERT WITH CHECK (auth.uid() = auth_id);
CREATE POLICY "Usuarios editan su propio perfil" ON profiles FOR UPDATE USING (auth.uid() = auth_id);

ALTER TABLE tareas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de tareas" ON tareas FOR SELECT USING (true);
CREATE POLICY "Sólo instructores publican/modifican" ON tareas FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'instructor' OR role = 'admin'))
);

-- 6. GESTIÓN FINANCIERA (Finanzas Personales)
DROP TABLE IF EXISTS student_finances CASCADE;

CREATE TABLE student_finances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('ingreso', 'gasto', 'ahorro')),
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE student_finances ENABLE ROW LEVEL SECURITY;

-- Los estudiantes solo ven y gestionan sus propias finanzas
CREATE POLICY "Estudiantes gestionan sus propias finanzas" 
ON student_finances
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = student_id 
        AND auth_id = auth.uid()
    )
);
