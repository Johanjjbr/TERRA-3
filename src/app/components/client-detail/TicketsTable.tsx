import { useState } from 'react';
import { Plus, Save, Edit, Trash2, FileText, Table as TableIcon, Settings, Search, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

const ticketsData = [
  {
    id: '1',
    numero: '#00124',
    estado: 'Abierto',
    area: 'Soporte Técnico',
    asunto: 'Problema de conexión intermitente',
    creado: '18/03/2026',
    ultimaActualizacion: '18/03/2026 14:30',
  },
  {
    id: '2',
    numero: '#00089',
    estado: 'Cerrado',
    area: 'Facturación',
    asunto: 'Consulta sobre factura de febrero',
    creado: '15/03/2026',
    ultimaActualizacion: '16/03/2026 10:15',
  },
  {
    id: '3',
    numero: '#00056',
    estado: 'En proceso',
    area: 'Soporte Técnico',
    asunto: 'Solicitud de cambio de velocidad',
    creado: '10/03/2026',
    ultimaActualizacion: '12/03/2026 09:45',
  },
];

export function TicketsTable() {
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(ticketsData.map(t => t.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets([...selectedTickets, id]);
    } else {
      setSelectedTickets(selectedTickets.filter(tId => tId !== id));
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'Abierto':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">Abierto</Badge>;
      case 'Cerrado':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">Cerrado</Badge>;
      case 'En proceso':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs">En proceso</Badge>;
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
              <th className="px-3 py-2 text-left w-10">
                <Checkbox 
                  checked={selectedTickets.length === ticketsData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Id</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Área</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Asunto</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Creado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Última actualización</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700 w-10">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {ticketsData.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedTickets.includes(ticket.id)}
                    onCheckedChange={(checked) => handleSelectTicket(ticket.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2">
                  <a className="text-blue-600 hover:underline">{ticket.numero}</a>
                </td>
                <td className="px-3 py-2">{getEstadoBadge(ticket.estado)}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.area}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.asunto}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.creado}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.ultimaActualizacion}</td>
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
          Registros del 1 al {ticketsData.length} de {ticketsData.length} registros
        </div>
      </div>
    </div>
  );
}
