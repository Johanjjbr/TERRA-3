import { useState } from 'react';
import { Plus, FileDown, RefreshCw, Search, Filter, ChevronLeft, ChevronRight, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface Proveedor {
  id: string;
  codigo: string;
  nombre: string;
  cuit: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  estado: 'Activo' | 'Inactivo';
  contacto: string;
}

const proveedoresData: Proveedor[] = [
  {
    id: '1',
    codigo: 'PROV001',
    nombre: 'FiberTech Solutions',
    cuit: '30-12345678-9',
    telefono: '+54 264 123-4567',
    email: 'ventas@fibertech.com',
    direccion: 'Av. Libertador 1234',
    ciudad: 'San Juan',
    estado: 'Activo',
    contacto: 'Carlos Gómez',
  },
  {
    id: '2',
    codigo: 'PROV002',
    nombre: 'Distribuidora Huawei Argentina',
    cuit: '30-98765432-1',
    telefono: '+54 11 4567-8901',
    email: 'info@huawei-dist.com.ar',
    direccion: 'Av. Córdoba 5678',
    ciudad: 'CABA',
    estado: 'Activo',
    contacto: 'María Rodríguez',
  },
  {
    id: '3',
    codigo: 'PROV003',
    nombre: 'Cables y Conectores SRL',
    cuit: '30-55555555-5',
    telefono: '+54 264 234-5678',
    email: 'ventas@cablesyconectores.com',
    direccion: 'Calle Mitre 890',
    ciudad: 'San Juan',
    estado: 'Activo',
    contacto: 'Juan Pérez',
  },
  {
    id: '4',
    codigo: 'PROV004',
    nombre: 'Tech Import SA',
    cuit: '30-77777777-7',
    telefono: '+54 11 9876-5432',
    email: 'compras@techimport.com',
    direccion: 'Av. Rivadavia 3456',
    ciudad: 'CABA',
    estado: 'Inactivo',
    contacto: 'Laura Martínez',
  },
];

export function ProveedoresTable() {
  const [selectedProveedores, setSelectedProveedores] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProveedores(proveedoresData.map(p => p.id));
    } else {
      setSelectedProveedores([]);
    }
  };

  const handleSelectProveedor = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProveedores([...selectedProveedores, id]);
    } else {
      setSelectedProveedores(selectedProveedores.filter(pId => pId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Agregar Proveedor
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
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Filtrar">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar proveedores..."
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
                  checked={selectedProveedores.length === proveedoresData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">CUIT</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Teléfono</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Email</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Dirección</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Ciudad</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Contacto</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {proveedoresData.map((proveedor) => (
              <tr 
                key={proveedor.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedProveedores.includes(proveedor.id)}
                    onCheckedChange={(checked) => handleSelectProveedor(proveedor.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-900 font-medium">{proveedor.codigo}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {proveedor.nombre}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700 font-mono text-xs">{proveedor.cuit}</td>
                <td className="px-3 py-2 text-gray-700">{proveedor.telefono}</td>
                <td className="px-3 py-2">
                  <a href={`mailto:${proveedor.email}`} className="text-blue-600 hover:underline">
                    {proveedor.email}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{proveedor.direccion}</td>
                <td className="px-3 py-2 text-gray-700">{proveedor.ciudad}</td>
                <td className="px-3 py-2 text-gray-700">{proveedor.contacto}</td>
                <td className="px-3 py-2">
                  {proveedor.estado === 'Activo' ? (
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
                    <button className="p-1.5 hover:bg-green-50 rounded transition-colors" title="Llamar">
                      <Phone className="w-3.5 h-3.5 text-green-600" />
                    </button>
                    <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Email">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
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
          Registros del 1 al {proveedoresData.length} de {proveedoresData.length} registros
        </div>
      </div>
    </div>
  );
}
