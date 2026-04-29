import { X } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
}

interface TopTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClose: (id: string) => void;
  onTabChange: (id: string) => void;
}

export function TopTabs({ tabs, activeTab, onTabClose, onTabChange }: TopTabsProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer border-r border-gray-200 ${
              tab.id === activeTab 
                ? 'bg-gray-50 text-blue-600' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{tab.label}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="hover:bg-gray-200 rounded p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
