## 📋 Descripción del Proyecto

Sistema completo de CRM/ERP para proveedores de Internet (ISP) con enfoque en monitoreo de red en tiempo real. Gestiona clientes, conexiones, equipos de red, facturación, inventario y tickets.

**Stack Tecnológico:**
- React 18 + TypeScript
- React Router v6
- Tailwind CSS v4
- Lucide Icons
- Mock data (pendiente integración con backend real)

---

## 🏗️ Arquitectura Principal

### Concepto Clave: Equipos vs Protocolos

**CRÍTICO:** Esta es la distinción arquitectónica más importante del sistema.

#### Equipos (Módulos Primarios)
Los equipos son dispositivos físicos del cliente:
- **ONU/ONT** → Equipos de fibra óptica (FTTH/GPON)
- **Antenas/CPE** → Equipos wireless (radio enlaces)
- **Routers** → CPE residenciales

#### Protocolos (Información Secundaria)
Los protocolos son métodos de autenticación/asignación de IP:
- **PPPoE** → Point-to-Point Protocol over Ethernet
- **DHCP** → Dynamic Host Configuration Protocol
- **Static IP** → IP estática configurada manualmente
- **RADIUS** → Remote Authentication Dial-In User Service

**Regla de Oro:**
- Los equipos son MÓDULOS independientes
- Los protocolos son INFORMACIÓN CONTEXTUAL dentro de las conexiones
- Nunca crear módulos separados para protocolos

---

## 📁 Estructura de Archivos

```
src/app/
├── App.tsx                          # Entrypoint principal
├── routes.tsx                       # Configuración de React Router
├── contexts/
│   └── TabsContext.tsx             # Gestión de tabs dinámicos
├── pages/
│   ├── MainWorkspace.tsx           # Workspace principal con tabs
│   ├── NOCDashboard.tsx            # Dashboard del NOC
│   └── ConfiguracionRed.tsx        # Configuración de red
├── components/
│   ├── monitoring/
│   │   ├── MonitoringHub.tsx       # Hub central de monitoreo
│   │   ├── modules/                # Módulos de EQUIPOS
│   │   │   ├── FTTHMonitor.tsx    # Monitor ONU/ONT
│   │   │   ├── WirelessMonitor.tsx # Monitor Antenas
│   │   │   └── RouterMonitor.tsx   # Monitor Routers
│   │   └── protocol-drawers/       # Información de PROTOCOLOS
│   │       ├── PPPoEInfo.tsx       # Info sesiones PPPoE
│   │       ├── DHCPInfo.tsx        # Info leases DHCP
│   │       ├── StaticIPInfo.tsx    # Info IP estática
│   │       └── RADIUSInfo.tsx      # Info autenticación RADIUS
│   ├── configuracion-red/
│   │   ├── APIConfig.tsx           # Gestión conexiones API
│   │   ├── MonitoreoConfig.tsx     # Monitoreo infraestructura
│   │   ├── SmartOLTConfig.tsx      # Config SmartOLT
│   │   ├── DHCPRelayConfig.tsx     # Config DHCP Relay
│   │   ├── TR069Config.tsx         # Config TR-069/GenieACS
│   │   ├── BMUConfig.tsx           # Config BMU
│   │   └── RutasBGPConfig.tsx      # Config rutas BGP
│   ├── ConnectionsTable.tsx        # Tabla de conexiones (con accordion)
│   ├── ClientsList.tsx             # Lista de clientes
│   └── ClientPanel.tsx             # Panel lateral de cliente
└── styles/
    ├── theme.css                   # Tokens CSS
    └── fonts.css                   # Fuentes
```

---

## 🔍 Conceptos del Dominio ISP

### Detección Automática de Servicios

El sistema auto-detecta el tipo de equipo y protocolo basándose en:

