import { useState } from 'react';
import { ChevronDown, ChevronRight, MoreVertical, Activity, Network } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { PPPoEInfo } from './monitoring/protocol-drawers/PPPoEInfo';
import { DHCPInfo } from './monitoring/protocol-drawers/DHCPInfo';
import { StaticIPInfo } from './monitoring/protocol-drawers/StaticIPInfo';
import { RADIUSInfo } from './monitoring/protocol-drawers/RADIUSInfo';

interface ConnectionData {
  id: string;
  ip: string;
  codPlan: string;
  plan: string;
  precioPlan: string;
  nodo: string;
  fechaInicio: string;
  ultimaMod: string;
  direccion: string;
  usuario: string;
  password: string;
  mac: string;
  ciudad: string;
  numeroSerie: string;
  protocol?: 'pppoe' | 'dhcp' | 'static' | 'radius';
}

const mockConnections: ConnectionData[] = [
  {
    id: '12348',
    ip: '10.7.4.25',
    codPlan: '10DHOGAP',
    plan: '100 MEGAS TU FIBRA...',
    precioPlan: '30.000,00',
    nodo: 'HUAWEI1',
    fechaInicio: '27/02/2024',
    ultimaMod: '18/11/2024',
    direccion: 'CAUCETE - BARRIO CO...',
    usuario: '',
    password: '',
    mac: 'C0:25:67:92:5D:64',
    ciudad: 'Caucete',
    numeroSerie: 'HWTC12345678',
    protocol: 'pppoe'
  },
  {
    id: '12349',
    ip: '10.7.4.26',
    codPlan: 'WIRELESS-50MB',
    plan: '50 MEGAS WIRELESS',
    precioPlan: '15.000,00',
    nodo: 'Mikrotik Torre Sur',
    fechaInicio: '15/03/2024',
    ultimaMod: '20/11/2024',
    direccion: 'CAUCETE - BARRIO CO...',
    usuario: '',
    password: '',
    mac: 'A4:12:42:8F:1C:3D',
    ciudad: 'Caucete',
    numeroSerie: 'UB-LBE-5AC-G2',
    protocol: 'dhcp'
  }
];

interface ConnectionsTableProps {
  onMonitorClick?: () => void;
  clientData?: any;
}

export function ConnectionsTable({ onMonitorClick, clientData }: ConnectionsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [protocolDetailsId, setProtocolDetailsId] = useState<string | null>(null);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  // Detectar protocolo basado en el plan/nodo
  const detectProtocol = (connection: ConnectionData): 'pppoe' | 'dhcp' | 'static' | 'radius' => {
    const planLower = connection.codPlan.toLowerCase();
    const nodoLower = connection.nodo.toLowerCase();

    if (planLower.includes('pppoe') || nodoLower.includes('pppoe') || nodoLower.includes('bras')) {
      return 'pppoe';
    }
    if (planLower.includes('dhcp') || nodoLower.includes('dhcp')) {
      return 'dhcp';
    }
    if (planLower.includes('static') || planLower.includes('estatica') || planLower.includes('fija')) {
      return 'static';
    }
    if (nodoLower.includes('radius')) {
      return 'radius';
    }
    // Default para FTTH: PPPoE, para otros: DHCP
    return nodoLower.includes('huawei') || nodoLower.includes('olt') || nodoLower.includes('zte') ? 'pppoe' : 'dhcp';
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleProtocolDetails = (id: string) => {
    setProtocolDetailsId(protocolDetailsId === id ? null : id);
  };

  const renderProtocolInfo = (protocol: 'pppoe' | 'dhcp' | 'static' | 'radius') => {
    switch (protocol) {
      case 'pppoe':
        return <PPPoEInfo clientData={clientData} />;
      case 'dhcp':
        return <DHCPInfo clientData={clientData} />;
      case 'static':
        return <StaticIPInfo clientData={clientData} />;
      case 'radius':
        return <RADIUSInfo clientData={clientData} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-left w-10">
                <Checkbox />
              </th>
              <th className="px-3 py-2 text-left w-10"></th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Id</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Ip</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Protocolo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Cod. Plan</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Plan</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Precio plan</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nodo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha de inicio</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Última mod.</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">MAC</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Número de serie</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {mockConnections.map((connection) => {
              const protocol = connection.protocol || detectProtocol(connection);
              const isExpanded = expandedId === connection.id;
              const showProtocolDetails = protocolDetailsId === connection.id;

              return (
                <>
                  <tr key={connection.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <Checkbox />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => toggleExpand(connection.id)}
                        className="hover:bg-gray-100 rounded p-0.5"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-gray-700">{connection.id}</td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-mono">
                        {connection.ip}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-semibold uppercase">
                        {protocol}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-700">{connection.codPlan}</td>
                    <td className="px-3 py-2 text-gray-700">{connection.plan}</td>
                    <td className="px-3 py-2 text-gray-700">{connection.precioPlan}</td>
                    <td className="px-3 py-2 text-gray-700">{connection.nodo}</td>
                    <td className="px-3 py-2 text-gray-700">{connection.fechaInicio}</td>
                    <td className="px-3 py-2 text-gray-700">{connection.ultimaMod}</td>
                    <td className="px-3 py-2">
                      <span className="text-gray-700 font-mono text-xs">
                        {connection.mac}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-700">{connection.numeroSerie}</td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => toggleProtocolDetails(connection.id)}
                        className={`px-3 py-1.5 rounded transition-colors text-xs font-medium inline-flex items-center gap-1 ${
                          showProtocolDetails
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        <Network className="w-3 h-3" />
                        {showProtocolDetails ? 'OCULTAR DETALLES' : 'VER DETALLES DE RED'}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row - Basic Info */}
                  {isExpanded && (
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td colSpan={14} className="px-3 py-4">
                        <div className="grid grid-cols-4 gap-4 max-w-4xl">
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Dirección</div>
                            <div className="text-xs font-semibold text-gray-900">{connection.direccion}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Ciudad</div>
                            <div className="text-xs font-semibold text-gray-900">{connection.ciudad}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Usuario</div>
                            <div className="text-xs font-mono font-semibold text-gray-900">{connection.usuario || '-'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Contraseña</div>
                            <div className="text-xs font-mono font-semibold text-gray-900">{connection.password || '-'}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Protocol Details Accordion */}
                  {showProtocolDetails && (
                    <tr className="bg-slate-50 border-b border-gray-200">
                      <td colSpan={14} className="px-6 py-6">
                        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 shadow-sm">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                            <h3 className="text-sm font-bold text-gray-900">
                              Detalles de Protocolo de Red: <span className="text-blue-600 uppercase">{protocol}</span>
                            </h3>
                            <span className="text-xs text-gray-600">
                              Conexión: {connection.ip} • {connection.plan}
                            </span>
                          </div>
                          {renderProtocolInfo(protocol)}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-t border-blue-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-blue-800">
            <Network className="w-4 h-4" />
            <span>Haz clic en "VER DETALLES DE RED" para expandir información técnica del protocolo de cada conexión</span>
          </div>
          {onMonitorClick && (
            <button
              onClick={onMonitorClick}
              className="text-xs text-blue-700 hover:text-blue-900 font-medium underline"
            >
              O ve a MONITOREO para ver el estado del equipo
            </button>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>Mostrar</span>
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>registros</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            &lt;
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            &gt;
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al {mockConnections.length} de {mockConnections.length} registros
        </div>
      </div>
    </div>
  );
}
