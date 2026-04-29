import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

type Platform = 'smartolt' | 'mikrotik' | 'ubiquiti' | 'otros';

interface APIConnection {
  id: string;
  platform: Platform;
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  apiKey: string;
  ssl: boolean;
  enabled: boolean;
}

const platformLabels: Record<Platform, string> = {
  smartolt: 'SMART OLT',
  mikrotik: 'Mikrotik',
  ubiquiti: 'Ubiquiti',
  otros: 'Otros Equipos'
};

const initialConnections: APIConnection[] = [
  {
    id: '1',
    platform: 'smartolt',
    name: 'SMART OLT Principal',
    host: '192.168.1.100',
    port: '8080',
    username: 'admin',
    password: '',
    apiKey: '',
    ssl: true,
    enabled: true
  },
  {
    id: '2',
    platform: 'mikrotik',
    name: 'Mikrotik Core',
    host: '192.168.1.1',
    port: '8728',
    username: 'admin',
    password: '',
    apiKey: '',
    ssl: false,
    enabled: true
  },
  {
    id: '3',
    platform: 'ubiquiti',
    name: 'UNMS Controller',
    host: '192.168.1.50',
    port: '443',
    username: 'admin',
    password: '',
    apiKey: '',
    ssl: true,
    enabled: false
  }
];

export function APIConfig() {
  const [connections, setConnections] = useState<APIConnection[]>(initialConnections);
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('smartolt');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleEnabled = (id: string) => {
    setConnections(connections.map(conn =>
      conn.id === id ? { ...conn, enabled: !conn.enabled } : conn
    ));
  };

  const addConnection = () => {
    const newConnection: APIConnection = {
      id: Date.now().toString(),
      platform: selectedPlatform,
      name: `Nueva conexión ${platformLabels[selectedPlatform]}`,
      host: '',
      port: '',
      username: '',
      password: '',
      apiKey: '',
      ssl: false,
      enabled: false
    };
    setConnections([...connections, newConnection]);
    setExpandedId(newConnection.id);
  };

  const deleteConnection = (id: string) => {
    setConnections(connections.filter(conn => conn.id !== id));
  };

  const updateConnection = (id: string, field: keyof APIConnection, value: any) => {
    setConnections(connections.map(conn =>
      conn.id === id ? { ...conn, [field]: value } : conn
    ));
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-xs font-semibold text-gray-700 mb-4">
        Gestión de Conexiones API
      </h2>

      {/* Agregar nueva conexión */}
      <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
        <div className="flex items-center gap-3">
          <label className="text-xs text-gray-600">Tipo de plataforma:</label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
            className="h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            {Object.entries(platformLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <button
            onClick={addConnection}
            className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            + AGREGAR CONEXIÓN
          </button>
        </div>
      </div>

      {/* Lista de conexiones */}
      <div className="space-y-3">
        {connections.map((conn) => (
          <div key={conn.id} className="border border-gray-200 rounded bg-white">
            {/* Header colapsable */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleExpand(conn.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEnabled(conn.id);
                  }}
                  className={`flex items-center justify-center w-5 h-5 rounded border ${
                    conn.enabled
                      ? 'bg-green-500 border-green-500'
                      : 'bg-gray-200 border-gray-300'
                  }`}
                >
                  {conn.enabled && <Check className="w-3 h-3 text-white" />}
                </button>
                <div>
                  <div className="text-xs font-medium text-gray-900">{conn.name}</div>
                  <div className="text-xs text-gray-500">
                    {platformLabels[conn.platform]} • {conn.host || 'Sin configurar'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedId === conn.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {/* Formulario expandido */}
            {expandedId === conn.id && (
              <div className="px-4 pb-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Nombre</label>
                    <input
                      type="text"
                      value={conn.name}
                      onChange={(e) => updateConnection(conn.id, 'name', e.target.value)}
                      className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Host / IP</label>
                    <input
                      type="text"
                      value={conn.host}
                      onChange={(e) => updateConnection(conn.id, 'host', e.target.value)}
                      placeholder="192.168.1.100"
                      className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Puerto</label>
                    <input
                      type="text"
                      value={conn.port}
                      onChange={(e) => updateConnection(conn.id, 'port', e.target.value)}
                      placeholder="8080"
                      className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Usuario</label>
                    <input
                      type="text"
                      value={conn.username}
                      onChange={(e) => updateConnection(conn.id, 'username', e.target.value)}
                      placeholder="admin"
                      className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Contraseña</label>
                    <input
                      type="password"
                      value={conn.password}
                      onChange={(e) => updateConnection(conn.id, 'password', e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5">API Key (opcional)</label>
                    <input
                      type="text"
                      value={conn.apiKey}
                      onChange={(e) => updateConnection(conn.id, 'apiKey', e.target.value)}
                      placeholder="API Key"
                      className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`ssl-${conn.id}`}
                      checked={conn.ssl}
                      onChange={(e) => updateConnection(conn.id, 'ssl', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor={`ssl-${conn.id}`} className="text-xs text-gray-600">
                      Usar SSL/TLS
                    </label>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => deleteConnection(conn.id)}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    ELIMINAR
                  </button>
                  <button className="px-6 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                    GUARDAR CAMBIOS
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
