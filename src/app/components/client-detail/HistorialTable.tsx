import { useState } from 'react';
import { Plus, Save, Edit, Trash2, FileText, Table as TableIcon, Settings, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const historialData = [
  {
    id: '1',
    fecha: '19/11/2024',
    accion: 'Agregó un nuevo cliente',
    detalle: '',
    creadoPor: 'JESUS',
    ip: '190.113.111.43',
  },
  {
    id: '2',
    fecha: '18/11/2024',
    accion: 'Modificó datos del cliente',
    detalle: 'Cambio de dirección',
    creadoPor: 'JESUS',
    ip: '190.113.111.43',
  },
  {
    id: '3',
    fecha: '15/11/2024',
    accion: 'Creó una nueva conexión',
    detalle: 'Plan 100 MEGAS',
    creadoPor: 'JESUS',
    ip: '190.113.111.43',
  },
];

export function HistorialTable() {
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Icon buttons */}
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Agregar">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Guardar">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Editar">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Exportar PDF">
              <FileText className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Exportar Excel">
              <TableIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Configurar columnas">
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Search */}
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

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Acción</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Detalle</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Creado por</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">IP</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {historialData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-700">{item.fecha}</td>
                <td className="px-3 py-2 text-gray-700">{item.accion}</td>
                <td className="px-3 py-2 text-gray-700">{item.detalle}</td>
                <td className="px-3 py-2 text-gray-700">{item.creadoPor}</td>
                <td className="px-3 py-2 text-gray-500">{item.ip}</td>
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
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al {historialData.length} de {historialData.length} registros
        </div>
      </div>
    </div>
  );
}
