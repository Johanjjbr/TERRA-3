import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

interface Permiso {
  id: string;
  label: string;
  checked: boolean;
}

interface GrupoPermiso {
  id: string;
  titulo: string;
  allChecked: boolean;
  permisos: Permiso[];
}

const permisosDataInitial: GrupoPermiso[] = [
  {
    id: 'ajustes-facturacion',
    titulo: 'Ajustes de facturación',
    allChecked: true,
    permisos: [
      { id: 'ajustes-facturac-1', label: 'Ajustes de facturac...', checked: true },
      { id: 'ajustes-impresio-1', label: 'Ajustes de impresio...', checked: true },
    ],
  },
  {
    id: 'app-portal',
    titulo: 'App y portal',
    allChecked: true,
    permisos: [
      { id: 'app-portal-1', label: 'App y portal de cli...', checked: true },
      { id: 'portal-app-1', label: 'Portal app', checked: true },
    ],
  },
  {
    id: 'cajas-fibra',
    titulo: 'Cajas de Fibra',
    allChecked: true,
    permisos: [
      { id: 'cajas-fibra-1', label: 'Cajas de Fibra', checked: true },
      { id: 'gestion-cajas-1', label: 'Gestion Cajas', checked: true },
    ],
  },
  {
    id: 'clientes',
    titulo: 'Clientes',
    allChecked: true,
    permisos: [
      { id: 'clientes-1', label: 'Clientes', checked: true },
      { id: 'clientes-app-1', label: 'Clientes App', checked: true },
      { id: 'clientes-conexiones-1', label: 'Clientes Conexiones', checked: true },
      { id: 'clientes-contratos-1', label: 'Clientes Contratos', checked: true },
      { id: 'clientes-dar-baja-1', label: 'Clientes Dar de ba...', checked: true },
      { id: 'clientes-detalles-1', label: 'Clientes Detalles', checked: true },
      { id: 'clientes-extras-1', label: 'Clientes Extras', checked: true },
      { id: 'clientes-promocion-1', label: 'Clientes Promocion...', checked: true },
      { id: 'clientes-notas-1', label: 'Clientes Notas', checked: true },
      { id: 'clientes-servicios-1', label: 'Clientes Servicios', checked: true },
      { id: 'clientes-editar-1', label: 'Clientes Editar', checked: true },
      { id: 'clientes-crear-1', label: 'Clientes Crear', checked: true },
    ],
  },
  {
    id: 'comunicaciones',
    titulo: 'Comunicaciones',
    allChecked: true,
    permisos: [
      { id: 'comunicaciones-1', label: 'Comunicaciones', checked: true },
      { id: 'comunicaciones-c-1', label: 'Comunicaciones C...', checked: true },
      { id: 'comunicaciones-m-1', label: 'Comunicaciones M...', checked: true },
    ],
  },
  {
    id: 'contable',
    titulo: 'Contable',
    allChecked: true,
    permisos: [
      { id: 'caja-1', label: 'Caja', checked: true },
      { id: 'cuentas-1', label: 'Cuentas', checked: true },
      { id: 'impuestos-1', label: 'Impuestos', checked: true },
      { id: 'planes-cuenta-1', label: 'Planes de cuenta', checked: true },
      { id: 'puntos-venta-1', label: 'Puntos de venta', checked: true },
    ],
  },
  {
    id: 'facturacion',
    titulo: 'Facturación',
    allChecked: true,
    permisos: [
      { id: 'facturacion-1', label: 'Facturación', checked: true },
      { id: 'facturacion-crear-1', label: 'Crear factura', checked: true },
      { id: 'facturacion-mensual-1', label: 'Facturación mensual', checked: true },
      { id: 'facturacion-extras-1', label: 'Facturación extras', checked: true },
    ],
  },
  {
    id: 'gestion-red',
    titulo: 'Gestión de red',
    allChecked: true,
    permisos: [
      { id: 'gestion-red-1', label: 'Gestión de red', checked: true },
      { id: 'planes-1', label: 'Planes', checked: true },
      { id: 'nodos-1', label: 'Nodos', checked: true },
      { id: 'estado-radius-1', label: 'Estado Radius', checked: true },
    ],
  },
  {
    id: 'inventario',
    titulo: 'Inventario',
    allChecked: true,
    permisos: [
      { id: 'inventario-1', label: 'Inventario', checked: true },
      { id: 'productos-1', label: 'Productos', checked: true },
      { id: 'equipos-1', label: 'Equipos', checked: true },
      { id: 'movimientos-1', label: 'Movimientos', checked: true },
      { id: 'proveedores-1', label: 'Proveedores', checked: true },
    ],
  },
  {
    id: 'pagos',
    titulo: 'Pagos',
    allChecked: true,
    permisos: [
      { id: 'pagos-1', label: 'Pagos', checked: true },
      { id: 'pagos-asociar-1', label: 'Pagos sin asociar', checked: true },
      { id: 'pagos-banco-1', label: 'Banco Santander', checked: true },
    ],
  },
  {
    id: 'tickets',
    titulo: 'Tickets',
    allChecked: true,
    permisos: [
      { id: 'tickets-1', label: 'Tickets', checked: true },
      { id: 'tickets-calendario-1', label: 'Calendario', checked: true },
      { id: 'tickets-config-1', label: 'Configuración', checked: true },
    ],
  },
  {
    id: 'usuarios',
    titulo: 'Usuarios',
    allChecked: true,
    permisos: [
      { id: 'usuarios-1', label: 'Usuarios', checked: true },
      { id: 'usuarios-permisos-1', label: 'Permisos y vistas', checked: true },
      { id: 'usuarios-logs-1', label: 'Logs', checked: true },
    ],
  },
];

