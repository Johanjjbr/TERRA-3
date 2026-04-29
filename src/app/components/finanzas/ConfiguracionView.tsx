import { Plus } from 'lucide-react';

interface ConfigItem {
  id: string;
  title: string;
  description: string;
}

const cuentasBancariasData: ConfigItem[] = [
  { id: '1', title: 'Banco Santander Río', description: 'CC 1234567890' },
  { id: '2', title: 'Banco Nación', description: 'CA 9876543210' },
  { id: '3', title: 'Mercado Pago', description: 'CVU Digital' },
];

const metodosCobroData: ConfigItem[] = [
  { id: '1', title: 'Efectivo', description: 'Pago en oficina' },
  { id: '2', title: 'Transferencia', description: 'Bancaria/Digital' },
  { id: '3', title: 'Tarjeta Débito', description: 'Posnet' },
  { id: '4', title: 'Tarjeta Crédito', description: 'Posnet' },
];

const conceptosData: ConfigItem[] = [
  { id: '1', title: 'Servicio Internet', description: 'Plan mensual' },
  { id: '2', title: 'Instalación', description: 'Cargo único' },
  { id: '3', title: 'Equipo CPE', description: 'Venta de router' },
  { id: '4', title: 'Multa por mora', description: 'Recargo' },
];

export function ConfiguracionView() {
  return (
    <div className="flex-1 flex gap-4 p-6 bg-gray-50 overflow-auto">
      {/* CUENTAS BANCARIAS Column */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Cuentas Bancarias</h3>
            <button className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Cards */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {cuentasBancariasData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
              >
                <p className="text-sm text-gray-900 font-medium mb-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MÉTODOS DE COBRO Column */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Métodos de Cobro</h3>
            <button className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Cards */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {metodosCobroData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
              >
                <p className="text-sm text-gray-900 font-medium mb-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONCEPTOS DE FACTURACIÓN Column */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Conceptos de Facturación</h3>
            <button className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Cards */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {conceptosData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
              >
                <p className="text-sm text-gray-900 font-medium mb-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
