import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useTabs } from '../contexts/TabsContext';
import {
  Users,
  Network,
  DollarSign,
  Tag,
  CreditCard,
  ShoppingCart,
  TrendingUp,
  ShoppingBag,
  Package,
  Wifi,
  MessageSquare,
  Ticket,
  User as UserIcon,
  Settings,
  Globe,
  Server,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Percent,
  Building2,
  Receipt,
  Activity
} from 'lucide-react';

interface SubMenuItem {
  id: string;
  label: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  active?: boolean;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'noc',
    label: 'NOC Dashboard',
    icon: Activity,
  },
  {
    id: 'clientes',
    label: 'Clientes',
    icon: Users,
    active: true,
    subItems: [
      { id: 'clientes-list', label: 'Clientes' },
      { id: 'conexiones', label: 'Conexiones' },
    ]
  },
  { 
    id: 'gestion-red', 
    label: 'Gestión de red', 
    icon: Network,
    subItems: [
      { id: 'gestion-config', label: 'Configuración' },
      { id: 'planes', label: 'Planes' },
      { id: 'nodos', label: 'Nodos' },
      { id: 'estado-radius', label: 'Estado Radius' },
      { id: 'cajas-fibra', label: 'Cajas de Fibra' },
    ]
  },
  { 
    id: 'finanzas', 
    label: 'Finanzas', 
    icon: Briefcase,
    subItems: [
      { id: 'finanzas-config', label: 'Configuración' },
      { id: 'caja', label: 'Caja' },
      { id: 'cheques', label: 'Cheques' },
      { id: 'cuentas', label: 'Cuentas' },
      { id: 'impuestos', label: 'Impuestos' },
    ]
  },
  { 
    id: 'promociones', 
    label: 'Promociones', 
    icon: Percent,
    subItems: [
      { id: 'promociones-config', label: 'Configuración' },
      { id: 'promociones-list', label: 'Promociones' },
    ]
  },
  { 
    id: 'pagos', 
    label: 'Pagos', 
    icon: Building2,
    subItems: [
      { id: 'pagos-config', label: 'Configuración' },
      { id: 'pagos-sin-asociar', label: 'Pagos sin asociar' },
      { id: 'banco-santander', label: 'Banco Santander Río' },
    ]
  },
  { 
    id: 'ventas', 
    label: 'Ventas', 
    icon: Receipt,
    subItems: [
      { id: 'mis-facturas', label: 'Mis facturas' },
      { id: 'crear-factura', label: 'Crear factura' },
      { id: 'facturacion-mensual', label: 'Facturación mensual' },
      { id: 'extras', label: 'Extras' },
      { id: 'autorizar', label: 'Autorizar' },
    ]
  },
  { id: 'recargos', label: 'Recargos', icon: ShoppingCart },
  { id: 'compras', label: 'Compras', icon: ShoppingBag },
  { 
    id: 'inventario', 
    label: 'Inventario', 
    icon: Package,
    subItems: [
      { id: 'productos', label: 'Productos' },
      { id: 'equipos', label: 'Equipos' },
      { id: 'movimientos', label: 'Movimientos' },
      { id: 'proveedores', label: 'Proveedores' },
      { id: 'compras', label: 'Compras' },
      { id: 'inventario-config', label: 'Configuración' },
    ]
  },
  { id: 'fichas-hotspot', label: 'Fichas hotspot', icon: Wifi },
  { id: 'comunicaciones', label: 'Comunicaciones', icon: MessageSquare },
  { 
    id: 'tickets', 
    label: 'Tickets', 
    icon: Ticket,
    subItems: [
      { id: 'tickets-list', label: 'Tickets' },
      { id: 'calendario', label: 'Calendario' },
      { id: 'configuracion', label: 'Configuración' },
    ]
  },
  { 
    id: 'usuarios', 
    label: 'Usuarios', 
    icon: UserIcon,
    subItems: [
      { id: 'permisos-vistas', label: 'Permisos y vistas' },
      { id: 'notificaciones-usuario', label: 'Notificaciones usuario' },
      { id: 'logs', label: 'Logs' },
    ]
  },
  { 
    id: 'configuracion', 
    label: 'Configuración', 
    icon: Settings,
    subItems: [
      { id: 'general', label: 'General' },
      { id: 'corte-bloqueo', label: 'Corte y Bloqueo' },
      { id: 'plantillas', label: 'Plantillas' },
      { id: 'empresas', label: 'Empresas' },
      { id: 'archivos', label: 'Archivos' },
      { id: 'backups', label: 'Backups' },
      { id: 'codigos-postales', label: 'Códigos postales' },
      { id: 'app-portal', label: 'App y portal' },
      { id: 'resumenes', label: 'Resúmenes' },
      { id: 'modulos', label: 'Módulos' },
      { id: 'variables', label: 'Variables' },
    ]
  },
  { id: 'configuracion-red', label: 'Configuración de red', icon: Globe },
  { id: 'ispcube', label: 'ISPCube', icon: Server },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTab } = useTabs();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    'clientes': true, // Clientes expandido por defecto
  });

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMainItemClick = (item: MenuItem) => {
    if (item.subItems && item.subItems.length > 0) {
      toggleExpand(item.id);
    } else {
      navigate(`/${item.id}`);
    }
  };

  const handleSubItemClick = (parentId: string, subItemId: string) => {
    // Special handling for Clientes section - open as tabs
    if (parentId === 'clientes') {
      if (subItemId === 'clientes-list') {
        addTab({
          id: 'clientes-list',
          label: 'Clientes',
          type: 'clientes-list',
        });
        navigate('/');
      } else if (subItemId === 'conexiones') {
        addTab({
          id: 'conexiones-list',
          label: 'Conexiones',
          type: 'conexiones-list',
        });
        navigate('/');
      }
    } else {
      // Navigate normally for other sections
      navigate(`/${parentId}/${subItemId}`);
    }
  };

  const isActive = (itemId: string, subItemId?: string) => {
    if (subItemId) {
      return location.pathname === `/${itemId}/${subItemId}`;
    }
    return location.pathname.startsWith(`/${itemId}`);
  };

  return (
    <div className="w-64 bg-slate-800 text-white h-screen flex flex-col">
      {/* Profile Section */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-slate-300" />
          </div>
          <div>
            <div className="text-sm font-semibold">JESUS</div>
            <div className="text-xs text-slate-400">(773) CIUDAD FIBRA</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <nav className="py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expanded[item.id];
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const active = isActive(item.id);
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMainItemClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-700 transition-colors ${
                    active ? 'bg-slate-700 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {hasSubItems && (
                    isExpanded ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {/* Sub-items */}
                {hasSubItems && isExpanded && (
                  <div className="bg-slate-750">
                    {item.subItems!.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubItemClick(item.id, subItem.id)}
                        className={`w-full flex items-center px-4 py-2 pl-12 text-xs hover:bg-slate-700 hover:text-white transition-colors ${
                          isActive(item.id, subItem.id) 
                            ? 'text-white bg-slate-700' 
                            : 'text-slate-300'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}