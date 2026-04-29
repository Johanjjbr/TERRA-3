import { useState } from 'react';
import { 
  FileText, 
  Users, 
  Ticket, 
  MessageSquare, 
  Package, 
  CreditCard,
  DollarSign,
  Mail,
  BarChart3,
  Shield
} from 'lucide-react';
import { Switch } from '../ui/switch';

interface Modulo {
  id: string;
  titulo: string;
  descripcion: string;
  icon: any;
  activo: boolean;
}

const modulosData: Modulo[] = [
  {
    id: 'facturacion-afip',
    titulo: 'Facturación Electrónica AFIP',
    descripcion: 'Genera comprobantes electrónicos autorizados por AFIP y los envía automáticamente',
    icon: FileText,
    activo: true,
  },
  {
    id: 'portal-clientes',
    titulo: 'Portal de Clientes',
    descripcion: 'Permite a los clientes ver sus facturas y pagar online desde su cuenta',
    icon: Users,
    activo: true,
  },
  {
    id: 'sistema-tickets',
    titulo: 'Sistema de Tickets',
    descripcion: 'Gestión completa de soporte técnico con asignación automática de tickets',
    icon: Ticket,
    activo: true,
  },
  {
    id: 'integracion-whatsapp',
    titulo: 'Integración WhatsApp',
    descripcion: 'Envía notificaciones y avisos de pago directamente por WhatsApp',
    icon: MessageSquare,
    activo: false,
  },
  {
    id: 'control-inventario',
    titulo: 'Control de Inventario',
    descripcion: 'Administra equipos, productos y movimientos de stock en tiempo real',
    icon: Package,
    activo: true,
  },
  {
    id: 'pagos-online',
    titulo: 'Pagos Online (Mercado Pago)',
    descripcion: 'Acepta pagos con tarjeta y transferencias a través de Mercado Pago',
    icon: CreditCard,
    activo: false,
  },
  {
    id: 'cobranzas',
    titulo: 'Módulo de Cobranzas',
    descripcion: 'Gestiona cobradores, rutas y rendiciones de caja de forma organizada',
    icon: DollarSign,
    activo: true,
  },
  {
    id: 'email-marketing',
    titulo: 'Email Marketing',
    descripcion: 'Crea campañas de email masivas para promociones y comunicados',
    icon: Mail,
    activo: false,
  },
  {
    id: 'reportes-analytics',
    titulo: 'Reportes y Analytics',
    descripcion: 'Visualiza métricas de negocio con dashboards interactivos y reportes',
    icon: BarChart3,
    activo: true,
  },
  {
    id: 'autenticacion-2fa',
    titulo: 'Autenticación 2FA',
    descripcion: 'Añade una capa extra de seguridad con verificación en dos pasos',
    icon: Shield,
    activo: false,
  },
];

export function ModulosView() {
  const [modulos, setModulos] = useState(modulosData);

  const handleToggleModulo = (id: string, checked: boolean) => {
    setModulos(prev =>
      prev.map(modulo =>
        modulo.id === id ? { ...modulo, activo: checked } : modulo
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulos.map((modulo) => {
              const Icon = modulo.icon;
              return (
                <div
                  key={modulo.id}
                  className={`bg-white rounded-lg border-2 shadow-sm p-5 transition-all hover:shadow-md ${
                    modulo.activo
                      ? 'border-blue-300 hover:border-blue-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-2.5 rounded-lg ${
                        modulo.activo
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          modulo.activo ? 'text-blue-600' : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <Switch
                      checked={modulo.activo}
                      onCheckedChange={(checked) => handleToggleModulo(modulo.id, checked)}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className={`text-sm font-bold mb-2 ${
                        modulo.activo ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {modulo.titulo}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        modulo.activo ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      {modulo.descripcion}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <span
                      className={`text-xs font-semibold ${
                        modulo.activo ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {modulo.activo ? '● Activo' : '○ Inactivo'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
