import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Cliente {
  id: string;
  razonSocial: string;
  estado: 'Habilitado' | 'Bloqueado';
  telefono: string;
  ciudad: string;
  saldo: string;
}

const clientesData: Cliente[] = [
  {
    id: '000416',
    razonSocial: 'JORGE ALBERTO HERRERA',
    estado: 'Habilitado',
    telefono: '2645450109',
    ciudad: 'Caucete',
    saldo: '0,00',
  },
  {
    id: '000352',
    razonSocial: 'LORENA CABRERA GO',
    estado: 'Habilitado',
    telefono: '2645800235',
    ciudad: 'Caucete',
    saldo: '0,00',
  },
  {
    id: '000364',
    razonSocial: 'RODRIGO EDITH ERO',
    estado: 'Bloqueado',
    telefono: '2644819848',
    ciudad: 'Valle Fertil',
    saldo: '20.000,00',
  },
  {
    id: '000531',
    razonSocial: 'JOSE ALEXIS SALAZA',
    estado: 'Habilitado',
    telefono: '2810158994',
    ciudad: 'Caucete',
    saldo: '115.000,00',
  },
  {
    id: '000759',
    razonSocial: 'JOSE ANTONIO SARD',
    estado: 'Habilitado',
    telefono: '2615219636',
    ciudad: 'Caucete',
    saldo: '0,00',
  },
  {
    id: '000458',
    razonSocial: 'FABIAN ANTONIO SA',
    estado: 'Bloqueado',
    telefono: '2646347761',
    ciudad: 'Valle Fertil',
    saldo: '115.000,00',
  },
];

export function ClientesTable() {
  const [selectedClientes, setSelectedClientes] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClientes(clientesData.map(c => c.id));
    } else {
      setSelectedClientes([]);
    }
  };

  const handleSelectCliente = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedClientes([...selectedClientes, id]);
    } else {
      setSelectedClientes(selectedClientes.filter(cId => cId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-screen">
      {/* Top Tab */}
      <div className="border-b border-gray-200 px-4 py-2 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Clientes</span>
          <button className="p-0.5 hover:bg-gray-100 rounded transition-colors">
            <span className="text-gray-400 text-xs">✕</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-3 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Agregar
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" />
              Exportar Excel
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
              placeholder="Buscar clientes..."
              className="flex-1 text-xs outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left w-12">
                <Checkbox 
                  checked={selectedClientes.length === clientesData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Id</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Razón Social</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Estado</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Teléfono</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Ciudad</th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">Saldo</th>
              <th className="px-4 py-3 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clientesData.map((cliente, index) => (
              <tr 
                key={cliente.id}
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-3">
                  <Checkbox 
                    checked={selectedClientes.includes(cliente.id)}
                    onCheckedChange={(checked) => handleSelectCliente(cliente.id, checked as boolean)}
                  />
                </td>
                <td className="px-4 py-3 text-gray-700">{cliente.id}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{cliente.razonSocial}</td>
                <td className="px-4 py-3">
                  {cliente.estado === 'Habilitado' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs font-normal">
                      Habilitado
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-normal">
                      Bloqueado
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{cliente.telefono}</td>
                <td className="px-4 py-3 text-gray-700">{cliente.ciudad}</td>
                <td className="px-4 py-3 text-gray-700 text-right font-medium">$ {cliente.saldo}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button 
                      className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button 
                      className="p-1.5 hover:bg-red-50 rounded transition-colors"
                      title="Eliminar"
                    >
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
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
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
          <span>registros por página</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            3
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Mostrando 1-{clientesData.length} de {clientesData.length} registros
        </div>
      </div>
    </div>
  );
}
