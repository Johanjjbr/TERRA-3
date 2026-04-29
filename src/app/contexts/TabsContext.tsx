import { createContext, useContext, useState, ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  type: 'clientes-list' | 'conexiones-list' | 'client-detail' | 'crear-usuario' | 'editar-usuario';
  clientData?: any;
  data?: any;
}

interface TabsContextType {
  tabs: Tab[];
  activeTab: string;
  addTab: (tab: Tab) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTabState] = useState<string>('');

  const addTab = (newTab: Tab) => {
    // Check if tab already exists
    const existingTab = tabs.find(tab => tab.id === newTab.id);
    
    if (existingTab) {
      setActiveTabState(existingTab.id);
    } else {
      setTabs([...tabs, newTab]);
      setActiveTabState(newTab.id);
    }
  };

  const removeTab = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    
    if (activeTab === id && newTabs.length > 0) {
      setActiveTabState(newTabs[newTabs.length - 1].id);
    } else if (newTabs.length === 0) {
      setActiveTabState('');
    }
  };

  const setActiveTab = (id: string) => {
    setActiveTabState(id);
  };

  return (
    <TabsContext.Provider value={{ tabs, activeTab, addTab, removeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}