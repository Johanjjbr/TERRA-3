import { useState } from 'react';
import { Plus, Save, Edit, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface Variable {
  id: string;
  nombre: string;
  codigo: string;
  valor: string;
  descripcion: string;
}

const variablesData: Variable[] = [
  {
    id: '1',
    nombre: 'Tasa de Interés Mensual',
    codigo: 'interes_mora',
    valor: '3.5',
    descripcion: 'Porcentaje de recargo por pago fuera de término',
  },
  {
    id: '2',
    nombre: 'Días de Gracia',
    codigo: 'dias_gracia',
    valor: '5',
    descripcion: 'Días adicionales sin recargo después del vencimiento',
  },
  {
    id: '3',
    nombre: 'IVA General',
    codigo: 'iva_general',
    valor: '21',
    descripcion: 'Porcentaje de IVA aplicado a servicios',
  },
  {
    id: '4',
    nombre: 'Descuento Pago Anticipado',
    codigo: 'desc_pago_anticipado',
    valor: '10',
    descripcion: 'Porcentaje de descuento por pago antes de la fecha',
  },
  {
    id: '5',
    nombre: 'Email Soporte',
    codigo: 'email_soporte',
    valor: 'soporte@ciudadfibra.com',
    descripcion: 'Email de contacto para soporte técnico',
  },
  {
    id: '6',
    nombre: 'Teléfono Atención',
    codigo: 'tel_atencion',
    valor: '+54 264 123-4567',
    descripcion: 'Teléfono de atención al cliente',
  },
  {
    id: '7',
    nombre: 'Velocidad Mínima Plan',
    codigo: 'velocidad_minima',
    valor: '10',
    descripcion: 'Velocidad mínima en Mbps para planes básicos',
  },
  {
    id: '8',
    nombre: 'Recargo Instalación',
    codigo: 'recargo_instalacion',
    valor: '2500',
    descripcion: 'Costo de instalación del servicio',
  },
  {
    id: '9',
    nombre: 'Descuento Familiar',
    codigo: 'desc_familiar',
    valor: '15',
    descripcion: 'Descuento por tener múltiples servicios en la misma dirección',
  },
  {
    id: '10',
    nombre: 'Límite Deuda',
    codigo: 'limite_deuda',
    valor: '2',
    descripcion: 'Cantidad de facturas impagas antes del corte automático',
  },
];

export function VariablesView() {
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVariables(variablesData.map(v => v.id));
    } else {
      setSelectedVariables([]);
    }
  };

  const handleSelectVariable = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedVariables([...selectedVariables, id]);
    } else {
      setSelectedVariables(selectedVariables.filter(vId => vId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Icon buttons */}
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Nueva variable">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Guardar">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Editar">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar variable..."
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
                  checked={selectedVariables.length === variablesData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Valor</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Descripción</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700 w-24">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {variablesData.map((variable) => (
              <tr 
                key={variable.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedVariables.includes(variable.id)}
                    onCheckedChange={(checked) => handleSelectVariable(variable.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 font-medium text-gray-900">{variable.nombre}</td>
                <td className="px-3 py-2">
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600 font-mono">
                    {variable.codigo}
                  </code>
                </td>
                <td className="px-3 py-2 font-semibold text-gray-900">{variable.valor}</td>
                <td className="px-3 py-2 text-gray-600">{variable.descripcion}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Editar">
                      <Edit className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Eliminar">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
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
          Registros del 1 al 10 de {variablesData.length} registros
        </div>
      </div>
    </div>
  );
}
