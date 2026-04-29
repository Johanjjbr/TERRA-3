import { useState } from 'react';
import { Plus, Save, Trash2, FileText, FileSpreadsheet, List, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Ticket {
  id: string;
  idTicket: string;
  cliente: string;
  area: string;
  estado: 'EN PROCESO' | 'CERRADO' | 'ABIERTO' | 'RESUELTO';
  asunto: string;
  operador: string;
  prioridad: 'NORMAL' | 'ALTA' | 'BAJA' | 'URGENTE';
  fechaAsignacion: string;
  nroFactura: string;
  nodo: string;
  creado: string;
  ultimaActualizacion: string;
  creadoPor: string;
}

const ticketsData: Ticket[] = [
  {
    id: '1',
    idTicket: '219714',
    cliente: 'JULIO CESAR GUZMAN',
    area: 'Soporte Técnico',
    estado: 'EN PROCESO',
    asunto: 'INSTALACION',
    operador: 'JULIO',
    prioridad: 'NORMAL',
    fechaAsignacion: '19/03/2026 a las 09:30 - 10:00 hs.',
    nroFactura: '',
    nodo: '',
    creado: '18/03/2026 12:44',
    ultimaActualizacion: '18/03/2026 12:44',
    creadoPor: 'JESUS',
  },
  {
    id: '2',
    idTicket: '219502',
    cliente: 'DANIEL ESTEBAN ZABALETA',
    area: 'Soporte Técnico',
    estado: 'CERRADO',
    asunto: 'Falta de servicio',
    operador: 'MARCELO',
    prioridad: 'ALTA',
    fechaAsignacion: '',
    nroFactura: '',
    nodo: '',
    creado: '17/03/2026 12:50',
    ultimaActualizacion: '17/03/2026 18:31',
    creadoPor: 'JESUS',
  },
  {
    id: '3',
    idTicket: '219501',
    cliente: 'MARIA VICTORIA CASTRO',
    area: 'Ventas',
    estado: 'ABIERTO',
    asunto: 'Consulta de cobertura',
    operador: 'NATALIA',
    prioridad: 'BAJA',
    fechaAsignacion: '18/03/2026 a las 14:00 - 15:00 hs.',
    nroFactura: '',
    nodo: '',
    creado: '17/03/2026 09:15',
    ultimaActualizacion: '17/03/2026 09:15',
    creadoPor: 'MARIA',
  },
  {
    id: '4',
    idTicket: '219500',
    cliente: 'ROBERTO CARLOS MENDEZ',
    area: 'Soporte Técnico',
    estado: 'RESUELTO',
    asunto: 'Cambio de domicilio',
    operador: 'JULIO',
    prioridad: 'NORMAL',
    fechaAsignacion: '',
    nroFactura: '',
    nodo: 'Caucete Centro',
    creado: '16/03/2026 16:22',
    ultimaActualizacion: '17/03/2026 10:45',
    creadoPor: 'JESUS',
  },
  {
    id: '5',
    idTicket: '219499',
    cliente: 'SANDRA LILIANA ROJAS',
    area: 'Administración',
    estado: 'EN PROCESO',
    asunto: 'Baja',
    operador: 'NATALIA',
    prioridad: 'URGENTE',
    fechaAsignacion: '18/03/2026 a las 11:00 - 12:00 hs.',
    nroFactura: 'A-00012345',
    nodo: '',
    creado: '16/03/2026 14:10',
    ultimaActualizacion: '18/03/2026 08:20',
    creadoPor: 'MARIA',
  },
];

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'EN PROCESO':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-300 text-xs font-semibold">EN PROCESO</Badge>;
    case 'CERRADO':
      return <Badge variant="outline" className="bg-transparent border-gray-400 text-gray-600 hover:bg-gray-50 text-xs font-semibold">CERRADO</Badge>;
    case 'ABIERTO':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300 text-xs font-semibold">ABIERTO</Badge>;
    case 'RESUELTO':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-300 text-xs font-semibold">RESUELTO</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 text-xs">{estado}</Badge>;
  }
};

const getPrioridadBadge = (prioridad: string) => {
  switch (prioridad) {
    case 'ALTA':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-300 text-xs font-semibold">ALTA</Badge>;
    case 'URGENTE':
      return <Badge className="bg-red-600 text-white hover:bg-red-600 text-xs font-semibold">URGENTE</Badge>;
    case 'BAJA':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300 text-xs font-semibold">BAJA</Badge>;
    case 'NORMAL':
      return <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200 border-gray-300 text-xs font-semibold">NORMAL</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 text-xs">{prioridad}</Badge>;
  }
};

export function TicketsTable() {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

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

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Icon buttons */}
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Nuevo ticket">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Guardar">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Exportar PDF">
              <FileText className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Exportar Excel">
              <FileSpreadsheet className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Ajustes de tabla">
              <List className="w-4 h-4 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />
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
                  checked={selectedTickets.length === ticketsData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Id</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Cliente</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Área</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Asunto</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Operador</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Prioridad</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha asignación</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">N° Factura</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nodo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Creado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Última actualización</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Creado por</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {ticketsData.map((ticket) => (
              <tr 
                key={ticket.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedTickets.includes(ticket.id)}
                    onCheckedChange={(checked) => handleSelectTicket(ticket.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {ticket.idTicket}
                  </a>
                </td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {ticket.cliente}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{ticket.area}</td>
                <td className="px-3 py-2">{getEstadoBadge(ticket.estado)}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {ticket.asunto}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{ticket.operador}</td>
                <td className="px-3 py-2">{getPrioridadBadge(ticket.prioridad)}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.fechaAsignacion || '--'}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.nroFactura || '--'}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.nodo || '--'}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.creado}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.ultimaActualizacion}</td>
                <td className="px-3 py-2 text-gray-700">{ticket.creadoPor}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Más acciones">
                      <List className="w-3.5 h-3.5 text-gray-600" />
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
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">1693</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al 10 de 16,929 registros
        </div>
      </div>
    </div>
  );
}
