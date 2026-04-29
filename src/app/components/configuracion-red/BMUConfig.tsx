import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export function BMUConfig() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="max-w-lg">
      {/* Toggle de integración */}
      <div className="mb-6 flex items-center gap-3">
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
        <span className="text-xs font-medium text-gray-700">
          Habilitado
        </span>
      </div>

      {/* Formulario */}
      <div className={`space-y-4 ${!enabled ? 'opacity-50' : ''}`}>
        {/* URL BMU */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            URL BMU
          </label>
          <input
            type="text"
            placeholder=""
            disabled={!enabled}
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
          />
        </div>

        {/* Token */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Token
          </label>
          <input
            type="text"
            placeholder=""
            disabled={!enabled}
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
          />
        </div>

        {/* Enlace de instrucciones */}
        <div className="pt-2">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ver instrucciones de integración
          </a>
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