export function PermisosView() {
  const [perfilSeleccionado, setPerfilSeleccionado] = useState('administrador');
  const [permisosData, setPermisosData] = useState(permisosDataInitial);

  const handleGrupoCheckChange = (grupoId: string, checked: boolean) => {
    setPermisosData(prev =>
      prev.map(grupo =>
        grupo.id === grupoId
          ? {
              ...grupo,
              allChecked: checked,
              permisos: grupo.permisos.map(p => ({ ...p, checked })),
            }
          : grupo
      )
    );
  };

  const handlePermisoCheckChange = (grupoId: string, permisoId: string, checked: boolean) => {
    setPermisosData(prev =>
      prev.map(grupo => {
        if (grupo.id === grupoId) {
          const newPermisos = grupo.permisos.map(p =>
            p.id === permisoId ? { ...p, checked } : p
          );
          const allChecked = newPermisos.every(p => p.checked);
          return { ...grupo, permisos: newPermisos, allChecked };
        }
        return grupo;
      })
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Seleccione un Perfil:</label>
          <select
            value={perfilSeleccionado}
            onChange={(e) => setPerfilSeleccionado(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-sm outline-none bg-white w-80"
          >
            <option value="administrador">Administrador</option>
            <option value="operador">Operador</option>
            <option value="vendedor">Vendedor</option>
            <option value="soporte">Soporte Técnico</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>
      </div>

      {/* Content - Grid of Permission Groups */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {permisosData.map((grupo) => (
            <div key={grupo.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Group Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-lg">
                <h3 className="text-sm font-bold text-blue-900 truncate flex-1">{grupo.titulo}</h3>
                <Checkbox
                  checked={grupo.allChecked}
                  onCheckedChange={(checked) => handleGrupoCheckChange(grupo.id, checked as boolean)}
                />
              </div>

              {/* Permissions List */}
              <div className="p-2">
                {grupo.permisos.map((permiso) => (
                  <div
                    key={permiso.id}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <label
                      htmlFor={permiso.id}
                      className="text-xs text-blue-600 cursor-pointer flex-1 truncate"
                    >
                      {permiso.label}
                    </label>
                    <Checkbox
                      id={permiso.id}
                      checked={permiso.checked}
                      onCheckedChange={(checked) =>
                        handlePermisoCheckChange(grupo.id, permiso.id, checked as boolean)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
