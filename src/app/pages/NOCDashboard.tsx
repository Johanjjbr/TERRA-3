import { useState } from 'react';
import { Activity, Wifi, WifiOff, AlertTriangle, CheckCircle, TrendingUp, Users, Server } from 'lucide-react';

export function NOCDashboard() {
  const [stats] = useState({
    totalClients: 1247,
    online: 1189,
    offline: 58,
    alerts: 12,
    ftthActive: 856,
    wirelessActive: 333,
    avgLatency: 12.4,
    totalTraffic: 4523.5
  });

  const [recentAlerts] = useState([
    { id: '1', client: 'JOSE ALEXIS SALAZA', type: 'ONT Power Low', severity: 'warning', time: '5 min ago' },
    { id: '2', client: 'JORGE ALBERTO HERRERA', type: 'High Latency', severity: 'warning', time: '12 min ago' },
    { id: '3', client: 'LORENA CABRERA GO', type: 'Session Disconnect', severity: 'info', time: '25 min ago' }
  ]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-auto p-6">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-2">NOC Dashboard</h1>
          <p className="text-slate-300 text-sm">Network Operations Center • Monitoreo en Tiempo Real</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600 mb-1">Clientes Totales</div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalClients}</div>
              </div>
            </div>
            <div className="text-xs text-gray-600">Total de servicios activos</div>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600 mb-1">En Línea</div>
                <div className="text-3xl font-bold text-green-600">{stats.online}</div>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              {((stats.online / stats.totalClients) * 100).toFixed(1)}% de disponibilidad
            </div>
          </div>

          <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <WifiOff className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600 mb-1">Fuera de Línea</div>
                <div className="text-3xl font-bold text-red-600">{stats.offline}</div>
              </div>
            </div>
            <div className="text-xs text-gray-600">Requieren atención inmediata</div>
          </div>

          <div className="bg-white border border-yellow-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600 mb-1">Alertas Activas</div>
                <div className="text-3xl font-bold text-yellow-600">{stats.alerts}</div>
              </div>
            </div>
            <div className="text-xs text-gray-600">Eventos que requieren revisión</div>
          </div>
        </div>

        {/* Technology Distribution */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Distribución por Tecnología
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600 font-medium">FTTH / GPON</span>
                  <span className="text-sm font-bold text-blue-600">{stats.ftthActive} clientes</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${(stats.ftthActive / stats.online) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600 font-medium">Wireless / Antenas</span>
                  <span className="text-sm font-bold text-purple-600">{stats.wirelessActive} clientes</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                    style={{ width: `${(stats.wirelessActive / stats.online) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Métricas Globales
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-600 mb-2">Latencia Promedio</div>
                <div className="text-2xl font-bold text-green-600">{stats.avgLatency} ms</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-2">Tráfico Total</div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalTraffic} GB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            Alertas Recientes
          </h3>
          <div className="space-y-3">
            {recentAlerts.map(alert => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{alert.client}</div>
                    <div className="text-xs text-gray-600">{alert.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-600">{alert.time}</div>
                  <div className={`text-xs font-semibold ${
                    alert.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Acceso Rápido</h3>
          <div className="grid grid-cols-4 gap-3">
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Wifi className="w-4 h-4" />
              MONITOREO EQUIPOS
            </button>
            <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Server className="w-4 h-4" />
              CONFIGURACIÓN RED
            </button>
            <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              GESTIÓN API
            </button>
            <button className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs font-medium flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              VER ALERTAS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
