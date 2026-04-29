import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, DollarSign, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Movimiento {
  id: string;
  fecha: string;
  tipo: 'Ingreso' | 'Egreso';
  concepto: string;
  metodoPago: string;
  monto: string;
  cliente?: string;
  factura?: string;
  usuario: string;
}

const movimientosData: Movimiento[] = [
  {
    id: '1',
    fecha: '18/03/2026 14:25',
    tipo: 'Ingreso',
    concepto: 'Pago servicio mensual',
    metodoPago: 'Efectivo',
    monto: '30.250,00',
    cliente: 'JORGE ALBERTO HERRERA',
    factura: 'FC-00156858',
    usuario: 'JESUS',
  },
  {
    id: '2',
    fecha: '18/03/2026 12:15',
    tipo: 'Ingreso',
    concepto: 'Pago servicio mensual',
    metodoPago: 'Transferencia',
    monto: '42.350,00',
    cliente: 'LORENA CABRERA GO',
    factura: 'FC-00156857',
    usuario: 'JESUS',
  },
  {
    id: '3',
    fecha: '18/03/2026 10:30',
    tipo: 'Egreso',
    concepto: 'Compra equipamiento',
    metodoPago: 'Transferencia',
    monto: '125.000,00',
    usuario: 'JESUS',
  },
  {
    id: '4',
    fecha: '17/03/2026 16:45',
    tipo: 'Ingreso',
    concepto: 'Instalación nueva',
    metodoPago: 'Efectivo',
    monto: '15.000,00',
    cliente: 'JOSE ALEXIS SALAZA',
    factura: 'FC-00156856',
    usuario: 'MARIA',
  },
  {
    id: '5',
    fecha: '17/03/2026 11:20',
    tipo: 'Egreso',
    concepto: 'Pago proveedor fibra',
    metodoPago: 'Cheque',
    monto: '450.000,00',
    usuario: 'JESUS',
  },
];

export function CajaTable() {
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

  // Calculate totals
  const totalIngresos = movimientosData
    .filter(m => m.tipo === 'Ingreso')
    .reduce((sum, m) => sum + parseFloat(m.monto.replace(/\./g, '').replace(',', '.')), 0);
  
  const totalEgresos = movimientosData
    .filter(m => m.tipo === 'Egreso')
    .reduce((sum, m) => sum + parseFloat(m.monto.replace(/\./g, '').replace(',', '.')), 0);

  const saldoCaja = totalIngresos - totalEgresos;

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Summary Cards */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg px-4 py-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">Ingresos</span>
            </div>
            <p className="text-lg font-bold text-green-700">$ {totalIngresos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
          </div>
          
          <div className="bg-red-50 rounded-lg px-4 py-3 border border-red-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-xs font-medium text-red-700">Egresos</span>
            </div>
            <p className="text-lg font-bold text-red-700">$ {totalEgresos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg px-4 py-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Saldo en Caja</span>
            </div>
            <p className="text-lg font-bold text-blue-700">$ {saldoCaja.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Action buttons */}
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Nuevo Movimiento
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
            <select 
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
            >
              <option value="Todos">Todos</option>
              <option value="Ingreso">Ingresos</option>
              <option value="Egreso">Egresos</option>
            </select>
          </div>

          {/* Search */}
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
              <th className="px-3 py-2 text-left font-medium text-gray-700">Concepto</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Método Pago</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Monto</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Cliente</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Factura</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Usuario</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
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
                <td className="px-3 py-2">
                  {movimiento.tipo === 'Ingreso' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">
                      Ingreso
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">
                      Egreso
                    </Badge>
                  )}
                </td>
                <td className="px-3 py-2 text-gray-900">{movimiento.concepto}</td>
                <td className="px-3 py-2 text-gray-700">{movimiento.metodoPago}</td>
                <td className={`px-3 py-2 text-right font-semibold ${
                  movimiento.tipo === 'Ingreso' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {movimiento.tipo === 'Ingreso' ? '+' : '-'} $ {movimiento.monto}
                </td>
                <td className="px-3 py-2 text-gray-700">{movimiento.cliente || '--'}</td>
                <td className="px-3 py-2">
                  {movimiento.factura ? (
                    <a href="#" className="text-blue-600 hover:underline">
                      {movimiento.factura}
                    </a>
                  ) : (
                    <span className="text-gray-400">--</span>
                  )}
                </td>
                <td className="px-3 py-2 text-gray-700">{movimiento.usuario}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center">
                    <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Ver detalle">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
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
          Registros del 1 al {movimientosData.length} de {movimientosData.length} registros
        </div>
      </div>
    </div>
  );
}
