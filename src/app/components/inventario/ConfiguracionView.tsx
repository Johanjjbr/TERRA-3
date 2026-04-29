import { Plus } from 'lucide-react';

interface ConfigItem {
  id: string;
  name: string;
}

const marcasData: ConfigItem[] = [
  { id: '1', name: 'Huawei' },
  { id: '2', name: 'PHOTON' },
  { id: '3', name: 'VSOL' },
  { id: '4', name: 'GLC' },
  { id: '5', name: 'Android TV Box' },
];

const estadosData: ConfigItem[] = [
  { id: '1', name: 'Stock' },
  { id: '2', name: 'En uso' },
  { id: '3', name: 'Vendido' },
];

const depositosData: ConfigItem[] = [
  { id: '1', name: 'Terra 3 Comunicaciones' },
  { id: '2', name: 'CLIENTE' },
];

const vehiculosData: ConfigItem[] = [];

export function ConfiguracionView() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-base font-bold text-gray-900">CONFIGURACIÓN DE INVENTARIO</h2>
      </div>

      {/* Content - 4 Columns */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-4 gap-6">
          {/* COLUMN 1: MIS MARCAS */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-blue-900 uppercase">Mis Marcas</h3>
              <button className="p-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="space-y-2">
              {marcasData.map((marca) => (
                <div
                  key={marca.id}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                >
                  <p className="text-sm text-blue-600 text-center font-medium">{marca.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: ESTADOS */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-blue-900 uppercase">Estados</h3>
              <button className="p-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="space-y-2">
              {estadosData.map((estado) => (
                <div
                  key={estado.id}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                >
                  <p className="text-sm text-blue-600 text-center font-medium">{estado.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: MIS DEPÓSITOS */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-blue-900 uppercase">Mis Depósitos</h3>
              <button className="p-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="space-y-2">
              {depositosData.map((deposito) => (
                <div
                  key={deposito.id}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                >
                  <p className="text-sm text-blue-600 text-center font-medium">{deposito.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 4: MIS VEHÍCULOS */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-blue-900 uppercase">Mis Vehículos</h3>
              <button className="p-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="space-y-2">
              {vehiculosData.length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-400">
                  No hay vehículos registrados
                </div>
              ) : (
                vehiculosData.map((vehiculo) => (
                  <div
                    key={vehiculo.id}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <p className="text-sm text-blue-600 text-center font-medium">{vehiculo.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
