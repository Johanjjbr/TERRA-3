import { useState } from 'react';
import { Plus, Save, Edit, Trash2, FileText, Table as TableIcon, Settings, Search, ChevronLeft, ChevronRight, FileDown, X, DollarSign } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface RegistroData {
  id: string;
  fecha: string;
  tipo: string;
  numero: string;
  descripcion: string;
  subtotal: string;
  impuestos: string;
  total: string;
  parcial: string;
  adjuntos: string;
  color?: 'green' | 'red' | 'white';
}

const registrosData: RegistroData[] = [
  {
    id: '1',
    fecha: '05/03/2026',
    tipo: 'CD',
    numero: '156858',
    descripcion: 'Pago',
    subtotal: '0,00',
    impuestos: '0,00',
    total: '15.000,00',
    parcial: '0,00',
    adjuntos: '',
    color: 'green',
  },
  {
    id: '2',
    fecha: '05/03/2026',
    tipo: 'CX',
    numero: '80026',
    descripcion: 'Ajuste Saldo',
    subtotal: '4.132,23',
    impuestos: '0,00',
    total: '5.000,00',
    parcial: '15.000,00',
    adjuntos: '',
    color: 'white',
  },
  {
    id: '3',
    fecha: '04/03/2026',
    tipo: 'FX',
    numero: '164861',
    descripcion: 'Factura Mensual',
    subtotal: '15.528,93',
    impuestos: '3.471,07',
    total: '20.000,00',
    parcial: '20.000,00',
    adjuntos: '',
    color: 'red',
  },
];

export function RegistrosTable() {
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [selectedRegistros, setSelectedRegistros] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRegistros(registrosData.map(r => r.id));
    } else {
      setSelectedRegistros([]);
    }
  };

  const handleSelectRegistro = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRegistros([...selectedRegistros, id]);
    } else {
      setSelectedRegistros(selectedRegistros.filter(rId => rId !== id));
    }
  };

  const getRowColor = (color?: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 border-l-4 border-l-green-500';
      case 'red':
        return 'bg-red-50 border-l-4 border-l-red-500';
      default:
        return '';
    }
  };

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

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Action buttons */}
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar .xls csv
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Anular factura X
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              Ajuste saldo
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
              <th className="px-3 py-2 text-left w-10">
                <Checkbox 
                  checked={selectedRegistros.length === registrosData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left w-10"></th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Número</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Descripción</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Subtotal</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Impuestos</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Total</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Parcial</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Adjuntos</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {registrosData.map((registro, index) => (
              <tr 
                key={registro.id} 
                className={`border-b border-gray-200 hover:bg-gray-50 ${getRowColor(registro.color)}`}
              >
                <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedRegistros.includes(registro.id)}
                    onCheckedChange={(checked) => handleSelectRegistro(registro.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-500">{index + 1}</td>
                <td className="px-3 py-2 text-gray-700">{registro.fecha}</td>
                <td className="px-3 py-2 text-gray-700 font-medium">{registro.tipo}</td>
                <td className="px-3 py-2">
                  <a className="text-blue-600 hover:underline">{registro.numero}</a>
                </td>
                <td className="px-3 py-2 text-gray-700">{registro.descripcion}</td>
                <td className="px-3 py-2 text-gray-700 text-right">{registro.subtotal}</td>
                <td className="px-3 py-2 text-gray-700 text-right">{registro.impuestos}</td>
                <td className="px-3 py-2 text-gray-700 text-right font-medium">{registro.total}</td>
                <td className="px-3 py-2 text-gray-700 text-right">{registro.parcial}</td>
                <td className="px-3 py-2 text-gray-700">{registro.adjuntos}</td>
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
          Registros del 1 al {registrosData.length} de {registrosData.length} registros
        </div>
      </div>
    </div>
  );
}
