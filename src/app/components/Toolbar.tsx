import { Plus, Save, Edit, Trash2, Map, Activity, Info, Search } from 'lucide-react';

export function Toolbar() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Icon buttons */}
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Agregar">
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Guardar">
            <Save className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Editar">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Eliminar">
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          {/* Text buttons */}
          <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <Map className="w-3.5 h-3.5" />
            Mapa
          </button>
          <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            Log de Tráfico
          </button>
          <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            Tráfico
          </button>
          <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Info CPE-ONU
          </button>
        </div>

        {/* Search */}
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
  );
}
