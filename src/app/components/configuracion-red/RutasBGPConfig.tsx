import { useState } from 'react';

export function RutasBGPConfig() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="max-w-lg">
      {/* Texto informativo */}
      <p className="text-xs text-gray-600 mb-6">
        Desde acá podrá inyectar rutas hacia sus Servidores BGP
      </p>

      {/* Formulario */}
      <div className="space-y-4">
        {/* Toggle Estado */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-600 w-20">Estado</span>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Network */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Network
          </label>
          <input
            type="text"
            placeholder=""
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Server BGP */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Server BGP
          </label>
          <select className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white">
            <option value="">Seleccionar servidor</option>
            <option value="bgp-1">BGP Server 1</option>
            <option value="bgp-2">BGP Server 2</option>
            <option value="bgp-3">BGP Server 3</option>
          </select>
        </div>

        {/* Gateway */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Gateway
          </label>
          <input
            type="text"
            placeholder=""
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Comentario */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Comentario
          </label>
          <input
            type="text"
            placeholder=""
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Botón Guardar */}
        <div className="pt-4">
          <button className="px-6 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
            GUARDAR
          </button>
        </div>
      </div>
    </div>
  );
}
