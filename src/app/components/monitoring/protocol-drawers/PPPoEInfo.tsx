import { useState } from 'react';
import { Key, Clock, User, Server, BarChart3, WifiOff, RotateCcw, RefreshCw, FileText, CheckCircle } from 'lucide-react';

export function PPPoEInfo({ clientData }: { clientData: any }) {
  const [metrics] = useState({
    sessionActive: true,
    username: `${clientData.nombre.toLowerCase().replace(/\s/g, '')}@isp`,
    sessionId: 'a3f9b2c1d4e5',
    ipAssigned: '10.7.4.25',
    nasIdentifier: 'BRAS-01',
    macAddress: 'C0:25:67:92:5D:64',
    poolName: 'POOL-HOGAR-100M',
    sessionTime: '7d 14h 45m',
    lastConnection: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    reconnections: 3,
    uploadUsage: 45.2,
    downloadUsage: 187.5
  });

  const sessionHistory = [
    {
      id: '1',
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      duration: '7d 14h 45m',
      ip: '10.7.4.25',
      active: true
    },
    {
      id: '2',
      startTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      duration: '6d 8h 12m',
      disconnectReason: 'User Request',
      ip: '10.7.4.25',
      active: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Session Status */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-gray-900">Sesión PPPoE Activa</span>
        </div>
        <div className="text-xs text-gray-600">
          Tiempo de sesión: <span className="font-semibold text-gray-900">{metrics.sessionTime}</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Session ID: <span className="font-mono font-semibold">{metrics.sessionId}</span>
        </div>
      </div>

      {/* Connection Details */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Detalles de Conexión</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Usuario PPPoE</span>
            </div>
            <div className="text-xs font-mono font-semibold text-gray-900">{metrics.username}</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-600">NAS</span>
            </div>
            <div className="text-xs font-semibold text-gray-900">{metrics.nasIdentifier}</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">IP Asignada</span>
            </div>
            <div className="text-xs font-mono font-semibold text-gray-900">{metrics.ipAssigned}</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-xs text-gray-600">Pool IP</span>
            </div>
            <div className="text-xs font-semibold text-gray-900">{metrics.poolName}</div>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          Consumo de Datos (Sesión Actual)
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Upload</span>
              <span className="text-xs font-bold text-green-600">{metrics.uploadUsage.toFixed(2)} GB</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600" style={{ width: `${Math.min((metrics.uploadUsage / 100) * 100, 100)}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Download</span>
              <span className="text-xs font-bold text-blue-600">{metrics.downloadUsage.toFixed(2)} GB</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${Math.min((metrics.downloadUsage / 200) * 100, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Última Conexión</div>
          <div className="text-xs font-semibold text-gray-900">
            {metrics.lastConnection.toLocaleString('es-ES')}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Reconexiones</div>
          <div className="text-lg font-bold text-orange-600">{metrics.reconnections}</div>
        </div>
      </div>

      {/* History */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Historial de Sesiones</h3>
        <div className="space-y-2">
          {sessionHistory.map(session => (
            <div key={session.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold ${session.active ? 'text-green-600' : 'text-gray-600'}`}>
                  {session.active ? 'ACTIVA' : 'FINALIZADA'}
                </span>
                <span className="text-xs text-gray-600">{session.duration}</span>
              </div>
              <div className="text-xs text-gray-600">
                Inicio: {session.startTime.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </div>
              {session.disconnectReason && (
                <div className="text-xs text-gray-600 mt-1">
                  Motivo: {session.disconnectReason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Acciones</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-medium flex items-center justify-center gap-2">
            <WifiOff className="w-3 h-3" />
            DESCONECTAR
          </button>
          <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs font-medium flex items-center justify-center gap-2">
            <RotateCcw className="w-3 h-3" />
            RECONECTAR
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium flex items-center justify-center gap-2">
            <RefreshCw className="w-3 h-3" />
            RESET CONTADOR
          </button>
          <button className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs font-medium flex items-center justify-center gap-2">
            <FileText className="w-3 h-3" />
            VER LOGS PPP
          </button>
        </div>
      </div>
    </div>
  );
}
