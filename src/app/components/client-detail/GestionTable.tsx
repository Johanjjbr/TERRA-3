import { useState } from 'react';
import { Plus, Save, Edit, Trash2, FileText, Table as TableIcon, Settings, Search, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Badge } from '../ui/badge';

const gestionData = [
  {
    id: '1',
    numero: '#VIS-045',
    estado: 'Programada',
    prioridad: 'Alta',
    motivo: 'Instalación de nuevo servicio',
    fechaProg: '20/03/2026 10:00',
    operador: 'JESUS',
  },
  {
    id: '2',
    numero: '#VIS-032',
    estado: 'Completada',
    prioridad: 'Media',
    motivo: 'Revisión técnica',
    fechaProg: '15/03/2026 14:30',
    operador: 'CARLOS',
  },
];

export function GestionTable() {
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [activeSubTab, setActiveSubTab] = useState('visitas');

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'Programada':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">Programada</Badge>;
      case 'Completada':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Completada</Badge>;
      case 'Cancelada':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Cancelada</Badge>;
      default:
        return null;
    }
  };

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Alta</Badge>;
      case 'Media':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs">Media</Badge>;
      case 'Baja':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">Baja</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Sub-tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1 px-4">
          <button
            onClick={() => setActiveSubTab('visitas')}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              activeSubTab === 'visitas'
                ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Visitas
          </button>
          <button
            onClick={() => setActiveSubTab('cambio-titular')}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              activeSubTab === 'cambio-titular'
                ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cambio de titular
          </button>
          <button
            onClick={() => setActiveSubTab('alertas')}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              activeSubTab === 'alertas'
                ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Alertas
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
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
              <th className="px-3 py-2 text-left font-medium text-gray-700">Id</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Prioridad</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Motivo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha prog.</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Operador</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700 w-10">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {gestionData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-3 py-2">
                  <a className="text-blue-600 hover:underline">{item.numero}</a>
                </td>
                <td className="px-3 py-2">{getEstadoBadge(item.estado)}</td>
                <td className="px-3 py-2">{getPrioridadBadge(item.prioridad)}</td>
                <td className="px-3 py-2 text-gray-700">{item.motivo}</td>
                <td className="px-3 py-2 text-gray-700">{item.fechaProg}</td>
                <td className="px-3 py-2 text-gray-700">{item.operador}</td>
                <td className="px-3 py-2 text-center">
                  <button className="hover:bg-gray-100 rounded p-1">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
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
          Registros del 1 al {gestionData.length} de {gestionData.length} registros
        </div>
      </div>
    </div>
  );
}
