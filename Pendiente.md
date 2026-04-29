ANÁLISIS COMPLETO DEL SISTEMA
✅ LO QUE YA ESTÁ IMPLEMENTADO
Arquitectura Base:

Sistema de tabs dinámicos y navegación
Estructura modular correcta (Equipos como módulos primarios, Protocolos como información secundaria)
Sistema de detección automática de equipos y protocolos
Soporte para múltiples conexiones por cliente
UI completa con Tailwind v4
Módulos de Monitoreo (Equipos):

✅ FTTHMonitor - Métricas ONU/ONT (RX/TX power, temperatura, distancia)
✅ WirelessMonitor - Métricas de antenas (RSSI, CCQ, SNR)
✅ RouterMonitor - Estado de CPE residencial
✅ MonitoringHub - Hub central con selector de conexiones
Componentes de Protocolo:

✅ PPPoEInfo - Información de sesiones PPPoE
✅ DHCPInfo - Leases y configuración DHCP
✅ StaticIPInfo - Configuración IP estática
✅ RADIUSInfo - Autenticación y accounting
Configuración de Red:

✅ APIConfig - Gestión de conexiones a plataformas (UI completa)
✅ MonitoreoConfig - Monitoreo de infraestructura vía ping (UI completa)
✅ SmartOLTConfig - Formulario de configuración (UI básica)
✅ DHCPRelayConfig - Configuración DHCP Relay (UI completa)
✅ TR069Config - Configuración GenieACS (UI básica)
✅ BMUConfig - Configuración BMU (UI básica)
✅ RutasBGPConfig - Inyección de rutas BGP (UI básica)
Otras Vistas:

✅ NOCDashboard - Dashboard general del NOC
✅ ConnectionsTable - Tabla con accordion para detalles de protocolo
✅ ClientsList, ClientPanel - Gestión de clientes
❌ LO QUE FALTA IMPLEMENTAR
1. INTEGRACIONES DE API (CRÍTICO - Todo es mock data)
SmartOLT API:

// Necesitas implementar:
- Autenticación OAuth2 con Client ID/Key
- GET /api/v1/ont/{serial} - Obtener métricas de ONU
- POST /api/v1/ont/{serial}/reboot - Reiniciar ONU
- GET /api/v1/olt/{id}/status - Estado del OLT
- Métricas: RX/TX power, temperatura, distancia, VLAN, PON
Mikrotik RouterOS API:

// Necesitas implementar:
- Conexión vía API REST o RouterOS API
- /interface/wireless/monitor - RSSI, CCQ, SNR
- /queue/simple - Traffic shaping, TX/RX rates
- /ip/dhcp-server/lease - Leases DHCP activos
- /ppp/active - Sesiones PPPoE activas
- /tool/ping - Diagnósticos
- /system/reboot - Reiniciar equipos
Ubiquiti UISP/UNMS API:

// Para equipos Ubiquiti wireless:
- GET /devices/{id} - Estado del dispositivo
- GET /devices/{id}/statistics - Métricas wireless
- POST /devices/{id}/restart - Reiniciar
RADIUS/FreeRADIUS:

// Integración con servidor RADIUS:
- Queries a radacct table - Accounting data
- Queries a radcheck/radreply - Configuración de usuarios
- Disconnect-Message (CoA) - Desconectar sesiones
- Accounting bytes In/Out
TR-069 (GenieACS):

// Para equipos V-SOL y otros CPEs:
- GET /devices - Listar dispositivos
- GET /devices/{id}/status - Estado del dispositivo
- POST /devices/{id}/tasks - Ejecutar tareas
Monitoreo ICMP:

// El MonitoreoConfig necesita backend real:
- Ping automático cada X segundos
- Almacenar histórico de latencia/uptime
- Alertas cuando equipo cae
- WebSocket para updates en tiempo real
2. BACKEND Y BASE DE DATOS
Faltan modelos de datos:

-- Tabla de conexiones de clientes
CREATE TABLE client_connections (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  ip_address VARCHAR(15),
  plan_name VARCHAR(100),
  node_name VARCHAR(100),
  protocol VARCHAR(20), -- 'pppoe', 'dhcp', 'static', 'radius'
  equipment_type VARCHAR(20), -- 'onu', 'antena', 'router'
  technology VARCHAR(50), -- 'huawei', 'mikrotik', 'ubiquiti'
  status VARCHAR(20),
  created_at TIMESTAMP
);

-- Tabla de métricas históricas
CREATE TABLE metrics_history (
  id SERIAL PRIMARY KEY,
  connection_id INT REFERENCES client_connections(id),
  timestamp TIMESTAMP,
  rx_power FLOAT,
  tx_power FLOAT,
  rssi INT,
  ccq INT,
  latency INT,
  traffic_in BIGINT,
  traffic_out BIGINT
);

-- Tabla de equipos de infraestructura
CREATE TABLE infrastructure_equipment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(50), -- 'router', 'switch', 'olt', 'antenna', 'server'
  ip_address VARCHAR(15),
  status VARCHAR(20),
  last_check TIMESTAMP,
  uptime INT
);

-- Tabla de configuraciones API
CREATE TABLE api_connections (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(50), -- 'smartolt', 'mikrotik', 'ubiquiti'
  name VARCHAR(100),
  host VARCHAR(255),
  port INT,
  username VARCHAR(100),
  password VARCHAR(255), -- ENCRIPTADO
  api_key VARCHAR(255),
  use_ssl BOOLEAN,
  enabled BOOLEAN
);

