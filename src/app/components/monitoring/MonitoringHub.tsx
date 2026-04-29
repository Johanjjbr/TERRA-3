import { useEffect, useState } from 'react';
import { AlertCircle, Loader2, Network } from 'lucide-react';
import { FTTHMonitor } from './modules/FTTHMonitor';
import { WirelessMonitor } from './modules/WirelessMonitor';
import { RouterMonitor } from './modules/RouterMonitor';

interface Connection {
  id: string;
  ip: string;
  codPlan: string;
  plan: string;
  nodo: string;
  numeroSerie: string;
  mac: string;
}

interface MonitoringHubProps {
  clientData: {
    id: string;
    nombre: string;
    codPlan: string;
    nodo: string;
    conexion: string;
  };
}

type EquipmentType = 'onu' | 'antena' | 'router' | 'unknown';
type Technology = 'huawei' | 'zte' | 'vsol' | 'motorola' | 'ubiquiti' | 'mikrotik' | 'generic';
type Protocol = 'pppoe' | 'dhcp' | 'static' | 'radius';

interface ServiceConfig {
  equipmentType: EquipmentType;
  technology: Technology;
  protocol: Protocol;
  vendor: string;
  model?: string;
  serial?: string;
  nodo: string;
}

export function MonitoringHub({ clientData }: MonitoringHubProps) {
  const [serviceConfig, setServiceConfig] = useState<ServiceConfig | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>('');

  // Mock de conexiones del cliente (en producción vendría de API)
  useEffect(() => {
    const mockConnections: Connection[] = [
      {
        id: '12348',
        ip: '10.7.4.25',
        codPlan: clientData.codPlan || '100HOGAP',
        plan: '100 MEGAS TU FIBRA',
        nodo: clientData.nodo || 'HUAWEI1',
        numeroSerie: 'HWTC12345678',
        mac: 'C0:25:67:92:5D:64'
      },
      {
        id: '12349',
        ip: '10.7.4.26',
        codPlan: 'WIRELESS-50MB',
        plan: '50 MEGAS WIRELESS',
        nodo: 'Mikrotik Torre Sur',
        numeroSerie: 'UB-LBE-5AC-G2',
        mac: 'A4:12:42:8F:1C:3D'
      }
    ];

    setConnections(mockConnections);
    if (mockConnections.length > 0) {
      setSelectedConnectionId(mockConnections[0].id);
    }
  }, [clientData]);

  useEffect(() => {
    if (selectedConnectionId) {
      detectServiceType();
    }
  }, [clientData, selectedConnectionId]);

  const detectServiceType = () => {
    setIsDetecting(true);

    setTimeout(() => {
      const selectedConnection = connections.find(c => c.id === selectedConnectionId);
      if (selectedConnection) {
        const config = autoDetectService(selectedConnection);
        setServiceConfig(config);
      }
      setIsDetecting(false);
    }, 500);
  };

  const autoDetectService = (connection: Connection): ServiceConfig => {
    const planLower = connection.codPlan.toLowerCase();
    const nodoLower = connection.nodo.toLowerCase();

    // 1. DETECTAR TIPO DE EQUIPO PRIMERO

    // DETECCIÓN ONU/ONT (Fibra óptica)
    if (
      planLower.includes('fibra') ||
      planLower.includes('hogar') ||
      planLower.includes('ftth') ||
      planLower.includes('gpon') ||
      nodoLower.includes('huawei') ||
      nodoLower.includes('olt') ||
      nodoLower.includes('zte') ||
      nodoLower.includes('vsol')
    ) {
      let technology: Technology = 'huawei';
      if (nodoLower.includes('zte')) technology = 'zte';
      if (nodoLower.includes('vsol')) technology = 'vsol';

      // 2. DETECTAR PROTOCOLO SECUNDARIAMENTE
      const protocol = detectProtocol(planLower, nodoLower);

      return {
        equipmentType: 'onu',
        technology,
        protocol,
        vendor: technology === 'huawei' ? 'Huawei' : technology === 'zte' ? 'ZTE' : 'V-SOL',
        nodo: connection.nodo,
        serial: connection.numeroSerie
      };
    }

    // DETECCIÓN ANTENA (Wireless)
    if (
      planLower.includes('wireless') ||
      planLower.includes('antena') ||
      planLower.includes('radio') ||
      planLower.includes('wisp') ||
      nodoLower.includes('mikrotik') ||
      nodoLower.includes('ubiquiti') ||
      nodoLower.includes('motorola') ||
      nodoLower.includes('torre') ||
      nodoLower.includes('sector')
    ) {
      let technology: Technology = 'ubiquiti';
      if (nodoLower.includes('mikrotik')) technology = 'mikrotik';
      if (nodoLower.includes('motorola')) technology = 'motorola';

      const protocol = detectProtocol(planLower, nodoLower);

      return {
        equipmentType: 'antena',
        technology,
        protocol,
        vendor: technology === 'ubiquiti' ? 'Ubiquiti' : technology === 'motorola' ? 'Motorola' : 'Mikrotik',
        nodo: connection.nodo,
        serial: connection.numeroSerie
      };
    }

    // DETECCIÓN ROUTER (CPE residencial)
    if (
      planLower.includes('router') ||
      planLower.includes('cpe') ||
      planLower.includes('hogar')
    ) {
      const protocol = detectProtocol(planLower, nodoLower);

      return {
        equipmentType: 'router',
        technology: 'generic',
        protocol,
        vendor: 'Router CPE',
        nodo: connection.nodo,
        serial: connection.numeroSerie
      };
    }

    // DEFAULT: Si no se detecta, asumir ONU con Huawei
    return {
      equipmentType: 'onu',
      technology: 'huawei',
      protocol: detectProtocol(planLower, nodoLower),
      vendor: 'Huawei',
      nodo: connection.nodo,
      serial: connection.numeroSerie
    };
  };

  const detectProtocol = (planLower: string, nodoLower: string): Protocol => {
    // Detectar protocolo de red según configuración
    if (planLower.includes('pppoe') || nodoLower.includes('pppoe') || nodoLower.includes('bras')) {
      return 'pppoe';
    }

    if (planLower.includes('dhcp') || nodoLower.includes('dhcp')) {
      return 'dhcp';
    }

    if (planLower.includes('static') || planLower.includes('estatica') || planLower.includes('ip fija')) {
      return 'static';
    }

    if (nodoLower.includes('radius')) {
      return 'radius';
    }

    // Default: DHCP para wireless, PPPoE para FTTH
    return 'dhcp';
  };

  const renderMonitoringModule = () => {
    if (!serviceConfig) return null;

    const selectedConnection = connections.find(c => c.id === selectedConnectionId);
    if (!selectedConnection) return null;

    const commonProps = {
      clientData,
      connectionData: selectedConnection,
      serviceConfig,
      onRefresh: detectServiceType
    };

    switch (serviceConfig.equipmentType) {
      case 'onu':
        return <FTTHMonitor {...commonProps} />;
      case 'antena':
        return <WirelessMonitor {...commonProps} />;
      case 'router':
        return <RouterMonitor {...commonProps} />;
      default:
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Equipo no reconocido
              </h3>
              <p className="text-xs text-gray-600">
                No se pudo determinar el tipo de equipo del cliente.
                <br />
                Plan: {selectedConnection.codPlan} • Nodo: {selectedConnection.nodo}
              </p>
            </div>
          </div>
        );
    }
  };

  if (isDetecting) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-600">Detectando equipo del cliente...</p>
        </div>
      </div>
    );
  }

  const getEquipmentLabel = () => {
    switch (serviceConfig?.equipmentType) {
      case 'onu': return 'ONU/ONT';
      case 'antena': return 'ANTENA';
      case 'router': return 'ROUTER';
      default: return 'DESCONOCIDO';
    }
  };

  const selectedConnection = connections.find(c => c.id === selectedConnectionId);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Connection Selector & Equipment Detection Banner */}
      {serviceConfig && selectedConnection && (
        <div className="bg-blue-600 text-white">
          {/* Connection Selector */}
          {connections.length > 1 && (
            <div className="px-6 py-3 border-b border-blue-500">
              <div className="flex items-center gap-3">
                <Network className="w-4 h-4" />
                <span className="text-xs font-semibold">SELECCIONAR CONEXIÓN:</span>
                <select
                  value={selectedConnectionId}
                  onChange={(e) => setSelectedConnectionId(e.target.value)}
                  className="px-3 py-1.5 bg-blue-700 text-white rounded text-xs font-medium border border-blue-500 outline-none hover:bg-blue-800 transition-colors"
                >
                  {connections.map((conn) => (
                    <option key={conn.id} value={conn.id}>
                      {conn.ip} - {conn.plan} ({conn.nodo})
                    </option>
                  ))}
                </select>
                <span className="text-xs text-blue-200">
                  {connections.length} conexiones activas
                </span>
              </div>
            </div>
          )}

          {/* Equipment Info */}
          <div className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <span className="font-semibold">EQUIPO:</span>
                <span className="px-2 py-1 bg-blue-700 rounded font-bold">{getEquipmentLabel()}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-blue-700 rounded">{serviceConfig.vendor}</span>
                <span>•</span>
                <span>Protocolo: <span className="font-semibold">{serviceConfig.protocol.toUpperCase()}</span></span>
                <span>•</span>
                <span className="font-mono">{selectedConnection.ip}</span>
              </div>
              <button
                onClick={detectServiceType}
                className="text-xs px-3 py-1 bg-blue-700 rounded hover:bg-blue-800 transition-colors"
              >
                Redetectar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Monitoring Module */}
      {renderMonitoringModule()}
    </div>
  );
}
