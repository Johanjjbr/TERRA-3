import { useState } from 'react';
import { Plus, Save, Tag, Trash2, Filter, Search, ChevronLeft, ChevronRight, Edit, MoreVertical } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface Equipo {
  id: string;
  mac: string;
  ubicacion: string;
  estado: string;
  numeroSerie: string;
  eliminado: string;
  numeroSerieOriginal: string;
}

const equiposData: Equipo[] = [
  {
    id: '1',
    mac: '30:16:9d:a6:97:21',
    ubicacion: '(Cliente) PABLO RAUL PEÑALOZA',
    estado: 'En uso',
    numeroSerie: '',
    eliminado: 'No',
    numeroSerieOriginal: '',
  },
  {
    id: '2',
    mac: '00:00:00:00:00:00',
    ubicacion: '(Cliente) ANTONIO ROBERTO MUÑOZ',
    estado: 'En uso',
    numeroSerie: 'ZTEGC664B249',
    eliminado: 'No',
    numeroSerieOriginal: '',
  },
  {
    id: '3',
    mac: '00:00:00:00:00:00',
    ubicacion: '(Depósito) Terra 3 Comunicaciones',
    estado: 'Stock',
    numeroSerie: 'HWTC26FF4C1E',
    eliminado: 'No',
    numeroSerieOriginal: '',
  },
  {
    id: '4',
    mac: 'a4:12:34:56:78:90',
    ubicacion: '(Cliente) JORGE ALBERTO HERRERA',
    estado: 'En uso',
    numeroSerie: 'HWTC26FF5D2A',
    eliminado: 'No',
    numeroSerieOriginal: '',
  },
  {
    id: '5',
    mac: 'b8:27:eb:45:67:89',
    ubicacion: '(Cliente) LORENA CABRERA GO',
    estado: 'En uso',
    numeroSerie: '',
    eliminado: 'No',
    numeroSerieOriginal: '',
  },
  {
    id: '6',
    mac: 'c0:25:67:92:5d:64',
    ubicacion: '(Depósito) Terra 3 Comunicaciones',
    estado: 'Stock',
    numeroSerie: 'GLCALPHA001',
    eliminado: 'No',
    numeroSerieOriginal: '',
  },
  {
    id: '7',
    mac: 'd4:5d:64:78:90:ab',
    ubicacion: '(Cliente) RODRIGO EDITH ERO',
    estado: 'En uso',
    numeroSerie: 'PHOTON2024',
    eliminado: 'No',
    numeroSerieOriginal: '',
  },
  {
    id: '8',
    mac: 'e8:94:f6:12:34:56',
    ubicacion: '(Depósito) CLIENTE',
    estado: 'Vendido',
    numeroSerie: '',
    eliminado: 'No',
    numeroSerieOriginal: '',
  },
];

export function EquiposTable() {
  const [selectedEquipos, setSelectedEquipos] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEquipos(equiposData.map(e => e.id));
    } else {
      setSelectedEquipos([]);
    }
  };

  const handleSelectEquipo = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEquipos([...selectedEquipos, id]);
    } else {
      setSelectedEquipos(selectedEquipos.filter(eId => eId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Icon buttons */}
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Agregar">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Guardar">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Etiquetas">
              <Tag className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Text buttons */}
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <span className="text-sm">⇄</span>
              Mover equipos
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <span className="text-sm">📄</span>
              Asignar Factura
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <Edit className="w-3.5 h-3.5" />
              Modificar estado
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Filtrar">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Escribir y presionar Enter"
                className="flex-1 text-xs outline-none"
              />
            </div>
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
                  checked={selectedEquipos.length === equiposData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">MAC</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Ubicación</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Número de serie</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Eliminado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Número de serie original</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {equiposData.map((equipo) => (
              <tr 
                key={equipo.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedEquipos.includes(equipo.id)}
                    onCheckedChange={(checked) => handleSelectEquipo(equipo.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium font-mono text-xs">
                    {equipo.mac}
                  </a>
                </td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {equipo.ubicacion}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{equipo.estado}</td>
                <td className="px-3 py-2 text-gray-700 font-mono text-xs">{equipo.numeroSerie || '--'}</td>
                <td className="px-3 py-2 text-gray-700">{equipo.eliminado}</td>
                <td className="px-3 py-2 text-gray-700">{equipo.numeroSerieOriginal || '--'}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center">
                    <button className="p-1.5 hover:bg-gray-50 rounded transition-colors" title="Acciones">
                      <MoreVertical className="w-3.5 h-3.5 text-gray-600" />
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
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">2</span>
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">3</span>
          <span className="text-gray-400">...</span>
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">1410</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al 10 de 14,095 registros
        </div>
      </div>
    </div>
  );
}
