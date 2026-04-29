import { useState } from 'react';
import { Plus, Mail, Printer, Trash2, XCircle, Filter, Search, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface Factura {
  id: string;
  fecha: string;
  tipo: string;
  numero: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  vencimiento: string;
  total: string;
  fechaReal: string;
  deuda: string;
  vendedor: string;
}

const facturasData: Factura[] = [
  {
    id: '1',
    fecha: '18/03/2026',
    tipo: 'CX',
    numero: '92869',
    codigo: '003447',
    nombre: 'JULIANA MICAELA VILLEGAS',
    descripcion: 'Ajuste Saldo',
    vencimiento: '18/03/2026',
    total: '5.000,00',
    fechaReal: '18/03/2026',
    deuda: '0,00',
    vendedor: 'JESUS',
  },
  {
    id: '2',
    fecha: '18/03/2026',
    tipo: 'FC',
    numero: '92868',
    codigo: '003446',
    nombre: 'JORGE ALBERTO HERRERA',
    descripcion: 'Servicio Internet - Marzo 2026',
    vencimiento: '25/03/2026',
    total: '30.250,00',
    fechaReal: '18/03/2026',
    deuda: '30.250,00',
    vendedor: 'MARIA',
  },
  {
    id: '3',
    fecha: '17/03/2026',
    tipo: 'FC',
    numero: '92867',
    codigo: '003445',
    nombre: 'LORENA CABRERA GO',
    descripcion: 'Servicio Internet - Marzo 2026',
    vencimiento: '24/03/2026',
    total: '42.350,00',
    fechaReal: '17/03/2026',
    deuda: '0,00',
    vendedor: 'JESUS',
  },
  {
    id: '4',
    fecha: '17/03/2026',
    tipo: 'NC',
    numero: '92866',
    codigo: '003444',
    nombre: 'RODRIGO EDITH ERO',
    descripcion: 'Nota de Crédito - Ajuste',
    vencimiento: '17/03/2026',
    total: '-2.500,00',
    fechaReal: '17/03/2026',
    deuda: '0,00',
    vendedor: 'JESUS',
  },
  {
    id: '5',
    fecha: '16/03/2026',
    tipo: 'FC',
    numero: '92865',
    codigo: '003443',
    nombre: 'JOSE ALEXIS SALAZA',
    descripcion: 'Instalación + Equipo',
    vencimiento: '23/03/2026',
    total: '45.000,00',
    fechaReal: '16/03/2026',
    deuda: '45.000,00',
    vendedor: 'MARIA',
  },
];

export function MisFacturasTable() {
  const [selectedFacturas, setSelectedFacturas] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFacturas(facturasData.map(f => f.id));
    } else {
      setSelectedFacturas([]);
    }
  };

  const handleSelectFactura = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedFacturas([...selectedFacturas, id]);
    } else {
      setSelectedFacturas(selectedFacturas.filter(fId => fId !== id));
    }
  };

  // Calculate totals
  const totalVisible = facturasData.reduce((sum, f) => {
    return sum + parseFloat(f.total.replace(/\./g, '').replace(',', '.'));
  }, 0);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Action buttons */}
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Nueva factura">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Enviar por email">
              <Mail className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Imprimir">
              <Printer className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              Anular factura/s
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
                  checked={selectedFacturas.length === facturasData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">N°</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Descripción</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">1 Vencimiento</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Total</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha Real</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Deuda</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Vendedor</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {facturasData.map((factura) => (
              <tr 
                key={factura.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedFacturas.includes(factura.id)}
                    onCheckedChange={(checked) => handleSelectFactura(factura.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-700">{factura.fecha}</td>
                <td className="px-3 py-2 text-gray-700 font-medium">{factura.tipo}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {factura.numero}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{factura.codigo}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {factura.nombre}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{factura.descripcion}</td>
                <td className="px-3 py-2 text-gray-700">{factura.vencimiento}</td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">{factura.total}</td>
                <td className="px-3 py-2 text-gray-700">{factura.fechaReal}</td>
                <td className={`px-3 py-2 text-right font-semibold ${
                  parseFloat(factura.deuda.replace(/\./g, '').replace(',', '.')) > 0 
                    ? 'text-red-600' 
                    : 'text-gray-900'
                }`}>
                  {factura.deuda}
                </td>
                <td className="px-3 py-2 text-gray-700">{factura.vendedor}</td>
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

      {/* Footer with totals */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-end gap-6 text-xs">
          <div className="text-gray-700">
            Registros visibles: <span className="font-bold text-gray-900">{totalVisible.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="text-gray-700">
            Total registros: <a href="#" className="text-blue-600 hover:underline">Calcular</a>
          </div>
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
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">2</span>
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">3</span>
          <span className="text-gray-400">...</span>
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">25447</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al 10 de 254,463
        </div>
      </div>
    </div>
  );
}
