import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

interface ConfigItem {
  id: string;
  name: string;
}

interface AsuntoGroup {
  id: string;
  name: string;
  expanded: boolean;
  items: ConfigItem[];
}

const areasData: ConfigItem[] = [
  { id: '1', name: 'Soporte Técnico' },
  { id: '2', name: 'Ventas' },
  { id: '3', name: 'Administración' },
  { id: '4', name: 'Bajas' },
];

const estadosData: ConfigItem[] = [
  { id: '1', name: 'Abierto' },
  { id: '2', name: 'En proceso' },
  { id: '3', name: 'Resuelto' },
  { id: '4', name: 'Cerrado' },
  { id: '5', name: 'Rechazado' },
];

const asuntosDataInitial: AsuntoGroup[] = [
  {
    id: '1',
    name: 'Soporte Técnico',
    expanded: true,
    items: [
      { id: '1-1', name: 'Activación' },
      { id: '1-2', name: 'Baja' },
      { id: '1-3', name: 'Cambio de domicilio' },
      { id: '1-4', name: 'Corte de Fibra' },
      { id: '1-5', name: 'Falta de servicio' },
      { id: '1-6', name: 'INSTALACION' },
    ],
  },
  {
    id: '2',
    name: 'Ventas',
    expanded: false,
    items: [
      { id: '2-1', name: 'Consulta de cobertura' },
      { id: '2-2', name: 'Venta nueva' },
    ],
  },
];

export function ConfiguracionView() {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [hoveredEstado, setHoveredEstado] = useState<string | null>(null);
  const [asuntosData, setAsuntosData] = useState(asuntosDataInitial);

  const toggleGroup = (groupId: string) => {
    setAsuntosData(prev =>
      prev.map(group =>
        group.id === groupId ? { ...group, expanded: !group.expanded } : group
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-base font-bold text-gray-900">CONFIGURACIÓN DE TICKETS</h2>
      </div>

      {/* Content - 3 Columns */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-3 gap-6 max-w-7xl">
          {/* COLUMN 1: ÁREAS */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-lg">
              <h3 className="text-sm font-bold text-blue-900 uppercase">Áreas</h3>
              <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {areasData.map((area) => (
                <div
                  key={area.id}
                  className="relative bg-white border border-gray-200 rounded px-4 py-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                >
                  <p className="text-sm text-blue-600 text-center font-medium">{area.name}</p>
                  {hoveredArea === area.id && (
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: ESTADOS */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-lg">
              <h3 className="text-sm font-bold text-blue-900 uppercase">Estados</h3>
              <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {estadosData.map((estado) => (
                <div
                  key={estado.id}
                  className="relative bg-white border border-gray-200 rounded px-4 py-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
                  onMouseEnter={() => setHoveredEstado(estado.id)}
                  onMouseLeave={() => setHoveredEstado(null)}
                >
                  <p className="text-sm text-blue-600 text-center font-medium">{estado.name}</p>
                  {hoveredEstado === estado.id && (
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: ASUNTOS (Nested/Expandable) */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-lg">
              <h3 className="text-sm font-bold text-blue-900 uppercase">Asuntos</h3>
              <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {asuntosData.map((group) => (
                <div key={group.id}>
                  {/* Group Header */}
                  <div
                    className="bg-gray-100 border border-gray-200 rounded px-3 py-2.5 cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-between"
                    onClick={() => toggleGroup(group.id)}
                  >
                    <span className="text-sm text-gray-700 font-medium">{group.name}</span>
                    {group.expanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </div>

                  {/* Sub-items */}
                  {group.expanded && (
                    <div className="mt-1 ml-4 space-y-1">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-gray-200 rounded px-3 py-2 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                        >
                          <p className="text-xs text-blue-600 font-medium">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
