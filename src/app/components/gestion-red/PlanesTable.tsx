import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Filter, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface Plan {
  id: string;
  nombre: string;
  codigo: string;
  velocidadBajada: string;
  velocidadSubida: string;
  precio: string;
  impuesto: string;
  precioFinal: string;
  tipo: string;
}

const planesData: Plan[] = [
  {
    id: '1',
    nombre: '100 MEGAS TU FIBRA HOGAR',
    codigo: '100HOGAP',
    velocidadBajada: '100 Mbps',
    velocidadSubida: '100 Mbps',
    precio: '25.000,00',
    impuesto: '5.250,00',
    precioFinal: '30.250,00',
    tipo: 'Residencial',
  },
  {
    id: '2',
    nombre: '200 MEGAS TU FIBRA HOGAR',
    codigo: '200HOGAP',
    velocidadBajada: '200 Mbps',
    velocidadSubida: '200 Mbps',
    precio: '35.000,00',
    impuesto: '7.350,00',
    precioFinal: '42.350,00',
    tipo: 'Residencial',
  },
  {
    id: '3',
    nombre: '50 MB con TV',
    codigo: '50MBTV',
    velocidadBajada: '50 Mbps',
    velocidadSubida: '50 Mbps',
    precio: '18.000,00',
    impuesto: '3.780,00',
    precioFinal: '21.780,00',
    tipo: 'Combo',
  },
  {
    id: '4',
    nombre: 'EMPRESARIAL 300',
    codigo: 'EMP300',
    velocidadBajada: '300 Mbps',
    velocidadSubida: '300 Mbps',
    precio: '55.000,00',
    impuesto: '11.550,00',
    precioFinal: '66.550,00',
    tipo: 'Empresarial',
  },
];

export function PlanesTable() {
  const [selectedPlanes, setSelectedPlanes] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [filterTipo, setFilterTipo] = useState('Todos');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPlanes(planesData.map(p => p.id));
    } else {
      setSelectedPlanes([]);
    }
  };

  const handleSelectPlan = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPlanes([...selectedPlanes, id]);
    } else {
      setSelectedPlanes(selectedPlanes.filter(pId => pId !== id));
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
              Agregar Plan
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Recargar">
              <RefreshCw className="w-3.5 h-3.5 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-500" />
              <select 
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
              >
                <option value="Todos">Todos los tipos</option>
                <option value="Residencial">Residencial</option>
                <option value="Empresarial">Empresarial</option>
                <option value="Combo">Combo</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar planes..."
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
                  checked={selectedPlanes.length === planesData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Velocidad Bajada</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Velocidad Subida</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Precio</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Impuestos</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Precio Final</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {planesData.map((plan) => (
              <tr 
                key={plan.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedPlanes.includes(plan.id)}
                    onCheckedChange={(checked) => handleSelectPlan(plan.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-700 font-medium">{plan.codigo}</td>
                <td className="px-3 py-2 text-gray-900">{plan.nombre}</td>
                <td className="px-3 py-2 text-gray-700">{plan.velocidadBajada}</td>
                <td className="px-3 py-2 text-gray-700">{plan.velocidadSubida}</td>
                <td className="px-3 py-2 text-gray-700 text-right">$ {plan.precio}</td>
                <td className="px-3 py-2 text-gray-700 text-right">$ {plan.impuesto}</td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">$ {plan.precioFinal}</td>
                <td className="px-3 py-2 text-gray-700">{plan.tipo}</td>
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
          Registros del 1 al {planesData.length} de {planesData.length} registros
        </div>
      </div>
    </div>
  );
}
