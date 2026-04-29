import { useState } from 'react';
import { TopTabs } from '../components/TopTabs';
import { SubNavigation } from '../components/SubNavigation';
import { Toolbar } from '../components/Toolbar';
import { ConnectionsTable } from '../components/ConnectionsTable';
import { ClientPanel } from '../components/ClientPanel';
import { ClientsList } from '../components/ClientsList';
import { RegistrosTable } from '../components/client-detail/RegistrosTable';
import { HistorialTable } from '../components/client-detail/HistorialTable';
import { TicketsTable } from '../components/client-detail/TicketsTable';
import { GestionTable } from '../components/client-detail/GestionTable';
import { ComunicacionesTable } from '../components/client-detail/ComunicacionesTable';

const subNavItems = [
  { id: 'registros', label: 'REGISTROS' },
  { id: 'conexiones', label: 'CONEXIONES' },
  { id: 'tickets', label: 'TICKETS' },
  { id: 'historial', label: 'HISTORIAL' },
  { id: 'gestion', label: 'GESTIÓN' },
  { id: 'comunicaciones', label: 'COMUNICACIONES' },
  { id: 'extras', label: 'EXTRAS' },
  { id: 'contratos', label: 'CONTRATOS' },
  { id: 'promociones', label: 'PROMOCIONES' },
  { id: 'variables', label: 'VARIABLES' },
];

interface Tab {
  id: string;
  label: string;
  type: 'list' | 'client';
  clientData?: any;
}

export function ClientManagement() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'clientes-general', label: 'Clientes', type: 'list' },
  ]);
  const [activeTab, setActiveTab] = useState('clientes-general');
  const [activeSubNav, setActiveSubNav] = useState('registros');

  const handleTabClose = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const handleClientClick = (client: any) => {
    // Check if client tab already exists
    const existingTab = tabs.find(tab => 
      tab.type === 'client' && tab.clientData?.id === client.id
    );

    if (existingTab) {
      setActiveTab(existingTab.id);
    } else {
      // Create new tab for this client
      const newTab: Tab = {
        id: `cliente-${client.id}`,
        label: `Cliente: ${client.nombre}`,
        type: 'client',
        clientData: client,
      };
      setTabs([...tabs, newTab]);
      setActiveTab(newTab.id);
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);
  const isListView = currentTab?.type === 'list';

  const renderContent = () => {
    switch (activeSubNav) {
      case 'registros':
        return <RegistrosTable />;
      case 'conexiones':
        return <ConnectionsTable />;
      case 'tickets':
        return <TicketsTable />;
      case 'historial':
        return <HistorialTable />;
      case 'gestion':
        return <GestionTable />;
      case 'comunicaciones':
        return <ComunicacionesTable />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <p className="text-sm text-gray-500">Vista "{activeSubNav}" en desarrollo</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Tabs */}
      <TopTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabClose={handleTabClose}
        onTabChange={setActiveTab}
      />

      {isListView ? (
        // List View
        <>
          {/* Toolbar */}
          <Toolbar />
          <ClientsList onClientClick={handleClientClick} />
        </>
      ) : (
        // Client Detail View
        <>
          {/* Sub Navigation */}
          <SubNavigation 
            items={subNavItems}
            activeItem={activeSubNav}
            onItemChange={setActiveSubNav}
          />

          {/* Content Area with Client Panel */}
          <div className="flex-1 flex overflow-hidden">
            {renderContent()}
            <ClientPanel clientData={currentTab?.clientData} />
          </div>
        </>
      )}
    </div>
  );
}