```typescript
// Algoritmo de detección (MonitoringHub.tsx)
const autoDetectService = (connection: Connection): ServiceConfig => {
  const planLower = connection.plan.toLowerCase();
  const nodoLower = connection.nodo.toLowerCase();
  
  // 1. Detectar EQUIPO primero
  if (planLower.includes('fibra') || nodoLower.includes('huawei') || nodoLower.includes('olt')) {
    return { equipmentType: 'onu', technology: 'huawei', protocol: detectProtocol(...) };
  }
  
  if (planLower.includes('wireless') || nodoLower.includes('mikrotik')) {
    return { equipmentType: 'antena', technology: 'ubiquiti', protocol: detectProtocol(...) };
  }
  
  if (planLower.includes('router')) {
    return { equipmentType: 'router', technology: 'generic', protocol: detectProtocol(...) };
  }
  
  // 2. Detectar PROTOCOLO segundo
  return { equipmentType: 'onu', technology: 'huawei', protocol: detectProtocol(...) };
};

const detectProtocol = (connection: Connection): Protocol => {
  if (connection.plan.includes('PPPoE')) return 'pppoe';
  if (connection.nodo.includes('DHCP')) return 'dhcp';
  if (connection.plan.includes('IP Fija')) return 'static';
  return 'dhcp'; // default
};
```

### Tecnologías por Tipo de Equipo

**FTTH/GPON (Fibra Óptica):**
- Fabricantes: Huawei, ZTE, V-SOL
- Métricas clave: RX Power (dBm), TX Power (dBm), Temperatura, Distancia, VLAN, PON
- API: SmartOLT, TR-069

**Wireless (Antenas):**
- Fabricantes: Ubiquiti, Motorola, Mikrotik
- Métricas clave: RSSI (dBm), CCQ (%), SNR (dB), Noise Floor, AirMax Quality
- API: Mikrotik RouterOS API, UISP/UNMS

**Routers (CPE):**
- Métricas clave: Estado WAN/WiFi, Clientes conectados, CPU, RAM, Temperatura
- API: TR-069/GenieACS, SNMP

### Múltiples Conexiones por Cliente

Los clientes pueden tener 1 o más conexiones (servicios):

```typescript
// Ejemplo de cliente con 2 conexiones
{
  id: 1,
  nombre: "JOSE ALEXIS SALAZA",
  connections: [
    { 
      id: "conn-1",
      ip: "10.7.4.25",
      plan: "100 MEGAS TU FIBRA",
      nodo: "HUAWEI1",
      protocol: "pppoe"
    },
    {
      id: "conn-2", 
      ip: "10.7.4.26",
      plan: "50 MEGAS WIRELESS",
      nodo: "Mikrotik Torre Sur",
      protocol: "dhcp"
    }
  ]
}
```

**MonitoringHub** incluye selector de conexión cuando `connections.length > 1`.

---

## 🎨 Patrones de UI

### Pattern 1: Accordion para Detalles de Protocolo

**IMPORTANTE:** Los detalles de protocolo NO se muestran en drawers/modals separados.

**Ubicación:** `ConnectionsTable.tsx`

```typescript
// Botón "VER DETALLES DE RED" expande accordion inline
{showProtocolDetails && (
  <tr className="bg-slate-50">
    <td colSpan={14}>
      <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
        {renderProtocolInfo(protocol)}
      </div>
    </td>
  </tr>
)}
```

### Pattern 2: Sistema de Tabs Dinámicos

**Ubicación:** `TabsContext.tsx`, `TopTabs.tsx`

Los tabs se crean dinámicamente al hacer clic en clientes, conexiones, etc.

```typescript
interface Tab {
  id: string;
  label: string;
  type: 'clientes-list' | 'client-detail' | 'conexiones-list' | 'crear-usuario';
  data?: any;
  clientData?: any;
}
```

### Pattern 3: Sub-navegación en Detalle de Cliente

**Ubicación:** `MainWorkspace.tsx`

Cuando se abre un cliente, aparece sub-navegación horizontal:
- REGISTROS, MONITOREO, CONEXIONES, TICKETS, HISTORIAL, GESTIÓN, etc.

---

## 🔌 Integraciones API Pendientes

