import { useState } from 'react';
import { Plus, Save, Tag, Trash2, Filter, Search, ChevronLeft, ChevronRight, Edit, MoreVertical } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  unidadMedida: string;
  moneda: string;
  costo: string;
  valorVenta: string;
  stock: string;
  rotos: string;
  disponibles: number;
  etiquetas: string;
  fechaAlta: string;
  ultimaMod: string;
  numeroSerie: string;
  eliminado: string;
}

const productosData: Producto[] = [
  {
    id: '1',
    codigo: 'routerglc',
    nombre: 'ROUTER GLC ALPHA C4',
    unidadMedida: 'Unidades',
    moneda: 'Pesos',
    costo: '0,00',
    valorVenta: '50.000,00',
    stock: '992',
    rotos: '0',
    disponibles: 992,
    etiquetas: '',
    fechaAlta: '05/09/2024',
    ultimaMod: '05/09/2024',
    numeroSerie: '',
    eliminado: '',
  },
  {
    id: '2',
    codigo: 'onuwifi',
    nombre: 'Onu Wi Fi',
    unidadMedida: 'Unidades',
    moneda: 'Pesos',
    costo: '40.000,00',
    valorVenta: '40.000,00',
    stock: '0',
    rotos: '0',
    disponibles: -5,
    etiquetas: '',
    fechaAlta: '10/08/2024',
    ultimaMod: '15/03/2026',
    numeroSerie: '',
    eliminado: '',
  },
  {
    id: '3',
    codigo: 'cablecat6',
    nombre: 'Cable UTP Cat6 x 305m',
    unidadMedida: 'Metros',
    moneda: 'Pesos',
    costo: '150.000,00',
    valorVenta: '180.000,00',
    stock: '1220',
    rotos: '15',
    disponibles: 1205,
    etiquetas: 'Cables',
    fechaAlta: '01/01/2024',
    ultimaMod: '18/03/2026',
    numeroSerie: '',
    eliminado: '',
  },
  {
    id: '4',
    codigo: 'splitter8',
    nombre: 'Splitter Óptico 1x8',
    unidadMedida: 'Unidades',
    moneda: 'Pesos',
    costo: '8.500,00',
    valorVenta: '12.000,00',
    stock: '45',
    rotos: '2',
    disponibles: 43,
    etiquetas: 'Fibra Óptica',
    fechaAlta: '15/06/2024',
    ultimaMod: '10/03/2026',
    numeroSerie: '',
    eliminado: '',
  },
];

export function ProductosTable() {
  const [selectedProductos, setSelectedProductos] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProductos(productosData.map(p => p.id));
    } else {
      setSelectedProductos([]);
    }
  };

  const handleSelectProducto = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProductos([...selectedProductos, id]);
    } else {
      setSelectedProductos(selectedProductos.filter(pId => pId !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Icon buttons */}
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Agregar">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Guardar">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Etiquetas">
              <Tag className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Text buttons */}
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Agregar stock
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <span className="text-sm">−</span>
              Restar stock
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <span className="text-sm">⇄</span>
              Mover productos
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <Edit className="w-3.5 h-3.5" />
              Modificar estado
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
                  checked={selectedProductos.length === productosData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">U. de medida</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Moneda</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Costo</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Valor venta</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Stock</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Rotos</th>
              <th className="px-3 py-2 text-right font-medium text-gray-700">Disponibles</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Etiquetas</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha alta</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Última mod.</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Número de serie</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Eliminado</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {productosData.map((producto) => (
              <tr 
                key={producto.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedProductos.includes(producto.id)}
                    onCheckedChange={(checked) => handleSelectProducto(producto.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-700">{producto.codigo}</td>
                <td className="px-3 py-2">
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {producto.nombre}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-700">{producto.unidadMedida}</td>
                <td className="px-3 py-2 text-gray-700">{producto.moneda}</td>
                <td className="px-3 py-2 text-gray-700 text-right">{producto.costo}</td>
                <td className="px-3 py-2 text-gray-700 text-right">{producto.valorVenta}</td>
                <td className="px-3 py-2 text-gray-700 text-right">{producto.stock}</td>
                <td className="px-3 py-2 text-gray-700 text-right">{producto.rotos}</td>
                <td className={`px-3 py-2 text-right font-bold ${
                  producto.disponibles > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {producto.disponibles}
                </td>
                <td className="px-3 py-2 text-gray-700">{producto.etiquetas || '--'}</td>
                <td className="px-3 py-2 text-gray-700">{producto.fechaAlta}</td>
                <td className="px-3 py-2 text-gray-700">{producto.ultimaMod}</td>
                <td className="px-3 py-2 text-gray-700">{producto.numeroSerie || '--'}</td>
                <td className="px-3 py-2 text-gray-700">{producto.eliminado || '--'}</td>
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
          Registros del 1 al {productosData.length} de {productosData.length} registros
        </div>
      </div>
    </div>
  );
}
