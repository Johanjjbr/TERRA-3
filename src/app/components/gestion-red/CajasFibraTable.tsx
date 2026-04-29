import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Map, MapPin, Boxes, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface CajaFibra {
  id: string;
  codigo: string;
  ubicacion: string;
  tipo: string;
  puertos: number;
  puertosUsados: number;
  coordenadas: string;
  estado: 'Operativa' | 'Mantenimiento' | 'Fuera de servicio';
}

const cajasData: CajaFibra[] = [
  {
    id: '1',
    codigo: 'CF-CAU-001',
    ubicacion: 'Caucete - Barrio Centro Mz A C 15',
    tipo: 'NAP 16 Puertos',
    puertos: 16,
    puertosUsados: 14,
    coordenadas: '-31.665993, -68.279432',
    estado: 'Operativa',
  },
  {
    id: '2',
    codigo: 'CF-CAU-002',
    ubicacion: 'Caucete - Villa Colonial',
    tipo: 'NAP 8 Puertos',
    puertos: 8,
    puertosUsados: 8,
    coordenadas: '-31.670125, -68.285674',
    estado: 'Operativa',
  },
  {
    id: '3',
    codigo: 'CF-VF-001',
    ubicacion: 'Valle Fertil - Centro',
    tipo: 'NAP 32 Puertos',
    puertos: 32,
    puertosUsados: 0,
    coordenadas: '-30.633847, -67.469321',
    estado: 'Mantenimiento',
  },
  {
    id: '4',
    codigo: 'CF-CAU-003',
    ubicacion: 'Caucete - Los Médanos',
    tipo: 'NAP 16 Puertos',
    puertos: 16,
    puertosUsados: 12,
    coordenadas: '-31.651234, -68.298765',
    estado: 'Operativa',
  },
];

export function CajasFibraTable() {
  const [selectedCajas, setSelectedCajas] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCajas(cajasData.map(c => c.id));
    } else {
      setSelectedCajas([]);
    }
  };

  const handleSelectCaja = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCajas([...selectedCajas, id]);
    } else {
      setSelectedCajas(selectedCajas.filter(cId => cId !== id));
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'Operativa':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">Operativa</Badge>;
      case 'Mantenimiento':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs font-normal">Mantenimiento</Badge>;
      case 'Fuera de servicio':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">Fuera de servicio</Badge>;
      default:
        return null;
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
              Agregar Caja
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5" />
              Puertos FTTH
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5" />
              Mapa
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Geolocalizar cajas de fibra
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar
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
              placeholder="Buscar cajas de fibra..."
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
                  checked={selectedCajas.length === cajasData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Ubicación</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Puertos Totales</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Puertos Usados</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Disponibles</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Coordenadas</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {cajasData.map((caja) => {
              const disponibles = caja.puertos - caja.puertosUsados;
              const ocupacion = (caja.puertosUsados / caja.puertos) * 100;
              
              return (
                <tr 
                  key={caja.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2">
                    <Checkbox 
                      checked={selectedCajas.includes(caja.id)}
                      onCheckedChange={(checked) => handleSelectCaja(caja.id, checked as boolean)}
                    />
                  </td>
                  <td className="px-3 py-2 text-gray-900 font-medium">{caja.codigo}</td>
                  <td className="px-3 py-2 text-gray-700">{caja.ubicacion}</td>
                  <td className="px-3 py-2 text-gray-700">{caja.tipo}</td>
                  <td className="px-3 py-2 text-center text-gray-700 font-medium">{caja.puertos}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`font-medium ${ocupacion >= 80 ? 'text-red-600' : 'text-gray-700'}`}>
                      {caja.puertosUsados}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className={`font-medium ${disponibles === 0 ? 'text-red-600' : disponibles <= 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {disponibles}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-700 font-mono text-xs">{caja.coordenadas}</td>
                  <td className="px-3 py-2">{getEstadoBadge(caja.estado)}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Ver en mapa">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      </button>
                      <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Editar">
                        <Edit className="w-3.5 h-3.5 text-blue-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
          Registros del 1 al {cajasData.length} de {cajasData.length} registros
        </div>
      </div>
    </div>
  );
}
