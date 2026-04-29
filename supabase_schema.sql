-- ============================================================
-- TERRA 3 - Database Schema para Supabase PostgreSQL
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Tabla de Clientes
CREATE TABLE clients (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  ciudad VARCHAR(100),
  estado VARCHAR(50),
  activo BOOLEAN DEFAULT true,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tabla de Conexiones de Cliente
CREATE TABLE client_connections (
  id BIGSERIAL PRIMARY KEY,
  client_id BIGINT REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  ip_address INET,
  plan VARCHAR(100),
  nodo VARCHAR(100),
  serial_number VARCHAR(100),
  mac_address MACADDR,
  protocol VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Tabla de Credenciales API (ENCRIPTADAS)
CREATE TABLE api_connections (
  id BIGSERIAL PRIMARY KEY,
  platform VARCHAR(50),
  name VARCHAR(100),
  host VARCHAR(255),
  port INT,
  username VARCHAR(100),
  password_encrypted TEXT,
  api_key_encrypted TEXT,
  use_ssl BOOLEAN DEFAULT true,
  enabled BOOLEAN DEFAULT true,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Tabla de Métricas de Equipos (Histórico)
CREATE TABLE equipment_metrics (
  id BIGSERIAL PRIMARY KEY,
  connection_id BIGINT REFERENCES client_connections(id) ON DELETE CASCADE NOT NULL,
  equipment_type VARCHAR(20),
  metric_type VARCHAR(50),
  value FLOAT,
  unit VARCHAR(20),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- 5. Tabla de Alertas
CREATE TABLE alerts (
  id BIGSERIAL PRIMARY KEY,
  connection_id BIGINT REFERENCES client_connections(id) ON DELETE CASCADE,
  alert_type VARCHAR(50),
  severity VARCHAR(20),
  message TEXT,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- 6. Tabla de Configuraciones Guardadas
CREATE TABLE configurations (
  id BIGSERIAL PRIMARY KEY,
  config_key VARCHAR(100) NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS) - Seguridad
-- ============================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE configurations ENABLE ROW LEVEL SECURITY;

-- Políticas: Los usuarios solo ven sus propios datos

CREATE POLICY "Usuarios ven sus propios clientes"
ON clients FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios crean clientes para sí mismos"
ON clients FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios actualizan sus propios clientes"
ON clients FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Las conexiones son visibles si el cliente pertenece al usuario"
ON client_connections FOR SELECT
USING (
  client_id IN (
    SELECT id FROM clients WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Las métricas son visibles si la conexión pertenece al usuario"
ON equipment_metrics FOR SELECT
USING (
  connection_id IN (
    SELECT id FROM client_connections 
    WHERE client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Las alertas son visibles si la conexión pertenece al usuario"
ON alerts FOR SELECT
USING (
  connection_id IN (
    SELECT id FROM client_connections 
    WHERE client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Usuarios ven sus propias conexiones API"
ON api_connections FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios crean conexiones API para sí mismos"
ON api_connections FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios actualizan sus propias conexiones API"
ON api_connections FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios ven sus propias configuraciones"
ON configurations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios crean configuraciones para sí mismos"
ON configurations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios actualizan sus propias configuraciones"
ON configurations FOR UPDATE
USING (auth.uid() = user_id);

-- ============================================================
-- Índices para Performance
-- ============================================================

CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_connections_client_id ON client_connections(client_id);
CREATE INDEX idx_metrics_connection_id ON equipment_metrics(connection_id);
CREATE INDEX idx_metrics_timestamp ON equipment_metrics(timestamp DESC);
CREATE INDEX idx_alerts_connection_id ON alerts(connection_id);
CREATE INDEX idx_alerts_resolved ON alerts(resolved);
CREATE INDEX idx_api_connections_user_id ON api_connections(user_id);

-- ============================================================
-- Datos de Prueba (OPCIONAL - Para desarrollo)
-- ============================================================

-- Descomenta esto si quieres datos de prueba iniciales
-- INSERT INTO clients (nombre, email, phone, user_id) 
-- VALUES ('Cliente Test', 'test@example.com', '1234567890', (SELECT id FROM auth.users LIMIT 1));
