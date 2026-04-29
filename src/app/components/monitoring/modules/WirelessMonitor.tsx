import { useState, useEffect } from 'react';
import {
  Radio,
  Signal,
  Activity,
  TrendingUp,
  TrendingDown,
  Wifi,
  WifiOff,
  RefreshCw,
  Power,
  Settings,
  BarChart3,
  AlertCircle
} from 'lucide-react';

interface WirelessMonitorProps {
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

interface WirelessMetrics {
  status: 'connected' | 'disconnected' | 'weak-signal';
  rssi: number;
  ccq: number;
  snr: number;
  noiseFloor: number;
  airMaxQuality: number;
  txRate: number;
  rxRate: number;
  frequency: number;
  channel: string;
  distance: number;
  linkCapacity: number;
  stability: number;
  uptime: string;
  reconnections: number;
  ipAddress: string;
  macAddress: string;
  model: string;
  firmware: string;
  lastSeen: Date;
}

const mockWirelessData: WirelessMetrics = {
  status: 'connected',
  rssi: -62,
  ccq: 95,
  snr: 38,
  noiseFloor: -100,
  airMaxQuality: 92,
  txRate: 100,
  rxRate: 100,
  frequency: 5800,
  channel: '116 (5580 MHz)',
  distance: 1.8,
  linkCapacity: 200,
  stability: 98,
  uptime: '7d 14h 45m',
  reconnections: 2,
  ipAddress: '10.7.4.25',
  macAddress: 'C0:25:67:92:5D:64',
  model: 'Ubiquiti LiteBeam 5AC Gen2',
  firmware: 'WA.v8.7.11',
  lastSeen: new Date()
};

export function WirelessMonitor({ clientData, connectionData, serviceConfig, onRefresh }: WirelessMonitorProps) {
  const [metrics, setMetrics] = useState<WirelessMetrics>({
    ...mockWirelessData,
    ipAddress: connectionData?.ip || mockWirelessData.ipAddress,
    macAddress: connectionData?.mac || mockWirelessData.macAddress,
    model: connectionData?.numeroSerie || mockWirelessData.model
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
      rssi: -62 + Math.floor(Math.random() * 8 - 4),
      ccq: 95 + Math.floor(Math.random() * 6 - 3),
      snr: 38 + Math.floor(Math.random() * 4 - 2),
      lastSeen: new Date()
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMetrics();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getSignalQuality = (rssi: number) => {
    if (rssi >= -60) return { text: 'Excelente', color: 'text-green-600', bg: 'bg-green-50', bars: 5 };
    if (rssi >= -70) return { text: 'Muy buena', color: 'text-blue-600', bg: 'bg-blue-50', bars: 4 };
    if (rssi >= -75) return { text: 'Buena', color: 'text-yellow-600', bg: 'bg-yellow-50', bars: 3 };
    if (rssi >= -80) return { text: 'Regular', color: 'text-orange-600', bg: 'bg-orange-50', bars: 2 };
    return { text: 'Mala', color: 'text-red-600', bg: 'bg-red-50', bars: 1 };
  };

  const signalQuality = getSignalQuality(metrics.rssi);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-700 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Wireless / Antena Monitoring</h2>
              <p className="text-sm text-purple-200">
                {serviceConfig.vendor} • {metrics.model}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-purple-200">Estado del Enlace</div>
                <div className="flex items-center gap-2 mt-1">
                  {metrics.status === 'connected' ? (
                    <Wifi className="w-5 h-5 text-green-400" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-400" />
                  )}
                  <span className="text-sm font-semibold uppercase">{metrics.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-purple-200">Auto:</label>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    autoRefresh ? 'bg-blue-500' : 'bg-purple-600'
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

        {/* Signal Metrics */}
        <div className="grid grid-cols-4 gap-6">
          {/* RSSI */}
          <div className={`${signalQuality.bg} border-2 ${signalQuality.color.replace('text-', 'border-')} rounded-lg p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${signalQuality.color} bg-white rounded-lg`}>
                  <Signal className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-medium">RSSI</div>
                  <div className={`text-xs ${signalQuality.color} font-semibold mt-0.5`}>{signalQuality.text}</div>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.rssi} dBm</div>
            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4, 5].map(bar => (
                <div
                  key={bar}
                  className={`flex-1 h-2 rounded ${
                    bar <= signalQuality.bars
                      ? signalQuality.color.replace('text-', 'bg-')
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CCQ */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 text-blue-600 bg-white rounded-lg">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-medium">CCQ (Client Connection Quality)</div>
                  <div className="text-xs text-blue-600 font-semibold mt-0.5">
                    {metrics.ccq >= 90 ? 'Excelente' : metrics.ccq >= 75 ? 'Bueno' : 'Regular'}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.ccq}%</div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                style={{ width: `${metrics.ccq}%` }}
              />
            </div>
          </div>

          {/* SNR */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 text-green-600 bg-white rounded-lg">
                  <Radio className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-medium">SNR (Signal to Noise)</div>
                  <div className="text-xs text-green-600 font-semibold mt-0.5">Óptimo</div>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.snr} dB</div>
            <div className="text-xs text-gray-600 mt-1">Ruido: {metrics.noiseFloor} dBm</div>
          </div>

          {/* AirMax Quality */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 text-purple-600 bg-white rounded-lg">
                  <Wifi className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-medium">AirMax Quality</div>
                  <div className="text-xs text-purple-600 font-semibold mt-0.5">Excelente</div>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.airMaxQuality}%</div>
            <div className="text-xs text-gray-600 mt-1">Capacidad: {metrics.linkCapacity} Mbps</div>
          </div>
        </div>

        {/* Connection Details */}
        <div className="grid grid-cols-2 gap-6">
          {/* Throughput */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Velocidad del Enlace (Queues Mikrotik)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-xs text-gray-600 font-medium">TX (Upload)</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metrics.txRate} Mbps</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    style={{ width: `${(metrics.txRate / 100) * 100}%` }}
                  />
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-blue-600" />
                  <span className="text-xs text-gray-600 font-medium">RX (Download)</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metrics.rxRate} Mbps</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${(metrics.rxRate / 100) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Connection Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Información de Conexión</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-600 mb-1">Dirección IP</div>
                <div className="text-sm font-mono font-semibold text-gray-900">{metrics.ipAddress}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">MAC Address</div>
                <div className="text-sm font-mono font-semibold text-gray-900">{metrics.macAddress}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Frecuencia</div>
                <div className="text-sm font-semibold text-gray-900">{metrics.frequency} MHz</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Canal</div>
                <div className="text-sm font-semibold text-gray-900">{metrics.channel}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Distancia</div>
                <div className="text-sm font-semibold text-gray-900">{metrics.distance} km</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Firmware</div>
                <div className="text-sm font-semibold text-gray-900">{metrics.firmware}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stability & Events */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Estabilidad del Enlace</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Estabilidad global</span>
                  <span className="text-sm font-semibold text-green-600">{metrics.stability}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    style={{ width: `${metrics.stability}%` }}
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
                <div className="text-xs text-gray-600 mb-1">Reconexiones</div>
                <div className="text-sm font-semibold text-orange-600">{metrics.reconnections}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Estado UISP / Mikrotik</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">Queue Activa</div>
                    <div className="text-xs text-gray-600">Simple Queue en Mikrotik</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-green-600">ACTIVA</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">UISP Monitor</div>
                    <div className="text-xs text-gray-600">Sincronizado con controlador</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-blue-600">OK</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Acciones del Equipo</h3>
          <div className="grid grid-cols-4 gap-3">
            <button className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Power className="w-4 h-4" />
              REINICIAR CPE
            </button>
            <button className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" />
              CAMBIAR CANAL
            </button>
            <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Radio className="w-4 h-4" />
              VER ESPECTRO
            </button>
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              DIAGNÓSTICO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
