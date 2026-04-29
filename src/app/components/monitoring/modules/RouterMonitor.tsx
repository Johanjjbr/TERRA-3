import { useState } from 'react';
import { Router, Wifi, Activity, Cpu, Thermometer, RefreshCw, Power, Users } from 'lucide-react';

interface RouterMonitorProps {
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

export function RouterMonitor({ clientData, serviceConfig, onRefresh }: RouterMonitorProps) {
  const [metrics] = useState({
    wanStatus: 'connected',
    wifiStatus: 'active',
    connectedClients: 8,
    cpuUsage: 45,
    memoryUsage: 62,
    temperature: 48,
    uptime: '25d 8h 12m',
    wanSpeed: 100,
    lanSpeed: 1000
  });

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Router Residencial Monitoring</h2>
              <p className="text-sm text-slate-200">CPE Management</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Router className="w-6 h-6 text-green-600" />
              <span className="text-xs text-gray-600 font-medium">Estado WAN</span>
            </div>
            <div className="text-xl font-bold text-gray-900 uppercase">{metrics.wanStatus}</div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Wifi className="w-6 h-6 text-blue-600" />
              <span className="text-xs text-gray-600 font-medium">Estado WiFi</span>
            </div>
            <div className="text-xl font-bold text-gray-900 uppercase">{metrics.wifiStatus}</div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-purple-600" />
              <span className="text-xs text-gray-600 font-medium">Clientes WiFi</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{metrics.connectedClients}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">CPU</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.cpuUsage}%</div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${metrics.cpuUsage}%` }} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">RAM</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.memoryUsage}%</div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-full bg-green-600 rounded-full" style={{ width: `${metrics.memoryUsage}%` }} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="w-4 h-4 text-orange-600" />
              <span className="text-xs text-gray-600">Temperatura</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.temperature}°C</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Acciones del Router</h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-medium flex items-center justify-center gap-2">
              <Power className="w-4 h-4" />
              REBOOT ROUTER
            </button>
            <button className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-xs font-medium flex items-center justify-center gap-2">
              <Wifi className="w-4 h-4" />
              RESET WIFI
            </button>
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              SPEED TEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
