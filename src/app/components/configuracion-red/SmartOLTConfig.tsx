import { ExternalLink } from 'lucide-react';

export function SmartOLTConfig() {
  return (
    <div className="max-w-lg">
      {/* Título de sección */}
      <h2 className="text-xs font-semibold text-gray-700 mb-4">
        SMART OLT
      </h2>

      {/* Formulario */}
      <div className="space-y-4">
        {/* Host */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Host
          </label>
          <input
            type="text"
            placeholder=""
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Client ID */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Client ID
          </label>
          <input
            type="text"
            placeholder=""
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Client Key */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Client Key
          </label>
          <input
            type="text"
            placeholder=""
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Enlace de información */}
        <div className="pt-2">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Haga clic aquí para obtener más información de la API de SmartOLT
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
