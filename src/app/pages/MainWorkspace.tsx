import { useTabs } from '../contexts/TabsContext';
import { TopTabs } from '../components/TopTabs';
import { Toolbar } from '../components/Toolbar';
import { SubNavigation } from '../components/SubNavigation';
import { ClientPanel } from '../components/ClientPanel';
import { ClientsList } from '../components/ClientsList';
import { ConnectionsTable } from '../components/ConnectionsTable';
import { RegistrosTable } from '../components/client-detail/RegistrosTable';
import { HistorialTable } from '../components/client-detail/HistorialTable';
import { TicketsTable } from '../components/client-detail/TicketsTable';
import { GestionTable } from '../components/client-detail/GestionTable';
import { ComunicacionesTable } from '../components/client-detail/ComunicacionesTable';
import { MonitoringHub } from '../components/monitoring/MonitoringHub';
import { FormularioUsuario } from '../components/usuarios';
import { useState } from 'react';

const subNavItems = [
  { id: 'registros', label: 'REGISTROS' },
  { id: 'monitoreo', label: 'MONITOREO' },
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

export function MainWorkspace() {
  const { tabs, activeTab, removeTab, setActiveTab, addTab } = useTabs();
  const [activeSubNav, setActiveSubNav] = useState('registros');

  const handleClientClick = (client: any) => {
    const newTab = {
      id: `cliente-${client.id}`,
      label: `Cliente: ${client.nombre}`,
      type: 'client-detail' as const,
      clientData: client,
    };
    addTab(newTab);
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  const renderContent = () => {
    if (!currentTab) {
      return (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-sm text-gray-500">Selecciona una opción del menú para comenzar</p>
          </div>
        </div>
      );
    }

    // Render based on tab type
    switch (currentTab.type) {
      case 'clientes-list':
        return (
          <>
            <Toolbar />
            <ClientsList onClientClick={handleClientClick} />
          </>
        );

      case 'conexiones-list':
        return (
          <>
            <Toolbar />
            <ConnectionsTable />
          </>
        );

      case 'client-detail':
        return (
          <>
            <SubNavigation 
              items={subNavItems}
              activeItem={activeSubNav}
              onItemChange={setActiveSubNav}
            />
            <div className="flex-1 flex overflow-hidden">
              {renderClientDetailContent()}
              <ClientPanel clientData={currentTab.clientData} />
            </div>
          </>
        );

      case 'crear-usuario':
        return <FormularioUsuario />;

      case 'editar-usuario':
        return <FormularioUsuario usuario={currentTab.data} />;

      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <p className="text-sm text-gray-500">Vista en desarrollo</p>
            </div>
          </div>
        );
    }
  };

  const renderClientDetailContent = () => {
    switch (activeSubNav) {
      case 'registros':
        return <RegistrosTable />;
      case 'monitoreo':
        return <MonitoringHub clientData={currentTab?.clientData} />;
      case 'conexiones':
        return <ConnectionsTable onMonitorClick={() => setActiveSubNav('monitoreo')} clientData={currentTab?.clientData} />;
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
      {tabs.length > 0 && (
        <TopTabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabClose={removeTab}
          onTabChange={setActiveTab}
        />
      )}
      {renderContent()}
    </div>
  );
}