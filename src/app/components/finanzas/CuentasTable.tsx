import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Building2, ChevronLeft, ChevronRight, Edit, Trash2, Eye } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Cuenta {
  id: string;
  nombre: string;
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  cbu: string;
  alias: string;
  saldo: string;
  estado: 'Activa' | 'Inactiva';
}

const cuentasData: Cuenta[] = [
  {
    id: '1',
    nombre: 'Cuenta Principal',
    banco: 'Banco Santander Río',
    tipoCuenta: 'Cuenta Corriente',
    numeroCuenta: '1234567890',
    cbu: '0720001520000012345670',
    alias: 'CIUDAD.FIBRA.PRINCIPAL',
    saldo: '1.245.680,50',
    estado: 'Activa',
  },
  {
    id: '2',
    nombre: 'Cuenta Secundaria',
    banco: 'Banco Nación',
    tipoCuenta: 'Caja de Ahorro',
    numeroCuenta: '9876543210',
    cbu: '0110005530000098765432',
    alias: 'CIUDAD.FIBRA.AHORRO',
    saldo: '540.250,00',
    estado: 'Activa',
  },
  {
    id: '3',
    nombre: 'Cuenta Mercado Pago',
    banco: 'Mercado Pago',
    tipoCuenta: 'CVU',
    numeroCuenta: '0000003100123456789012',
    cbu: '0000003100123456789012',
    alias: 'CIUDAD.FIBRA.MP',
    saldo: '85.420,75',
    estado: 'Activa',
  },
  {
    id: '4',
    nombre: 'Cuenta Histórica',
    banco: 'Banco Galicia',
    tipoCuenta: 'Cuenta Corriente',
    numeroCuenta: '5555666677',
    cbu: '0070005520000055556666',
    alias: 'CIUDAD.FIBRA.OLD',
    saldo: '0,00',
    estado: 'Inactiva',
  },
];

export function CuentasTable() {
  const [selectedCuentas, setSelectedCuentas] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCuentas(cuentasData.map(c => c.id));
    } else {
      setSelectedCuentas([]);
    }
  };

  const handleSelectCuenta = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCuentas([...selectedCuentas, id]);
    } else {
      setSelectedCuentas(selectedCuentas.filter(cId => cId !== id));
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
              Agregar Cuenta
            </button>
            <button className="px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              Sincronizar Bancos
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Recargar">
              <RefreshCw className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cuentas..."
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
                  checked={selectedCuentas.length === cuentasData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Banco</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Número de Cuenta</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">CBU/CVU</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Alias</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Saldo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {cuentasData.map((cuenta) => (
              <tr 
                key={cuenta.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedCuentas.includes(cuenta.id)}
                    onCheckedChange={(checked) => handleSelectCuenta(cuenta.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-900 font-medium">{cuenta.nombre}</td>
                <td className="px-3 py-2 text-gray-700">{cuenta.banco}</td>
                <td className="px-3 py-2 text-gray-700">{cuenta.tipoCuenta}</td>
                <td className="px-3 py-2 text-gray-700 font-mono text-xs">{cuenta.numeroCuenta}</td>
                <td className="px-3 py-2 text-gray-700 font-mono text-xs">{cuenta.cbu}</td>
                <td className="px-3 py-2 text-blue-600 font-medium">{cuenta.alias}</td>
                <td className="px-3 py-2 text-gray-900 text-right font-semibold">$ {cuenta.saldo}</td>
                <td className="px-3 py-2">
                  {cuenta.estado === 'Activa' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">
                      Activa
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs font-normal">
                      Inactiva
                    </Badge>
                  )}
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Ver movimientos">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                    </button>
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
          Registros del 1 al {cuentasData.length} de {cuentasData.length} registros
        </div>
      </div>
    </div>
  );
}
