import { useState } from 'react';
import { APIConfig } from '../components/configuracion-red/APIConfig';
import { SmartOLTConfig } from '../components/configuracion-red/SmartOLTConfig';
import { DHCPRelayConfig } from '../components/configuracion-red/DHCPRelayConfig';
import { TR069Config } from '../components/configuracion-red/TR069Config';
import { BMUConfig } from '../components/configuracion-red/BMUConfig';
import { RutasBGPConfig } from '../components/configuracion-red/RutasBGPConfig';
import { MonitoreoConfig } from '../components/configuracion-red/MonitoreoConfig';

type TabKey = 'api' | 'monitoreo' | 'smart-olt' | 'dhcp-relay' | 'tr069' | 'bmu' | 'rutas-bgp';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'api', label: 'API' },
  { key: 'monitoreo', label: 'MONITOREO' },
  { key: 'smart-olt', label: 'SMART OLT' },
  { key: 'dhcp-relay', label: 'DHCP RELAY' },
  { key: 'tr069', label: 'TR-069' },
  { key: 'bmu', label: 'BMU' },
  { key: 'rutas-bgp', label: 'RUTAS BGP' },
];

export function ConfiguracionRed() {
  const [activeTab, setActiveTab] = useState<TabKey>('api');

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
      {/* Contenedor principal con fondo blanco */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded border border-gray-200 p-6 max-w-6xl">
          {/* Título */}
          <h1 className="text-sm font-semibold text-gray-900 mb-4">
            CONFIGURACIÓN DE RED
          </h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-xs font-medium pb-3 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido de las pestañas */}
          <div>
            {activeTab === 'api' && <APIConfig />}
            {activeTab === 'monitoreo' && <MonitoreoConfig />}
            {activeTab === 'smart-olt' && <SmartOLTConfig />}
            {activeTab === 'dhcp-relay' && <DHCPRelayConfig />}
            {activeTab === 'tr069' && <TR069Config />}
            {activeTab === 'bmu' && <BMUConfig />}
            {activeTab === 'rutas-bgp' && <RutasBGPConfig />}
          </div>
        </div>
      </div>
    </div>
  );
}
