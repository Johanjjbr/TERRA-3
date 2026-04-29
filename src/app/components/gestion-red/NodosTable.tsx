import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Map, ChevronLeft, ChevronRight, Edit, Trash2, Settings } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Nodo {
  id: string;
  nombre: string;
  ip: string;
  ubicacion: string;
  tipo: string;
  clientesActivos: number;
  estado: 'Activo' | 'Sin Conexión';
}

const nodosData: Nodo[] = [
  {
    id: '1',
    nombre: 'HUAWEI1',
    ip: '192.168.1.1',
    ubicacion: 'Caucete - Centro',
    tipo: 'OLT',
    clientesActivos: 245,
    estado: 'Activo',
  },
  {
    id: '2',
    nombre: 'HUAWEI2',
    ip: '192.168.1.2',
    ubicacion: 'Valle Fertil',
    tipo: 'OLT',
    clientesActivos: 180,
    estado: 'Activo',
  },
  {
    id: '3',
    nombre: 'MIKROTIK-CENTRAL',
    ip: '192.168.2.1',
    ubicacion: 'San Martin',
    tipo: 'Router',
    clientesActivos: 0,
    estado: 'Sin Conexión',
  },
  {
    id: '4',
    nombre: 'RADIUS Principal',
    ip: '10.0.0.1',
    ubicacion: 'Datacenter Principal',
    tipo: 'Radius Server',
    clientesActivos: 425,
    estado: 'Activo',
  },
];

export function NodosTable() {
  const [selectedNodos, setSelectedNodos] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNodos(nodosData.map(n => n.id));
    } else {
      setSelectedNodos([]);
    }
  };

  const handleSelectNodo = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedNodos([...selectedNodos, id]);
    } else {
      setSelectedNodos(selectedNodos.filter(nId => nId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Action buttons */}
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Agregar Nodo
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5" />
              Mapa
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Recargar">
              <RefreshCw className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Configuración">
              <Settings className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar nodos..."
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
                  checked={selectedNodos.length === nodosData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">IP</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Ubicación</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Clientes Activos</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {nodosData.map((nodo) => (
              <tr 
                key={nodo.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedNodos.includes(nodo.id)}
                    onCheckedChange={(checked) => handleSelectNodo(nodo.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-900 font-medium">{nodo.nombre}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    {nodo.ip}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{nodo.ubicacion}</td>
                <td className="px-3 py-2 text-gray-700">{nodo.tipo}</td>
                <td className="px-3 py-2 text-center text-gray-700 font-medium">{nodo.clientesActivos}</td>
                <td className="px-3 py-2">
                  {nodo.estado === 'Activo' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">
                      Activo
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">
                      Sin Conexión
                    </Badge>
                  )}
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Editar">
                      <Edit className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  </div>
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
          Registros del 1 al {nodosData.length} de {nodosData.length} registros
        </div>
      </div>
    </div>
  );
}
