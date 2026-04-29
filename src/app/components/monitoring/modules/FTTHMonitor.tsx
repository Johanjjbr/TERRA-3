import { useState, useEffect } from 'react';
import {
  Activity,
  TrendingDown,
  TrendingUp,
  Thermometer,
  Radio,
  Power,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Wifi,
  Signal,
  Clock
} from 'lucide-react';

interface FTTHMonitorProps {
  clientData: any;
  connectionData?: {
    id: string;
    ip: string;
    codPlan: string;
    plan: string;
    nodo: string;
    numeroSerie: string;
    mac: string;
  };
  serviceConfig: any;
  onRefresh: () => void;
}

interface ONTMetrics {
  status: 'online' | 'offline' | 'los' | 'dying-gasp';
  rxPower: number;
  txPower: number;
  distance: number;
  temperature: number;
  pon: string;
  slot: number;
  port: number;
  ontId: number;
  vlan: number;
  serial: string;
  model: string;
  uptime: string;
  losEvents: number;
  dbaProfile: string;
  lastSeen: Date;
  opticalQuality: number;
  microcutsLast24h: number;
}

const mockONTData: ONTMetrics = {
  status: 'online',
  rxPower: -21.3,
  txPower: 2.1,
  distance: 2.4,
  temperature: 43,
  pon: '0/1/2',
  slot: 0,
  port: 2,
  ontId: 15,
  vlan: 100,
  serial: 'HWTC12345678',
  model: 'Huawei HG8546M',
  uptime: '15d 8h 23m',
  losEvents: 3,
  dbaProfile: 'DBA-100M',
  lastSeen: new Date(),
  opticalQuality: 94,
  microcutsLast24h: 2
};

export function FTTHMonitor({ clientData, connectionData, serviceConfig, onRefresh }: FTTHMonitorProps) {
  const [metrics, setMetrics] = useState<ONTMetrics>({
    ...mockONTData,
    serial: connectionData?.numeroSerie || mockONTData.serial
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const refreshMetrics = () => {
    setMetrics(prev => ({
      ...prev,
      rxPower: -21.3 + (Math.random() * 2 - 1),
      txPower: 2.1 + (Math.random() * 0.4 - 0.2),
      temperature: 43 + Math.floor(Math.random() * 4 - 2),
      lastSeen: new Date()
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMetrics();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'los': return 'bg-yellow-500';
      case 'dying-gasp': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getRxPowerQuality = (power: number) => {
    if (power >= -23 && power <= -8) return { text: 'Óptima', color: 'text-green-600', bg: 'bg-green-50' };
    if (power >= -28 && power <= -5) return { text: 'Buena', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (power >= -30 && power <= -3) return { text: 'Aceptable', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: 'Crítica', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const rxQuality = getRxPowerQuality(metrics.rxPower);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">FTTH / GPON Monitoring</h2>
              <p className="text-sm text-slate-300">
                {serviceConfig.vendor} • PON {metrics.pon} • ONT ID {metrics.ontId}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-300">Estado ONT</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(metrics.status)} animate-pulse`}></span>
                  <span className="text-sm font-semibold uppercase">{metrics.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-300">Auto:</label>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    autoRefresh ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      autoRefresh ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Optical Power Metrics */}
        <div className="grid grid-cols-3 gap-6">
          {/* RX Power */}
          <div className={`${rxQuality.bg} border-2 ${rxQuality.color.replace('text-', 'border-')} rounded-lg p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${rxQuality.color} bg-white rounded-lg`}>
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-medium">Potencia RX (Recibida)</div>
                  <div className={`text-xs ${rxQuality.color} font-semibold mt-0.5`}>{rxQuality.text}</div>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.rxPower.toFixed(2)} dBm</div>
            <div className="text-xs text-gray-600">Rango óptimo: -23 a -8 dBm</div>
          </div>

          {/* TX Power */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 text-green-600 bg-white rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-medium">Potencia TX (Transmitida)</div>
                  <div className="text-xs text-green-600 font-semibold mt-0.5">Normal</div>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.txPower.toFixed(2)} dBm</div>
            <div className="text-xs text-gray-600">Salida de la ONT</div>
          </div>

          {/* Temperature */}
          <div className={`${metrics.temperature > 50 ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'} border-2 rounded-lg p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${metrics.temperature > 50 ? 'text-red-600' : 'text-blue-600'} bg-white rounded-lg`}>
                  <Thermometer className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-medium">Temperatura ONT</div>
                  <div className={`text-xs ${metrics.temperature > 50 ? 'text-red-600' : 'text-blue-600'} font-semibold mt-0.5`}>
                    {metrics.temperature > 50 ? 'Alerta' : 'Normal'}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.temperature}°C</div>
            <div className="text-xs text-gray-600">Máximo recomendado: 50°C</div>
          </div>
        </div>

        {/* ONT Details Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-gray-600 mb-2">Serial ONT</div>
            <div className="text-sm font-mono font-semibold text-gray-900">{metrics.serial}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-gray-600 mb-2">Modelo</div>
            <div className="text-sm font-semibold text-gray-900">{metrics.model}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-gray-600 mb-2">Distancia al OLT</div>
            <div className="text-sm font-semibold text-gray-900">{metrics.distance} km</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-gray-600 mb-2">VLAN</div>
            <div className="text-sm font-semibold text-gray-900">{metrics.vlan}</div>
          </div>
        </div>

        {/* PON Configuration */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600" />
            Configuración PON
          </h3>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <div className="text-xs text-gray-600 mb-1">PON Interface</div>
              <div className="text-sm font-semibold text-gray-900">{metrics.pon}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Slot</div>
              <div className="text-sm font-semibold text-gray-900">{metrics.slot}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Puerto</div>
              <div className="text-sm font-semibold text-gray-900">{metrics.port}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">ONT ID</div>
              <div className="text-sm font-semibold text-gray-900">{metrics.ontId}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">DBA Profile</div>
              <div className="text-sm font-semibold text-blue-600">{metrics.dbaProfile}</div>
            </div>
          </div>
        </div>

        {/* Quality & Events */}
        <div className="grid grid-cols-2 gap-6">
          {/* Optical Quality */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Calidad Óptica</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Calidad global</span>
                  <span className="text-sm font-semibold text-green-600">{metrics.opticalQuality}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                    style={{ width: `${metrics.opticalQuality}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
              <div>
                <div className="text-xs text-gray-600 mb-1">Uptime</div>
                <div className="text-sm font-semibold text-gray-900">{metrics.uptime}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Última conexión</div>
                <div className="text-sm font-semibold text-gray-900">
                  {metrics.lastSeen.toLocaleTimeString('es-ES')}
                </div>
              </div>
            </div>
          </div>

          {/* Events */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Eventos e Incidencias</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">Microcortes (24h)</div>
                    <div className="text-xs text-gray-600">Pérdidas breves de señal</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-yellow-600">{metrics.microcutsLast24h}</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">Eventos LOS</div>
                    <div className="text-xs text-gray-600">Pérdida total de señal</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-red-600">{metrics.losEvents}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Acciones del Equipo</h3>
          <div className="grid grid-cols-5 gap-3">
            <button className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Power className="w-4 h-4" />
              REBOOT ONT
            </button>
            <button className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" />
              DISABLE ONU
            </button>
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              REAUTORIZAR
            </button>
            <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              TEST ÓPTICO
            </button>
            <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              SPEED TEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
