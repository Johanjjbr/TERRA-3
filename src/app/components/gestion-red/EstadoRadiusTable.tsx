import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Database, Copy, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface RadiusEntry {
  id: string;
  usuario: string;
  ip: string;
  mac: string;
  sesionInicio: string;
  duracion: string;
  descargaMB: string;
  subidaMB: string;
  estado: 'Online' | 'Offline';
  nodo: string;
}

const radiusData: RadiusEntry[] = [
  {
    id: '1',
    usuario: 'usuario123',
    ip: '10.7.4.25',
    mac: 'C0:25:67:92:5D:64',
    sesionInicio: '18/03/2026 08:15:32',
    duracion: '10h 23m',
    descargaMB: '1,245.50',
    subidaMB: '325.80',
    estado: 'Online',
    nodo: 'HUAWEI1',
  },
  {
    id: '2',
    usuario: 'usuario456',
    ip: '10.7.4.32',
    mac: 'A4:12:34:56:78:90',
    sesionInicio: '18/03/2026 07:42:18',
    duracion: '10h 56m',
    descargaMB: '2,840.20',
    subidaMB: '520.15',
    estado: 'Online',
    nodo: 'HUAWEI2',
  },
  {
    id: '3',
    usuario: 'usuario789',
    ip: '10.7.5.18',
    mac: 'B8:27:EB:45:67:89',
    sesionInicio: '17/03/2026 22:30:45',
    duracion: '--',
    descargaMB: '0.00',
    subidaMB: '0.00',
    estado: 'Offline',
    nodo: 'HUAWEI1',
  },
  {
    id: '4',
    usuario: 'usuario101',
    ip: '10.7.6.42',
    mac: 'D4:5D:64:78:90:AB',
    sesionInicio: '18/03/2026 09:05:12',
    duracion: '9h 33m',
    descargaMB: '850.75',
    subidaMB: '180.40',
    estado: 'Online',
    nodo: 'HUAWEI1',
  },
];

export function EstadoRadiusTable() {
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [archivoRadius, setArchivoRadius] = useState('actual');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEntries(radiusData.map(e => e.id));
    } else {
      setSelectedEntries([]);
    }
  };

  const handleSelectEntry = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEntries([...selectedEntries, id]);
    } else {
      setSelectedEntries(selectedEntries.filter(eId => eId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Action buttons */}
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar Historial de IP
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Copy className="w-3.5 h-3.5" />
              Ver duplicados
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Monitor en vivo
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Recargar">
              <RefreshCw className="w-3.5 h-3.5 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Archivo selector */}
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-gray-500" />
              <select 
                value={archivoRadius}
                onChange={(e) => setArchivoRadius(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
              >
                <option value="actual">Archivo Actual</option>
                <option value="historico-marzo">Histórico - Marzo 2026</option>
                <option value="historico-febrero">Histórico - Febrero 2026</option>
                <option value="historico-enero">Histórico - Enero 2026</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por IP, MAC o usuario..."
              className="flex-1 text-xs outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-left w-10">
                <Checkbox 
                  checked={selectedEntries.length === radiusData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Usuario</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">IP</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">MAC</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Sesión Inicio</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Duración</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Descarga (MB)</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Subida (MB)</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nodo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {radiusData.map((entry) => (
              <tr 
                key={entry.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedEntries.includes(entry.id)}
                    onCheckedChange={(checked) => handleSelectEntry(entry.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-900 font-medium">{entry.usuario}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-mono text-xs">
                    {entry.ip}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700 font-mono text-xs">{entry.mac}</td>
                <td className="px-3 py-2 text-gray-700">{entry.sesionInicio}</td>
                <td className="px-3 py-2 text-gray-700">{entry.duracion}</td>
                <td className="px-3 py-2 text-gray-700 text-right font-medium">{entry.descargaMB}</td>
                <td className="px-3 py-2 text-gray-700 text-right font-medium">{entry.subidaMB}</td>
                <td className="px-3 py-2 text-gray-700">{entry.nodo}</td>
                <td className="px-3 py-2">
                  {entry.estado === 'Online' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">
                      Online
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs font-normal">
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
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al {radiusData.length} de {radiusData.length} registros
        </div>
      </div>
    </div>
  );
}
