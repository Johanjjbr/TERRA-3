import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Filter, ChevronLeft, ChevronRight, Eye, CheckCircle } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Compra {
  id: string;
  fecha: string;
  numeroComprobante: string;
  proveedor: string;
  producto: string;
  cantidad: string;
  precioUnitario: string;
  total: string;
  estado: 'Pendiente' | 'Recibida' | 'Cancelada';
  usuario: string;
}

const comprasData: Compra[] = [
  {
    id: '1',
    fecha: '18/03/2026',
    numeroComprobante: 'FC-A-00012345',
    proveedor: 'FiberTech Solutions',
    producto: 'Cable UTP Cat6 x 305m',
    cantidad: '10',
    precioUnitario: '150.000,00',
    total: '1.500.000,00',
    estado: 'Recibida',
    usuario: 'JESUS',
  },
  {
    id: '2',
    fecha: '17/03/2026',
    numeroComprobante: 'FC-A-00012344',
    proveedor: 'Distribuidora Huawei Argentina',
    producto: 'ROUTER GLC ALPHA C4',
    cantidad: '50',
    precioUnitario: '42.000,00',
    total: '2.100.000,00',
    estado: 'Recibida',
    usuario: 'MARIA',
  },
  {
    id: '3',
    fecha: '16/03/2026',
    numeroComprobante: 'FC-A-00012343',
    proveedor: 'Cables y Conectores SRL',
    producto: 'Splitter Óptico 1x8',
    cantidad: '100',
    precioUnitario: '8.500,00',
    total: '850.000,00',
    estado: 'Pendiente',
    usuario: 'JESUS',
  },
  {
    id: '4',
    fecha: '15/03/2026',
    numeroComprobante: 'FC-A-00012342',
    proveedor: 'FiberTech Solutions',
    producto: 'Onu Wi Fi',
    cantidad: '25',
    precioUnitario: '40.000,00',
    total: '1.000.000,00',
    estado: 'Recibida',
    usuario: 'MARIA',
  },
];

export function ComprasTable() {
  const [selectedCompras, setSelectedCompras] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [filterEstado, setFilterEstado] = useState('Todos');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCompras(comprasData.map(c => c.id));
    } else {
      setSelectedCompras([]);
    }
  };

  const handleSelectCompra = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCompras([...selectedCompras, id]);
    } else {
      setSelectedCompras(selectedCompras.filter(cId => cId !== id));
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs font-normal">Pendiente</Badge>;
      case 'Recibida':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">Recibida</Badge>;
      case 'Cancelada':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">Cancelada</Badge>;
      default:
        return null;
    }
  };

  const totalCompras = comprasData.reduce((sum, c) => {
    return sum + parseFloat(c.total.replace(/\./g, '').replace(',', '.'));
  }, 0);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Nueva Compra
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Marcar como recibida
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
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Recibida">Recibidas</option>
              <option value="Cancelada">Canceladas</option>
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
                placeholder="Buscar compras..."
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
                  checked={selectedCompras.length === comprasData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">N° Comprobante</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Proveedor</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Producto</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Cantidad</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Precio Unitario</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Total</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Usuario</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {comprasData.map((compra) => (
              <tr 
                key={compra.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedCompras.includes(compra.id)}
                    onCheckedChange={(checked) => handleSelectCompra(compra.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-700">{compra.fecha}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {compra.numeroComprobante}
                  </a>
                </td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {compra.proveedor}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{compra.producto}</td>
                <td className="px-3 py-2 text-gray-700 text-right font-medium">{compra.cantidad}</td>
                <td className="px-3 py-2 text-gray-700 text-right">$ {compra.precioUnitario}</td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">$ {compra.total}</td>
                <td className="px-3 py-2 text-gray-700">{compra.usuario}</td>
                <td className="px-3 py-2">{getEstadoBadge(compra.estado)}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Ver detalle">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    {compra.estado === 'Pendiente' && (
                      <button className="p-1.5 hover:bg-green-50 rounded transition-colors" title="Marcar recibida">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with total */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-end text-xs">
          <span className="text-gray-700 mr-3">Total compras:</span>
          <span className="font-bold text-gray-900">$ {totalCompras.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
        </div>
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
          Registros del 1 al {comprasData.length} de {comprasData.length} registros
        </div>
      </div>
    </div>
  );
}
