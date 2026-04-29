import { useState } from 'react';
import { Plus, Save, Tag, FileText, Edit, Trash2, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface Extra {
  id: string;
  codigo: string;
  codCliente: string;
  cliente: string;
  extra: string;
  monto: string;
  moneda: string;
  meses: string;
  restante: string;
  sinLimite: string;
  finalizado: string;
  fechaAlta: string;
  etiquetas: string;
  operador: string;
  eliminado: string;
  comentario: string;
}

const extrasData: Extra[] = [
  {
    id: '1',
    codigo: '3252',
    codCliente: '009279',
    cliente: 'SOFIA NELLY GUZMAN',
    extra: 'Desplazamiento + 2 Conec...',
    monto: '5.000,00',
    moneda: 'Pesos',
    meses: '1',
    restante: '1',
    sinLimite: 'No',
    finalizado: 'No',
    fechaAlta: '17/03/2026',
    etiquetas: '',
    operador: 'JESUS',
    eliminado: 'No',
    comentario: '',
  },
  {
    id: '2',
    codigo: '3251',
    codCliente: '009278',
    cliente: 'JORGE ALBERTO HERRERA',
    extra: 'Instalación fibra óptica',
    monto: '15.000,00',
    moneda: 'Pesos',
    meses: '1',
    restante: '0',
    sinLimite: 'No',
    finalizado: 'Sí',
    fechaAlta: '16/03/2026',
    etiquetas: 'Instalación',
    operador: 'MARIA',
    eliminado: 'No',
    comentario: 'Instalación completa',
  },
  {
    id: '3',
    codigo: '3250',
    codCliente: '009277',
    cliente: 'LORENA CABRERA GO',
    extra: 'Router Wi-Fi 6',
    monto: '12.500,00',
    moneda: 'Pesos',
    meses: '3',
    restante: '2',
    sinLimite: 'No',
    finalizado: 'No',
    fechaAlta: '15/03/2026',
    etiquetas: 'Equipamiento',
    operador: 'JESUS',
    eliminado: 'No',
    comentario: '',
  },
  {
    id: '4',
    codigo: '3249',
    codCliente: '009276',
    cliente: 'RODRIGO EDITH ERO',
    extra: 'Multa por mora',
    monto: '2.500,00',
    moneda: 'Pesos',
    meses: '1',
    restante: '1',
    sinLimite: 'No',
    finalizado: 'No',
    fechaAlta: '14/03/2026',
    etiquetas: 'Mora',
    operador: 'JESUS',
    eliminado: 'No',
    comentario: 'Retraso en pago',
  },
];

export function ExtrasTable() {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedExtras(extrasData.map(e => e.id));
    } else {
      setSelectedExtras([]);
    }
  };

  const handleSelectExtra = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedExtras([...selectedExtras, id]);
    } else {
      setSelectedExtras(selectedExtras.filter(eId => eId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Action buttons */}
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Agregar">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Guardar">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Etiquetas">
              <Tag className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Documento">
              <FileText className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Editar">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
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
                  checked={selectedExtras.length === extrasData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Cód. Cliente</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Cliente</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Extra</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Monto</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Moneda</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Meses</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Restante</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Sin límite</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Finalizado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha alta</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Etiquetas</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Operador</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Eliminado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Comentario</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {extrasData.map((extra) => (
              <tr 
                key={extra.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedExtras.includes(extra.id)}
                    onCheckedChange={(checked) => handleSelectExtra(extra.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-700">{extra.codigo}</td>
                <td className="px-3 py-2 text-gray-700">{extra.codCliente}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {extra.cliente}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{extra.extra}</td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">{extra.monto}</td>
                <td className="px-3 py-2 text-gray-700">{extra.moneda}</td>
                <td className="px-3 py-2 text-center text-gray-700">{extra.meses}</td>
                <td className="px-3 py-2 text-center text-gray-700">{extra.restante}</td>
                <td className="px-3 py-2 text-center text-gray-700">{extra.sinLimite}</td>
                <td className="px-3 py-2 text-center text-gray-700">{extra.finalizado}</td>
                <td className="px-3 py-2 text-gray-700">{extra.fechaAlta}</td>
                <td className="px-3 py-2 text-gray-700">{extra.etiquetas || '--'}</td>
                <td className="px-3 py-2 text-gray-700">{extra.operador}</td>
                <td className="px-3 py-2 text-center text-gray-700">{extra.eliminado}</td>
                <td className="px-3 py-2 text-gray-700">{extra.comentario || '--'}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded" title="Editar">
                      <Edit className="w-3.5 h-3.5 text-gray-600" />
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
          Registros del 1 al 10 de 81 registros
        </div>
      </div>
    </div>
  );
}
