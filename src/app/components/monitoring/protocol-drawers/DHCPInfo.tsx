import { useState } from 'react';
import { Network, Clock, RefreshCw, Unlock, Lock, Shield, CheckCircle } from 'lucide-react';

export function DHCPInfo({ clientData }: { clientData: any }) {
  const [metrics] = useState({
    leaseActive: true,
    ipAssigned: '10.7.4.25',
    macAddress: 'C0:25:67:92:5D:64',
    hostname: `cliente-${clientData.codigo}`,
    leaseStart: new Date(Date.now() - 2 * 60 * 60 * 1000),
    leaseExpires: new Date(Date.now() + 22 * 60 * 60 * 1000),
    timeRemaining: '22h 15m',
    gateway: '10.7.4.1',
    dns1: '8.8.8.8',
    dns2: '8.8.4.4',
    subnet: '255.255.255.0',
    dhcpServer: 'DHCP-01 (Mikrotik)',
    renewalCount: 45,
    conflicts: 0,
    lastRenewal: new Date(Date.now() - 30 * 60 * 1000)
  });

  return (
    <div className="space-y-6">
      {/* Lease Status */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-gray-900">Lease DHCP Activo</span>
        </div>
        <div className="text-xs text-gray-600">
          Tiempo restante: <span className="font-semibold text-gray-900">{metrics.timeRemaining}</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Expira: {metrics.leaseExpires.toLocaleString('es-ES')}
        </div>
      </div>

      {/* Network Details */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Configuración de Red</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">IP Asignada</div>
            <div className="text-xs font-mono font-semibold text-gray-900">{metrics.ipAssigned}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Gateway</div>
            <div className="text-xs font-mono font-semibold text-gray-900">{metrics.gateway}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">MAC Address</div>
            <div className="text-xs font-mono font-semibold text-gray-900">{metrics.macAddress}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Hostname</div>
            <div className="text-xs font-semibold text-gray-900">{metrics.hostname}</div>
          </div>
        </div>
      </div>

      {/* DNS & Subnet */}
      <div className="space-y-2">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">DNS Primario</div>
          <div className="text-xs font-mono font-semibold text-gray-900">{metrics.dns1}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">DNS Secundario</div>
          <div className="text-xs font-mono font-semibold text-gray-900">{metrics.dns2}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Máscara de Subred</div>
          <div className="text-xs font-mono font-semibold text-gray-900">{metrics.subnet}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Servidor DHCP</div>
          <div className="text-xs font-semibold text-blue-600">{metrics.dhcpServer}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Renovaciones</div>
          <div className="text-2xl font-bold text-blue-600">{metrics.renewalCount}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Conflictos IP</div>
          <div className={`text-2xl font-bold ${metrics.conflicts > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {metrics.conflicts}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-xs text-gray-600 mb-1">Última Renovación</div>
        <div className="text-xs font-semibold text-gray-900">
          {metrics.lastRenewal.toLocaleString('es-ES')}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Acciones DHCP</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs font-medium flex items-center justify-center gap-2">
            <RefreshCw className="w-3 h-3" />
            RENOVAR LEASE
          </button>
          <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-medium flex items-center justify-center gap-2">
            <Unlock className="w-3 h-3" />
            LIBERAR IP
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            RESERVAR IP
          </button>
          <button className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-xs font-medium flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            BLOQUEAR MAC
          </button>
        </div>
      </div>
    </div>
  );
}
