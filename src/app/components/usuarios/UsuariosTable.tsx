import { useState } from 'react';
import { Plus, Save, Trash2, RefreshCw, MapPin, Package, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { useTabs } from '../../contexts/TabsContext';

interface Usuario {
  id: string;
  usuario: string;
  nombre: string;
  creado: string;
  operador: string;
  vendedor: string;
  habilitado: boolean;
  twoFA: string;
  ultimoLogueo: string;
  eliminado: string;
  emailRecuperacion: string;
}

const usuariosData: Usuario[] = [
  {
    id: '1',
    usuario: 'caucete.area1',
    nombre: 'CAUCETE AREA 1',
    creado: '24/02/2026',
    operador: 'Si',
    vendedor: 'No',
    habilitado: true,
    twoFA: 'No',
    ultimoLogueo: '24/02/2026 09:23:44',
    eliminado: 'No',
    emailRecuperacion: '',
  },
  {
    id: '2',
    usuario: 'caucete.area2',
    nombre: 'CAUCETE AREA 2',
    creado: '24/02/2026',
    operador: 'Si',
    vendedor: 'No',
    habilitado: true,
    twoFA: 'No',
    ultimoLogueo: '',
    eliminado: 'No',
    emailRecuperacion: '',
  },
  {
    id: '3',
    usuario: 'cobrador1',
    nombre: 'COBRADOR 1',
    creado: '09/01/2026',
    operador: 'Si',
    vendedor: 'No',
    habilitado: true,
    twoFA: 'No',
    ultimoLogueo: '09/01/2026 12:43:03',
    eliminado: 'No',
    emailRecuperacion: '',
  },
  {
    id: '4',
    usuario: 'admin',
    nombre: 'ADMINISTRADOR',
    creado: '01/01/2026',
    operador: 'Si',
    vendedor: 'Si',
    habilitado: true,
    twoFA: 'Si',
    ultimoLogueo: '18/03/2026 15:30:12',
    eliminado: 'No',
    emailRecuperacion: 'admin@ispfibra.com',
  },
  {
    id: '5',
    usuario: 'vendedor1',
    nombre: 'VENDEDOR PRINCIPAL',
    creado: '15/01/2026',
    operador: 'No',
    vendedor: 'Si',
    habilitado: true,
    twoFA: 'No',
    ultimoLogueo: '17/03/2026 10:15:00',
    eliminado: 'No',
    emailRecuperacion: '',
  },
  {
    id: '6',
    usuario: 'soporte1',
    nombre: 'SOPORTE TECNICO 1',
    creado: '20/01/2026',
    operador: 'Si',
    vendedor: 'No',
    habilitado: true,
    twoFA: 'No',
    ultimoLogueo: '18/03/2026 08:00:00',
    eliminado: 'No',
    emailRecuperacion: 'soporte1@ispfibra.com',
  },
  {
    id: '7',
    usuario: 'usuario.inactivo',
    nombre: 'USUARIO INACTIVO',
    creado: '10/12/2025',
    operador: 'No',
    vendedor: 'No',
    habilitado: false,
    twoFA: 'No',
    ultimoLogueo: '15/12/2025 14:20:00',
    eliminado: 'No',
    emailRecuperacion: '',
  },
  {
    id: '8',
    usuario: 'tecnico1',
    nombre: 'TECNICO DE CAMPO 1',
    creado: '05/02/2026',
    operador: 'Si',
    vendedor: 'No',
    habilitado: true,
    twoFA: 'No',
    ultimoLogueo: '18/03/2026 07:45:30',
    eliminado: 'No',
    emailRecuperacion: '',
  },
  {
    id: '9',
    usuario: 'atencion.cliente',
    nombre: 'ATENCION AL CLIENTE',
    creado: '12/02/2026',
    operador: 'Si',
    vendedor: 'No',
    habilitado: true,
    twoFA: 'No',
    ultimoLogueo: '18/03/2026 09:00:00',
    eliminado: 'No',
    emailRecuperacion: 'atencion@ispfibra.com',
  },
  {
    id: '10',
    usuario: 'supervisor',
    nombre: 'SUPERVISOR',
    creado: '08/01/2026',
    operador: 'Si',
    vendedor: 'Si',
    habilitado: true,
    twoFA: 'Si',
    ultimoLogueo: '18/03/2026 08:30:00',
    eliminado: 'No',
    emailRecuperacion: 'supervisor@ispfibra.com',
  },
];

export function UsuariosTable() {
  const [selectedUsuarios, setSelectedUsuarios] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const { addTab } = useTabs();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsuarios(usuariosData.map(u => u.id));
    } else {
      setSelectedUsuarios([]);
    }
  };

  const handleSelectUsuario = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsuarios([...selectedUsuarios, id]);
    } else {
      setSelectedUsuarios(selectedUsuarios.filter(uId => uId !== id));
    }
  };

  const handleCreateUsuario = () => {
    addTab({
      id: 'crear-usuario',
      label: 'Nuevo Usuario',
      type: 'crear-usuario',
    });
  };

  const handleEditUsuario = (usuario: Usuario) => {
    addTab({
      id: `editar-usuario-${usuario.id}`,
      label: `Usuario: ${usuario.nombre}`,
      type: 'editar-usuario',
      data: usuario,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Icon buttons */}
            <button 
              onClick={handleCreateUsuario}
              className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" 
              title="Nuevo usuario"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Guardar">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Recargar">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Mapa">
              <MapPin className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Paquete">
              <Package className="w-4 h-4 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />
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
                  checked={selectedUsuarios.length === usuariosData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Usuario</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Creado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Operador</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Vendedor</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Habilitado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">2FA</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Ult. Logueo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Elim.</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Email de recuperación</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {usuariosData.map((usuario) => (
              <tr 
                key={usuario.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedUsuarios.includes(usuario.id)}
                    onCheckedChange={(checked) => handleSelectUsuario(usuario.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2">
                  <button 
                    onClick={() => handleEditUsuario(usuario)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {usuario.usuario}
                  </button>
                </td>
                <td className="px-3 py-2">
                  <button 
                    onClick={() => handleEditUsuario(usuario)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {usuario.nombre}
                  </button>
                </td>
                <td className="px-3 py-2 text-gray-700">{usuario.creado}</td>
                <td className="px-3 py-2 text-gray-700">{usuario.operador}</td>
                <td className="px-3 py-2 text-gray-700">{usuario.vendedor}</td>
                <td className="px-3 py-2">
                  {usuario.habilitado ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-300 text-xs font-semibold">
                      Habilitado
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-300 text-xs font-semibold">
                      Deshabilitado
                    </Badge>
                  )}
                </td>
                <td className="px-3 py-2 text-gray-700">{usuario.twoFA}</td>
                <td className="px-3 py-2 text-gray-700">{usuario.ultimoLogueo || '--'}</td>
                <td className="px-3 py-2 text-gray-700">{usuario.eliminado}</td>
                <td className="px-3 py-2 text-gray-700">{usuario.emailRecuperacion || '--'}</td>
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
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">2</span>
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">3</span>
          <span className="text-gray-400">...</span>
          <span className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer">6</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al 10 de 55 registros
        </div>
      </div>
    </div>
  );
}
