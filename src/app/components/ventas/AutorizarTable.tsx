import { useState } from 'react';
import { CheckCircle, XCircle, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface FacturaPendiente {
  id: string;
  fecha: string;
  tipo: string;
  numero: string;
  cliente: string;
  monto: string;
  estado: 'Pendiente' | 'Autorizada' | 'Rechazada';
  vendedor: string;
  motivo: string;
}

const facturasData: FacturaPendiente[] = [
  {
    id: '1',
    fecha: '18/03/2026',
    tipo: 'FC',
    numero: '92870',
    cliente: 'JULIANA MICAELA VILLEGAS',
    monto: '5.000,00',
    estado: 'Pendiente',
    vendedor: 'JESUS',
    motivo: 'Ajuste manual',
  },
  {
    id: '2',
    fecha: '17/03/2026',
    tipo: 'NC',
    numero: '92869',
    cliente: 'JORGE ALBERTO HERRERA',
    monto: '2.500,00',
    estado: 'Pendiente',
    vendedor: 'MARIA',
    motivo: 'Nota de crédito',
  },
  {
    id: '3',
    fecha: '16/03/2026',
    tipo: 'FC',
    numero: '92868',
    cliente: 'LORENA CABRERA GO',
    monto: '45.000,00',
    estado: 'Autorizada',
    vendedor: 'JESUS',
    motivo: 'Instalación especial',
  },
  {
    id: '4',
    fecha: '15/03/2026',
    tipo: 'FC',
    numero: '92867',
    cliente: 'RODRIGO EDITH ERO',
    monto: '15.000,00',
    estado: 'Rechazada',
    vendedor: 'MARIA',
    motivo: 'Monto incorrecto',
  },
];

export function AutorizarTable() {
  const [selectedFacturas, setSelectedFacturas] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [filterEstado, setFilterEstado] = useState('Pendiente');

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

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs font-normal">Pendiente</Badge>;
      case 'Autorizada':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">Autorizada</Badge>;
      case 'Rechazada':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">Rechazada</Badge>;
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
            <button className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Autorizar seleccionadas
            </button>
            <button className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              Rechazar seleccionadas
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Filter */}
            <select 
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
            >
              <option value="Todas">Todas</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Autorizada">Autorizadas</option>
              <option value="Rechazada">Rechazadas</option>
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
                placeholder="Buscar facturas..."
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
              <th className="px-3 py-2 text-left font-medium text-gray-700">N° Factura</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Cliente</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Monto</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Vendedor</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Motivo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
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
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {factura.cliente}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">$ {factura.monto}</td>
                <td className="px-3 py-2 text-gray-700">{factura.vendedor}</td>
                <td className="px-3 py-2 text-gray-700">{factura.motivo}</td>
                <td className="px-3 py-2">{getEstadoBadge(factura.estado)}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    {factura.estado === 'Pendiente' && (
                      <>
                        <button 
                          className="p-1.5 hover:bg-green-50 rounded transition-colors" 
                          title="Autorizar"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        </button>
                        <button 
                          className="p-1.5 hover:bg-red-50 rounded transition-colors" 
                          title="Rechazar"
                        >
                          <XCircle className="w-3.5 h-3.5 text-red-600" />
                        </button>
                      </>
                    )}
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
          Registros del 1 al {facturasData.length} de {facturasData.length} registros
        </div>
      </div>
    </div>
  );
}