### 1. SmartOLT API
```typescript
// Endpoint base: configurado en SmartOLTConfig
// Autenticación: OAuth2 (Client ID + Client Key)

// Endpoints necesarios:
GET  /api/v1/ont/{serial}/metrics        // Métricas ONU
POST /api/v1/ont/{serial}/reboot         // Reiniciar ONU
POST /api/v1/ont/{serial}/disable        // Deshabilitar ONU
GET  /api/v1/olt/{id}/status             // Estado OLT
```

### 2. Mikrotik RouterOS API
```typescript
// Autenticación: usuario/password configurado en APIConfig

// Endpoints necesarios:
/interface/wireless/monitor              // RSSI, CCQ, SNR
/queue/simple                            // Traffic shaping
/ip/dhcp-server/lease                    // DHCP leases
/ppp/active                              // Sesiones PPPoE
/system/reboot                           // Reiniciar
```

### 3. Ubiquiti UISP/UNMS API
```typescript
// Para equipos Ubiquiti

GET  /devices/{id}                       // Estado dispositivo
GET  /devices/{id}/statistics            // Métricas
POST /devices/{id}/restart               // Reiniciar
```

### 4. RADIUS/FreeRADIUS
```typescript
// Queries SQL directos a tablas radacct, radcheck, radreply

// Datos necesarios:
- radacct: accounting bytes, session time
- Disconnect-Message (CoA): desconectar sesiones
```

### 5. TR-069 (GenieACS)
```typescript
// Configurado en TR069Config

GET  /devices                            // Listar CPEs
GET  /devices/{id}/status                // Estado CPE
POST /devices/{id}/tasks                 // Ejecutar tareas
```

---

## 📊 Modelo de Datos

### Conexiones de Cliente
```typescript
interface Connection {
  id: string;
  clientId: number;
  ip: string;
  plan: string;              // "100 MEGAS TU FIBRA"
  nodo: string;              // "HUAWEI1" o "Mikrotik Torre Sur"
  protocol: 'pppoe' | 'dhcp' | 'static' | 'radius';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
}
```

### Métricas FTTH
```typescript
interface FTTHMetrics {
  rxPower: number;           // dBm (-30 a 0)
  txPower: number;           // dBm (0 a 10)
  temperature: number;       // °C
  distance: number;          // km
  vlan: number;
  pon: string;               // "PON 1/1/1"
  status: 'online' | 'offline' | 'los';
}
```

### Métricas Wireless
```typescript
interface WirelessMetrics {
  rssi: number;              // dBm (-90 a -30)
  ccq: number;               // % (0-100)
  snr: number;               // dB
  noiseFloor: number;        // dBm
  txRate: number;            // Mbps
  rxRate: number;            // Mbps
  signalQuality: 1 | 2 | 3 | 4 | 5;  // Barras de señal
}
```

### Sesión PPPoE
```typescript
interface PPPoESession {
  sessionId: string;
  username: string;
  ipAssigned: string;
  nasIdentifier: string;
  sessionTime: string;       // "7d 14h 45m"
  uploadUsage: number;       // GB
  downloadUsage: number;     // GB
  reconnections: number;
}
```

---

## 🚨 Errores Comunes a Evitar

### ❌ ERROR 1: Crear módulos para protocolos
```typescript
// ❌ INCORRECTO
<PPPoEMonitor />
<DHCPMonitor />

// ✅ CORRECTO
<FTTHMonitor />  // Equipo
<PPPoEInfo />    // Info de protocolo (dentro de ConnectionsTable)
```

### ❌ ERROR 2: Usar drawer/modal para detalles de protocolo
```typescript
// ❌ INCORRECTO
<Drawer open={showProtocol}>
  <PPPoEInfo />
</Drawer>

// ✅ CORRECTO - Accordion inline
{showProtocolDetails && (
  <tr>
    <td colSpan={14}>
      <PPPoEInfo />
    </td>
  </tr>
)}
```

### ❌ ERROR 3: No considerar múltiples conexiones
```typescript
// ❌ INCORRECTO - Asumir una sola conexión
const connection = client.connection;

// ✅ CORRECTO - Soportar múltiples
const connections = client.connections;
{connections.length > 1 && <ConnectionSelector />}
```

---

