import { useState } from 'react';
import { Info } from 'lucide-react';

export function DHCPRelayConfig() {
  const [selectedNode, setSelectedNode] = useState('ninguno');
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="max-w-lg">
      {/* Alert informativo */}
      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6 flex gap-2">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-700">
          Para implementar esto en tu red debes usar DHCP Relay en tus Nodos. 
          Selecciona un Nodo para administrar sus opciones de DHCP.
        </p>
      </div>

      {/* Formulario */}
      <div className="space-y-4">
        {/* Nodos */}
        <div>
          <label className="block text-xs text-gray-600 mb-1.5">
            Nodos
          </label>
          <select
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
            className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
          >
            <option value="ninguno">Ninguno</option>
            <option value="nodo-1">Nodo 1 - Centro</option>
            <option value="nodo-2">Nodo 2 - Norte</option>
            <option value="nodo-3">Nodo 3 - Sur</option>
          </select>
        </div>

        {/* Toggle para mostrar opciones */}
        <div>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            {showOptions ? '− Ocultar Opciones' : '+ Opciones'}
          </button>
        </div>

        {/* Opciones DHCP (condicional) */}
        {showOptions && (
          <div className="space-y-4 pt-2 border-t border-gray-200">
            {/* Address pool */}
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">
                Address pool
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Lease time */}
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">
                Lease time
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Netmask */}
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">
                Netmask
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
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

            {/* DNS primario */}
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">
                Dns primario
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* DNS secundario */}
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">
                Dns secundario
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* DNS terciario */}
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">
                Dns terciario
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

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
