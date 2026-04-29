import { Shield, CheckCircle, XCircle, Clock, User, Server, FileText } from 'lucide-react';

export function RADIUSInfo({ clientData }: { clientData: any }) {
  const metrics = {
    authStatus: 'authenticated' as 'authenticated' | 'rejected',
    username: `${clientData.nombre.toLowerCase().replace(/\s/g, '')}@isp`,
    authCount: 156,
    rejectCount: 3,
    sessionTime: '7d 14h 45m',
    nasIdentifier: 'RADIUS-01',
    lastAuth: new Date(),
    accountingBytes: { in: 45230000000, out: 18750000000 }
  };

  return (
    <div className="space-y-6">
      {/* Auth Status */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-gray-900">Estado RADIUS</span>
        </div>
        <div className="text-lg font-bold text-green-600 uppercase">{metrics.authStatus}</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-xs text-gray-600">Autenticaciones</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.authCount}</div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-xs text-gray-600">Rechazos</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.rejectCount}</div>
        </div>
      </div>

      {/* Session Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">Información de Sesión</h3>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-gray-600">Usuario</span>
          </div>
          <div className="text-xs font-mono font-semibold text-gray-900">{metrics.username}</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-gray-600">NAS Identifier</span>
          </div>
          <div className="text-xs font-semibold text-gray-900">{metrics.nasIdentifier}</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-600">Tiempo de Sesión</span>
          </div>
          <div className="text-xs font-semibold text-gray-900">{metrics.sessionTime}</div>
        </div>
      </div>

      {/* Accounting */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">Accounting</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Bytes In</div>
            <div className="text-sm font-bold text-blue-600">
              {(metrics.accountingBytes.in / 1024 / 1024 / 1024).toFixed(2)} GB
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Bytes Out</div>
            <div className="text-sm font-bold text-green-600">
              {(metrics.accountingBytes.out / 1024 / 1024 / 1024).toFixed(2)} GB
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-xs text-gray-600 mb-1">Última Autenticación</div>
        <div className="text-xs font-semibold text-gray-900">
          {metrics.lastAuth.toLocaleString('es-ES')}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Acciones RADIUS</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-medium flex items-center justify-center gap-2">
            <XCircle className="w-3 h-3" />
            CORTAR SESIÓN
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            REAUTORIZAR
          </button>
          <button className="col-span-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs font-medium flex items-center justify-center gap-2">
            <FileText className="w-3 h-3" />
            VER LOGS RADIUS
          </button>
        </div>
      </div>
    </div>
  );
}