## 🎯 Convenciones de Código

### Nombres de Archivos
- Componentes: `PascalCase.tsx`
- Contextos: `UseCaseContext.tsx`
- Pages: `PascalCase.tsx`

### Importaciones
```typescript
// Orden de imports:
1. React/third-party
2. Componentes propios
3. Contextos
4. Types
5. Utils/helpers
```

### Estilos Tailwind
- Usar clases de Tailwind v4
- NO usar clases de font-size, font-weight, line-height a menos que el usuario lo pida
- Tokens CSS están en `/src/styles/theme.css`

### Mock Data
- Todos los datos actuales son mock
- Ubicar mock data al inicio del componente usando `useState`
- Preparar estructura para fácil reemplazo con API calls

---

## ✅ Checklist de Implementación

Cuando implementes nuevas funcionalidades, verifica:

- [ ] ¿Distingue correctamente entre Equipo y Protocolo?
- [ ] ¿Soporta múltiples conexiones por cliente?
- [ ] ¿Usa accordion en lugar de drawer/modal para protocolos?
- [ ] ¿Sigue la estructura de archivos establecida?
- [ ] ¿Usa mock data estructurado para fácil migración a API?
- [ ] ¿Incluye manejo de errores?
- [ ] ¿Considera que el protocolo es información secundaria?
- [ ] ¿Los botones de acción están preparados para llamadas API?

---

## 🔄 Estado Actual del Proyecto

### ✅ Completado
- Arquitectura base (Equipos vs Protocolos)
- UI de todos los módulos de monitoreo
- Sistema de tabs dinámicos
- Selector de conexiones múltiples
- Accordion para detalles de protocolo
- UI de configuración de red
- NOC Dashboard

### ⏳ Pendiente
- Integraciones API reales (SmartOLT, Mikrotik, RADIUS, etc.)
- Backend y base de datos
- WebSockets para tiempo real
- Sistema de alertas y notificaciones
- Gráficas históricas (Recharts)
- Implementación de acciones (reboot, disconnect, etc.)
- Persistencia de configuraciones
- Sistema de autenticación y permisos

---

## 📚 Referencias Técnicas

### APIs de ISP
- [SmartOLT API Docs](https://smartolt.com/api)
- [Mikrotik RouterOS API](https://help.mikrotik.com/docs/display/ROS/REST+API)
- [Ubiquiti UISP API](https://uisp.ui.com/api-docs)
- [GenieACS TR-069](https://genieacs.com/)

### Protocolos
- PPPoE: RFC 2516
- DHCP: RFC 2131
- RADIUS: RFC 2865

### Métricas FTTH
- RX Power óptimo: -8 a -27 dBm
- TX Power óptimo: +0.5 a +4 dBm
- Distancia máxima: 20 km (GPON)

### Métricas Wireless
- RSSI excelente: > -60 dBm
- RSSI bueno: -60 a -70 dBm
- RSSI regular: -70 a -80 dBm
- RSSI malo: < -80 dBm

---

## 🤝 Colaboración con IAs

### Al trabajar en este proyecto:

1. **LEE ESTE ARCHIVO PRIMERO** antes de hacer cambios
2. **PREGUNTA** si no estás seguro sobre Equipos vs Protocolos
3. **VERIFICA** que estás siguiendo los patrones establecidos
4. **DOCUMENTA** nuevas decisiones arquitectónicas aquí
5. **ACTUALIZA** este archivo cuando cambies algo fundamental

### Comandos útiles:
```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo (ya corriendo en el entorno)
# NO ejecutar: pnpm dev

# Build (NO ejecutar en este entorno)
# NO ejecutar: pnpm build
```

---

## 📝 Notas Finales

Este es un sistema complejo de ISP que requiere entender conceptos de networking. Si no estás familiarizado con GPON, PPPoE, RADIUS, etc., consulta las referencias técnicas o pregunta antes de implementar.

**Mantra del proyecto:**
> "Equipos son módulos, Protocolos son información"

---

**Última actualización:** 2026-04-29  
**Versión:** 1.0  
**Mantenido por:** Claude Code & Team
