import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Calculator, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Impuesto {
  id: string;
  nombre: string;
  codigo: string;
  tipo: string;
  porcentaje: string;
  descripcion: string;
  estado: 'Activo' | 'Inactivo';
  aplicaFacturacion: boolean;
}

const impuestosData: Impuesto[] = [
  {
    id: '1',
    nombre: 'IVA 21%',
    codigo: 'IVA21',
    tipo: 'Nacional',
    porcentaje: '21.00',
    descripcion: 'Impuesto al Valor Agregado',
    estado: 'Activo',
    aplicaFacturacion: true,
  },
  {
    id: '2',
    nombre: 'IVA 10.5%',
    codigo: 'IVA10.5',
    tipo: 'Nacional',
    porcentaje: '10.50',
    descripcion: 'IVA Reducido',
    estado: 'Activo',
    aplicaFacturacion: true,
  },
  {
    id: '3',
    nombre: 'Ingresos Brutos',
    codigo: 'IIBB',
    tipo: 'Provincial',
    porcentaje: '3.50',
    descripcion: 'Impuesto Provincial',
    estado: 'Activo',
    aplicaFacturacion: false,
  },
  {
    id: '4',
    nombre: 'Impuesto Municipal',
    codigo: 'MUNIC',
    tipo: 'Municipal',
    porcentaje: '1.50',
    descripcion: 'Tasa Municipal',
    estado: 'Activo',
    aplicaFacturacion: false,
  },
  {
    id: '5',
    nombre: 'IVA Exento',
    codigo: 'IVAEXE',
    tipo: 'Nacional',
    porcentaje: '0.00',
    descripcion: 'Exención IVA',
    estado: 'Activo',
    aplicaFacturacion: true,
  },
];

export function ImpuestosTable() {
  const [selectedImpuestos, setSelectedImpuestos] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [filterTipo, setFilterTipo] = useState('Todos');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedImpuestos(impuestosData.map(i => i.id));
    } else {
      setSelectedImpuestos([]);
    }
  };

  const handleSelectImpuesto = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedImpuestos([...selectedImpuestos, id]);
    } else {
      setSelectedImpuestos(selectedImpuestos.filter(iId => iId !== id));
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
              Agregar Impuesto
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Calculadora Impuestos
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
              <option value="Todos">Todos los tipos</option>
              <option value="Nacional">Nacional</option>
              <option value="Provincial">Provincial</option>
              <option value="Municipal">Municipal</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar impuestos..."
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
                  checked={selectedImpuestos.length === impuestosData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Porcentaje</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Descripción</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Aplica Facturación</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {impuestosData.map((impuesto) => (
              <tr 
                key={impuesto.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedImpuestos.includes(impuesto.id)}
                    onCheckedChange={(checked) => handleSelectImpuesto(impuesto.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-900 font-medium font-mono">{impuesto.codigo}</td>
                <td className="px-3 py-2 text-gray-900 font-medium">{impuesto.nombre}</td>
                <td className="px-3 py-2 text-gray-700">{impuesto.tipo}</td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">{impuesto.porcentaje}%</td>
                <td className="px-3 py-2 text-gray-700">{impuesto.descripcion}</td>
                <td className="px-3 py-2 text-center">
                  {impuesto.aplicaFacturacion ? (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-normal">
                      Sí
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs font-normal">
                      No
                    </Badge>
                  )}
                </td>
                <td className="px-3 py-2">
                  {impuesto.estado === 'Activo' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">
                      Activo
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs font-normal">
                      Inactivo
                    </Badge>
                  )}
                </td>
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
          Registros del 1 al {impuestosData.length} de {impuestosData.length} registros
        </div>
      </div>
    </div>
  );
}
