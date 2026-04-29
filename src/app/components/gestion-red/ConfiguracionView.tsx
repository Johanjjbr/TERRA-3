import { Plus } from 'lucide-react';

interface Card {
  id: string;
  title: string;
}

const addressListData: Card[] = [
  { id: '1', title: '10.6.0.1/16' },
  { id: '2', title: '10.7.0.1/16' },
  { id: '3', title: '10.8.0.1/16' },
  { id: '4', title: '192.168.1.0/24' },
];

const redesData: Card[] = [
  { id: '1', title: 'NODO CAUCETE 1' },
  { id: '2', title: 'NODO CAUCETE 2' },
  { id: '3', title: 'NODO VALLE FERTIL' },
  { id: '4', title: 'NODO SAN MARTIN' },
];

const radiusPoolsData: Card[] = [
  { id: '1', title: '10.7.0.1 - 10.7.255.254' },
  { id: '2', title: '10.8.0.1 - 10.8.255.254' },
  { id: '3', title: '10.9.0.1 - 10.9.255.254' },
];

export function ConfiguracionView() {
  return (
    <div className="flex-1 flex gap-4 p-6 bg-gray-50 overflow-auto">
      {/* ADDRESS LIST Column */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Address List</h3>
            <button className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Cards */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {addressListData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
              >
                <p className="text-sm text-gray-700 text-center font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REDES Column */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Redes</h3>
            <button className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Cards */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {redesData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
              >
                <p className="text-sm text-gray-700 text-center font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RADIUS IP POOLS Column */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase">Radius IP Pools</h3>
            <button className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Cards */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {radiusPoolsData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
              >
                <p className="text-sm text-gray-700 text-center font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
