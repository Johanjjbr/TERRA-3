import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Calendar, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Cheque {
  id: string;
  numero: string;
  banco: string;
  titular: string;
  monto: string;
  fechaEmision: string;
  fechaCobro: string;
  estado: 'Pendiente' | 'Cobrado' | 'Rechazado' | 'Depositado';
  cliente?: string;
}

const chequesData: Cheque[] = [
  {
    id: '1',
    numero: '45678901',
    banco: 'Banco Santander Río',
    titular: 'JORGE ALBERTO HERRERA',
    monto: '30.250,00',
    fechaEmision: '10/03/2026',
    fechaCobro: '25/03/2026',
    estado: 'Pendiente',
    cliente: 'JORGE ALBERTO HERRERA',
  },
  {
    id: '2',
    numero: '78945612',
    banco: 'Banco Nación',
    titular: 'LORENA CABRERA GO',
    monto: '42.350,00',
    fechaEmision: '05/03/2026',
    fechaCobro: '20/03/2026',
    estado: 'Depositado',
    cliente: 'LORENA CABRERA GO',
  },
  {
    id: '3',
    numero: '12345678',
    banco: 'Banco Galicia',
    titular: 'RODRIGO EDITH ERO',
    monto: '20.000,00',
    fechaEmision: '01/03/2026',
    fechaCobro: '15/03/2026',
    estado: 'Cobrado',
    cliente: 'RODRIGO EDITH ERO',
  },
  {
    id: '4',
    numero: '98765432',
    banco: 'Banco Macro',
    titular: 'ANTONIO ROBERTO',
    monto: '15.000,00',
    fechaEmision: '28/02/2026',
    fechaCobro: '10/03/2026',
    estado: 'Rechazado',
    cliente: 'ANTONIO ROBERTO',
  },
];

export function ChequesTable() {
  const [selectedCheques, setSelectedCheques] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [filterEstado, setFilterEstado] = useState('Todos');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCheques(chequesData.map(c => c.id));
    } else {
      setSelectedCheques([]);
    }
  };

  const handleSelectCheque = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCheques([...selectedCheques, id]);
    } else {
      setSelectedCheques(selectedCheques.filter(cId => cId !== id));
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs font-normal">Pendiente</Badge>;
      case 'Cobrado':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">Cobrado</Badge>;
      case 'Depositado':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-normal">Depositado</Badge>;
      case 'Rechazado':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">Rechazado</Badge>;
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
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Registrar Cheque
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Vencimientos
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
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cobrado">Cobrado</option>
              <option value="Depositado">Depositado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cheques..."
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
                  checked={selectedCheques.length === chequesData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Número</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Banco</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Titular</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Monto</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha Emisión</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha Cobro</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Cliente</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {chequesData.map((cheque) => (
              <tr 
                key={cheque.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedCheques.includes(cheque.id)}
                    onCheckedChange={(checked) => handleSelectCheque(cheque.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-900 font-medium font-mono">{cheque.numero}</td>
                <td className="px-3 py-2 text-gray-700">{cheque.banco}</td>
                <td className="px-3 py-2 text-gray-700">{cheque.titular}</td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">$ {cheque.monto}</td>
                <td className="px-3 py-2 text-gray-700">{cheque.fechaEmision}</td>
                <td className="px-3 py-2 text-gray-700">{cheque.fechaCobro}</td>
                <td className="px-3 py-2 text-gray-700">{cheque.cliente || '--'}</td>
                <td className="px-3 py-2">{getEstadoBadge(cheque.estado)}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Editar">
                      <Edit className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
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
          Registros del 1 al {chequesData.length} de {chequesData.length} registros
        </div>
      </div>
    </div>
  );
}
