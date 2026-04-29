import { Globe, MapPin, Terminal, BarChart3 } from 'lucide-react';

export function StaticIPInfo({ clientData }: { clientData: any }) {
  const metrics = {
    ipPublica: '200.123.45.10',
    gateway: '200.123.45.1',
    vlan: '200',
    subnet: '255.255.255.248',
    routes: ['0.0.0.0/0 via 200.123.45.1', '192.168.0.0/16 via 10.0.0.1'],
    trafficIn: 1245.5,
    trafficOut: 856.2
  };

  return (
    <div className="space-y-6">
      {/* IP Info */}
      <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-5 h-5 text-cyan-600" />
          <span className="text-sm font-semibold text-gray-900">IP Pública Estática</span>
        </div>
        <div className="text-2xl font-mono font-bold text-gray-900">{metrics.ipPublica}</div>
      </div>

      {/* Network Config */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Configuración de Red</h3>
        <div className="space-y-2">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Gateway</div>
            <div className="text-xs font-mono font-semibold text-gray-900">{metrics.gateway}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">VLAN</div>
            <div className="text-xs font-semibold text-gray-900">{metrics.vlan}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Máscara de Subred</div>
            <div className="text-xs font-mono font-semibold text-gray-900">{metrics.subnet}</div>
          </div>
        </div>
      </div>

      {/* Routes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Rutas Configuradas</h3>
        <div className="space-y-2">
          {metrics.routes.map((route, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs font-mono text-gray-900">{route}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          Tráfico
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Entrada</div>
            <div className="text-xl font-bold text-blue-600">{metrics.trafficIn} GB</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Salida</div>
            <div className="text-xl font-bold text-green-600">{metrics.trafficOut} GB</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Acciones</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium flex items-center justify-center gap-2">
            <Terminal className="w-3 h-3" />
            TRACEROUTE
          </button>
          <button className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs font-medium flex items-center justify-center gap-2">
            <MapPin className="w-3 h-3" />
            VER RUTAS
          </button>
        </div>
      </div>
    </div>
  );
}
