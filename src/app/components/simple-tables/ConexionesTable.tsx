import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Conexion {
  id: string;
  cliente: string;
  ip: string;
  plan: string;
  nodo: string;
  secreto: string;
  mac: string;
  vencimiento: string;
  estadoRadius: 'Online' | 'Offline';
}

const conexionesData: Conexion[] = [
  {
    id: '1',
    cliente: 'JORGE ALBERTO HERRERA',
    ip: '10.7.4.25',
    plan: '100 MEGAS',
    nodo: 'HUAWEI1',
    secreto: 'usuario123',
    mac: 'C0:25:67:92:5D:64',
    vencimiento: 'Regular',
    estadoRadius: 'Online',
  },
  {
    id: '2',
    cliente: 'LORENA CABRERA GO',
    ip: '10.7.4.32',
    plan: '200 MEGAS',
    nodo: 'HUAWEI2',
    secreto: 'usuario456',
    mac: 'A4:12:34:56:78:90',
    vencimiento: 'Regular',
    estadoRadius: 'Online',
  },
  {
    id: '3',
    cliente: 'RODRIGO EDITH ERO',
    ip: '10.7.5.18',
    plan: '50 MEGAS',
    nodo: 'HUAWEI1',
    secreto: 'usuario789',
    mac: 'B8:27:EB:45:67:89',
    vencimiento: 'Vencido',
    estadoRadius: 'Offline',
  },
  {
    id: '4',
    cliente: 'JOSE ALEXIS SALAZA',
    ip: '10.7.6.42',
    plan: '100 MEGAS',
    nodo: 'HUAWEI3',
    secreto: 'usuario101',
    mac: 'D4:5D:64:78:90:AB',
    vencimiento: 'Regular',
    estadoRadius: 'Online',
  },
  {
    id: '5',
    cliente: 'JOSE ANTONIO SARD',
    ip: '10.7.7.55',
    plan: '150 MEGAS',
    nodo: 'HUAWEI2',
    secreto: 'usuario202',
    mac: 'E8:94:F6:12:34:CD',
    vencimiento: 'Regular',
    estadoRadius: 'Online',
  },
];

export function ConexionesTable() {
  const [selectedConexiones, setSelectedConexiones] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedConexiones(conexionesData.map(c => c.id));
    } else {
      setSelectedConexiones([]);
    }
  };

  const handleSelectConexion = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedConexiones([...selectedConexiones, id]);
    } else {
      setSelectedConexiones(selectedConexiones.filter(cId => cId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-screen">
      {/* Top Tab */}
      <div className="border-b border-gray-200 px-4 py-2 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Conexiones</span>
          <button className="p-0.5 hover:bg-gray-100 rounded transition-colors">
            <span className="text-gray-400 text-xs">✕</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-3 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Agregar
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar Excel
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Recargar">
              <RefreshCw className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conexiones..."
              className="flex-1 text-xs outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left w-12">
                <Checkbox 
                  checked={selectedConexiones.length === conexionesData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Cliente</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">IP</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Plan</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Nodo</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Secreto</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">MAC</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Vencimiento</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Estado Radius</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {conexionesData.map((conexion, index) => (
              <tr 
                key={conexion.id}
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-3">
                  <Checkbox 
                    checked={selectedConexiones.includes(conexion.id)}
                    onCheckedChange={(checked) => handleSelectConexion(conexion.id, checked as boolean)}
                  />
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">{conexion.cliente}</td>
                <td className="px-4 py-3">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {conexion.ip}
                  </a>
                </td>
                <td className="px-4 py-3 text-gray-700">{conexion.plan}</td>
                <td className="px-4 py-3 text-gray-700">{conexion.nodo}</td>
                <td className="px-4 py-3 text-gray-700">{conexion.secreto}</td>
                <td className="px-4 py-3 text-gray-700 font-mono text-xs">{conexion.mac}</td>
                <td className="px-4 py-3 text-gray-700">{conexion.vencimiento}</td>
                <td className="px-4 py-3">
                  {conexion.estadoRadius === 'Online' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">
                      Online
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">
                      Offline
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
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
          <span>registros por página</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            3
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Mostrando 1-{conexionesData.length} de {conexionesData.length} registros
        </div>
      </div>
    </div>
  );
}
