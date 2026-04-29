import { useState } from 'react';
import { FileDown, RefreshCw, Search, Filter, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Movimiento {
  id: string;
  fecha: string;
  tipo: 'Entrada' | 'Salida' | 'Transferencia';
  producto: string;
  cantidad: string;
  origen: string;
  destino: string;
  usuario: string;
  comentario: string;
}

const movimientosData: Movimiento[] = [
  {
    id: '1',
    fecha: '18/03/2026 14:25',
    tipo: 'Salida',
    producto: 'ROUTER GLC ALPHA C4',
    cantidad: '2',
    origen: 'Terra 3 Comunicaciones',
    destino: 'PABLO RAUL PEÑALOZA',
    usuario: 'JESUS',
    comentario: 'Instalación cliente nuevo',
  },
  {
    id: '2',
    fecha: '18/03/2026 10:30',
    tipo: 'Entrada',
    producto: 'Cable UTP Cat6 x 305m',
    cantidad: '305',
    origen: 'Proveedor - FiberTech',
    destino: 'Terra 3 Comunicaciones',
    usuario: 'MARIA',
    comentario: 'Compra mensual',
  },
  {
    id: '3',
    fecha: '17/03/2026 16:00',
    tipo: 'Transferencia',
    producto: 'Onu Wi Fi',
    cantidad: '5',
    origen: 'Terra 3 Comunicaciones',
    destino: 'CLIENTE',
    usuario: 'JESUS',
    comentario: 'Reubicación stock',
  },
  {
    id: '4',
    fecha: '17/03/2026 11:15',
    tipo: 'Salida',
    producto: 'Splitter Óptico 1x8',
    cantidad: '1',
    origen: 'Terra 3 Comunicaciones',
    destino: 'ANTONIO ROBERTO MUÑOZ',
    usuario: 'MARIA',
    comentario: 'Upgrade instalación',
  },
];

export function MovimientosTable() {
  const [selectedMovimientos, setSelectedMovimientos] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [filterTipo, setFilterTipo] = useState('Todos');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMovimientos(movimientosData.map(m => m.id));
    } else {
      setSelectedMovimientos([]);
    }
  };

  const handleSelectMovimiento = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMovimientos([...selectedMovimientos, id]);
    } else {
      setSelectedMovimientos(selectedMovimientos.filter(mId => mId !== id));
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'Entrada':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">Entrada</Badge>;
      case 'Salida':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">Salida</Badge>;
      case 'Transferencia':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-normal">Transferencia</Badge>;
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
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Filtrar por fecha
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Recargar">
              <RefreshCw className="w-3.5 h-3.5 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <select 
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
            >
              <option value="Todos">Todos los tipos</option>
              <option value="Entrada">Entradas</option>
              <option value="Salida">Salidas</option>
              <option value="Transferencia">Transferencias</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Filtrar">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar movimientos..."
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
                  checked={selectedMovimientos.length === movimientosData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Producto</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Cantidad</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Origen</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Destino</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Usuario</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Comentario</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {movimientosData.map((movimiento) => (
              <tr 
                key={movimiento.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedMovimientos.includes(movimiento.id)}
                    onCheckedChange={(checked) => handleSelectMovimiento(movimiento.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-700">{movimiento.fecha}</td>
                <td className="px-3 py-2">{getTipoBadge(movimiento.tipo)}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {movimiento.producto}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">{movimiento.cantidad}</td>
                <td className="px-3 py-2 text-gray-700">{movimiento.origen}</td>
                <td className="px-3 py-2 text-gray-700">{movimiento.destino}</td>
                <td className="px-3 py-2 text-gray-700">{movimiento.usuario}</td>
                <td className="px-3 py-2 text-gray-700">{movimiento.comentario}</td>
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
          Registros del 1 al {movimientosData.length} de {movimientosData.length} registros
        </div>
      </div>
    </div>
  );
}