-- Tabla de alertas
CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  connection_id INT REFERENCES client_connections(id),
  type VARCHAR(50), -- 'ont_power_low', 'high_latency', 'disconnect'
  severity VARCHAR(20), -- 'info', 'warning', 'critical'
  message TEXT,
  created_at TIMESTAMP,
  resolved BOOLEAN DEFAULT false
);
3. FUNCIONALIDADES EN TIEMPO REAL
WebSockets para:

Actualización automática de métricas de monitoreo
Notificaciones de alertas en tiempo real
Estado de equipos de infraestructura
Cambios en sesiones PPPoE/DHCP
Ejemplo de implementación necesaria:

// Conexión WebSocket para updates
const ws = new WebSocket('ws://api.tuisp.com/realtime');
ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Actualizar state de métricas
};
4. ACCIONES DE EQUIPOS (Botones no funcionales)
Acciones FTTH que necesitan implementarse:

REINICIAR ONU → API call a SmartOLT
DESHABILITAR ONU → API call a SmartOLT
REAUTORIZAR → Forzar reauth en OLT
PRUEBA ÓPTICA → Ejecutar test óptico
SPEED TEST → Iniciar test de velocidad
Acciones Wireless:

REINICIAR CPE → Mikrotik API reboot
CAMBIAR CANAL → Cambiar frecuencia wireless
VER ESPECTRO → Spectrum analyzer
DIAGNÓSTICOS → Ping test, traceroute
Acciones PPPoE:

DESCONECTAR → RADIUS Disconnect-Message
RECONECTAR → Force PPP renegotiation
RESET CONTADOR → Reset accounting bytes
VER LOGS PPP → Consultar logs del NAS
Acciones DHCP:

RENOVAR LEASE → Forzar renewal
LIBERAR IP → Release lease
RESERVAR IP → Crear reserva estática
BLOQUEAR MAC → Blacklist MAC address
5. GRÁFICAS Y VISUALIZACIÓN
Falta integración de Recharts:

// Gráficas históricas necesarias:
- Traffic In/Out en el tiempo
- Latencia histórica
- RX/TX power trends (FTTH)
- RSSI/CCQ trends (Wireless)
- Uptime de equipos de infraestructura
Ejemplo de implementación:

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Mostrar trend de señal RX en últimas 24h
<LineChart data={historicalData}>
  <Line type="monotone" dataKey="rx_power" stroke="#8884d8" />
  <XAxis dataKey="timestamp" />
  <YAxis />
</LineChart>
6. SISTEMA DE ALERTAS Y NOTIFICACIONES
Componentes faltantes:

Panel de alertas activas
Configuración de umbrales de alerta:
interface AlertThreshold {
  metric: 'rx_power' | 'rssi' | 'latency';
  condition: '>' | '<' | '>=';
  value: number;
  severity: 'info' | 'warning' | 'critical';
}
Sistema de notificaciones (push, email, SMS)
Historial de alertas resueltas
Escalamiento de incidentes
7. PERSISTENCIA DE CONFIGURACIONES
Las configuraciones NO se guardan:

SmartOLTConfig → Guardar en backend
DHCPRelayConfig → Guardar en backend
TR069Config → Guardar en backend
BMUConfig → Guardar en backend
RutasBGPConfig → Guardar en backend
APIConfig → Guardar conexiones API (encriptadas)
MonitoreoConfig → Guardar equipos a monitorear
Necesitas endpoints:

POST /api/config/smartolt
GET  /api/config/smartolt
PUT  /api/config/smartolt
// Repetir para cada módulo
📊 DATOS QUE FALTAN
Datos reales de clientes → Actualmente todo es mock
Conexiones reales desde DB → No hay query a base de datos
Métricas de equipos en tiempo real → Todo hardcoded
Histórico de métricas → No hay almacenamiento
Configuraciones guardadas → Formularios no persisten
Credenciales API → No hay storage seguro
Usuarios y permisos → Falta sistema de auth
Logs de eventos → No hay registro de acciones
🔧 MÓDULOS PENDIENTES DE COMPLETAR
Módulo	Estado	Falta
SmartOLTConfig	UI básica	Backend, integración API real
DHCPRelayConfig	UI completa	Backend, aplicar config a nodos
TR069Config	UI básica	Backend, integración GenieACS
BMUConfig	UI básica	Backend, integración BMU
RutasBGPConfig	UI básica	Backend, inyectar rutas a routers BGP
MonitoreoConfig	UI completa	Backend real con ping, WebSocket updates
APIConfig	UI completa	Backend, storage encriptado de credenciales
FTTHMonitor	UI completa	API SmartOLT real, acciones funcionales
WirelessMonitor	UI completa	API Mikrotik real, acciones funcionales
RouterMonitor	UI completa	API TR-069/SNMP real, acciones funcionales
Protocol Drawers	UI completa	Datos reales desde RADIUS/Mikrotik/NAS
NOCDashboard	UI completa	Datos reales, gráficas, alertas en tiempo real
🎯 PRIORIDADES DE IMPLEMENTACIÓN
FASE 1 - Backend Crítico:

Crear base de datos con esquemas
API REST para conexiones de clientes
Integración SmartOLT API (FTTH)
Integración Mikrotik API (Wireless + DHCP + PPPoE)
FASE 2 - Funcionalidades Core: 5. Sistema de almacenamiento de métricas históricas 6. WebSocket para updates en tiempo real 7. Implementar acciones de equipos (reboot, disconnect, etc.) 8. Sistema de alertas y notificaciones

FASE 3 - Mejoras: 9. Gráficas históricas con Recharts 10. Speed test integration 11. Optical diagnostics 12. Spectrum analyzer

FASE 4 - Configuraciones: 13. Persistencia de todas las configuraciones 14. Storage seguro de credenciales API 15. Integración TR-069, BMU, BGP

¿En cuál de estas fases quieres que comience a trabajar?