import { useState } from 'react';
import { ClientesTable } from '../components/simple-tables/ClientesTable';
import { ConexionesTable } from '../components/simple-tables/ConexionesTable';

type TableView = 'clientes' | 'conexiones';

export function TablesDemo() {
  const [activeTable, setActiveTable] = useState<TableView>('clientes');

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Demo Selector */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-3">Dashboard ISP - Data Tables</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTable('clientes')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeTable === 'clientes'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Variante 1: CLIENTES
          </button>
          <button
            onClick={() => setActiveTable('conexiones')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeTable === 'conexiones'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Variante 2: CONEXIONES
          </button>
        </div>
      </div>

      {/* Table Display Area */}
      <div className="flex-1 overflow-hidden">
        {activeTable === 'clientes' ? <ClientesTable /> : <ConexionesTable />}
      </div>
    </div>
  );
}
