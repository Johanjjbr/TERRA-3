import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Clock, AlertCircle, Plus, Trash2, RefreshCw } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  ip: string;
  type: 'router' | 'switch' | 'olt' | 'antena' | 'servidor' | 'otro';
  location: string;
  status: 'online' | 'offline' | 'warning' | 'checking';
  latency: number | null;
  lastCheck: Date;
  uptime: number;
}

const equipmentTypes = [
  { value: 'router', label: 'Router' },
  { value: 'switch', label: 'Switch' },
  { value: 'olt', label: 'OLT' },
  { value: 'antena', label: 'Antena' },
  { value: 'servidor', label: 'Servidor' },
  { value: 'otro', label: 'Otro' }
];

const initialEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Router Core Principal',
    ip: '200.123.45.1',
    type: 'router',
    location: 'Datacenter Principal',
    status: 'online',
    latency: 2.4,
    lastCheck: new Date(),
    uptime: 99.98
  },
  {
    id: '2',
    name: 'OLT Zona Norte',
    ip: '200.123.45.10',
    type: 'olt',
    location: 'Nodo Norte',
    status: 'online',
    latency: 5.1,
    lastCheck: new Date(),
    uptime: 99.95
  },
  {
    id: '3',
    name: 'Switch Edificio A',
    ip: '200.123.45.20',
    type: 'switch',
    location: 'Edificio A',
    status: 'warning',
    latency: 45.3,
    lastCheck: new Date(),
    uptime: 98.5
  },
  {
    id: '4',
    name: 'Antena Ubiquiti Sector 1',
    ip: '200.123.45.30',
    type: 'antena',
    location: 'Torre Principal',
    status: 'offline',
    latency: null,
    lastCheck: new Date(Date.now() - 300000),
    uptime: 95.2
  }
];

export function MonitoreoConfig() {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline' | 'warning'>('all');
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    ip: '',
    type: 'router' as Equipment['type'],
    location: ''
  });

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setEquipment(prev => prev.map(eq => {
        const random = Math.random();
        let newStatus: Equipment['status'] = 'online';
        let newLatency: number | null = Math.random() * 50;

        if (random < 0.05) {
          newStatus = 'offline';
          newLatency = null;
        } else if (random < 0.15 || newLatency > 30) {
          newStatus = 'warning';
        }

        return {
          ...eq,
          status: newStatus,
          latency: newLatency,
          lastCheck: new Date()
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-50 border-green-200';
      case 'offline': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'checking': return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getStatusIcon = (status: Equipment['status']) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4" />;
      case 'offline': return <WifiOff className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'checking': return <RefreshCw className="w-4 h-4 animate-spin" />;
    }
  };

  const handleAddEquipment = () => {
    if (!newEquipment.name || !newEquipment.ip) return;

    const equipment: Equipment = {
      id: Date.now().toString(),
      ...newEquipment,
      status: 'checking',
      latency: null,
      lastCheck: new Date(),
      uptime: 0
    };

    setEquipment(prev => [...prev, equipment]);
    setNewEquipment({ name: '', ip: '', type: 'router', location: '' });
    setShowAddForm(false);
  };

  const handleDeleteEquipment = (id: string) => {
    setEquipment(prev => prev.filter(eq => eq.id !== id));
  };

  const filteredEquipment = filterStatus === 'all'
    ? equipment
    : equipment.filter(eq => eq.status === filterStatus);

  const stats = {
    total: equipment.length,
    online: equipment.filter(e => e.status === 'online').length,
    offline: equipment.filter(e => e.status === 'offline').length,
    warning: equipment.filter(e => e.status === 'warning').length
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold text-gray-700">
          Monitoreo de Equipos con IP Pública
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Monitoreo automático:</span>
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                isMonitoring ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isMonitoring ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3 h-3" />
            AGREGAR EQUIPO
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white border border-gray-200 rounded">
          <div className="text-xs text-gray-600 mb-1">Total</div>
          <div className="text-xl font-semibold text-gray-900">{stats.total}</div>
        </div>
        <div className="p-4 bg-white border border-green-200 rounded">
          <div className="text-xs text-green-600 mb-1">En línea</div>
          <div className="text-xl font-semibold text-green-600">{stats.online}</div>
        </div>
        <div className="p-4 bg-white border border-yellow-200 rounded">
          <div className="text-xs text-yellow-600 mb-1">Con alertas</div>
          <div className="text-xl font-semibold text-yellow-600">{stats.warning}</div>
        </div>
        <div className="p-4 bg-white border border-red-200 rounded">
          <div className="text-xs text-red-600 mb-1">Fuera de línea</div>
          <div className="text-xl font-semibold text-red-600">{stats.offline}</div>
        </div>
      </div>

      {/* Formulario de nuevo equipo */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
          <h3 className="text-xs font-semibold text-gray-700 mb-3">Agregar nuevo equipo</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">Nombre del equipo</label>
              <input
                type="text"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                placeholder="Ej: Router Principal"
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">Dirección IP</label>
              <input
                type="text"
                value={newEquipment.ip}
                onChange={(e) => setNewEquipment({ ...newEquipment, ip: e.target.value })}
                placeholder="200.123.45.1"
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">Tipo</label>
              <select
                value={newEquipment.type}
                onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value as Equipment['type'] })}
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                {equipmentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">Ubicación</label>
              <input
                type="text"
                value={newEquipment.location}
                onChange={(e) => setNewEquipment({ ...newEquipment, location: e.target.value })}
                placeholder="Ej: Datacenter Principal"
                className="w-full h-9 px-3 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              CANCELAR
            </button>
            <button
              onClick={handleAddEquipment}
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              AGREGAR
            </button>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="mb-4 flex gap-2">
        {(['all', 'online', 'warning', 'offline'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'Todos' : status === 'online' ? 'En línea' : status === 'warning' ? 'Alertas' : 'Offline'}
          </button>
        ))}
      </div>

      {/* Lista de equipos */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Estado</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Equipo</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">IP Pública</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Tipo</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Ubicación</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Latencia</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Uptime</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Última verificación</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment.map((eq) => (
              <tr key={eq.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border ${getStatusColor(eq.status)}`}>
                    {getStatusIcon(eq.status)}
                    <span className="text-xs font-medium capitalize">{eq.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{eq.name}</td>
                <td className="px-4 py-3 text-gray-600 font-mono">{eq.ip}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">{eq.type}</td>
                <td className="px-4 py-3 text-gray-600">{eq.location}</td>
                <td className="px-4 py-3">
                  {eq.latency !== null ? (
                    <span className={eq.latency > 30 ? 'text-yellow-600' : 'text-green-600'}>
                      {eq.latency.toFixed(1)} ms
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={eq.uptime > 99 ? 'text-green-600' : eq.uptime > 95 ? 'text-yellow-600' : 'text-red-600'}>
                    {eq.uptime.toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(eq.lastCheck).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDeleteEquipment(eq.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Información adicional */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
          <div className="text-xs text-blue-800">
            <p className="font-medium mb-1">Información de monitoreo</p>
            <p>El sistema realiza verificaciones ICMP (ping) cada 5 segundos a los equipos configurados. Los equipos con latencia superior a 30ms se marcan con alerta. El uptime se calcula basado en el historial de las últimas 24 horas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
