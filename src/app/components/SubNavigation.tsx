interface NavItem {
  id: string;
  label: string;
}

interface SubNavigationProps {
  items: NavItem[];
  activeItem: string;
  onItemChange: (id: string) => void;
}

export function SubNavigation({ items, activeItem, onItemChange }: SubNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center gap-1 px-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemChange(item.id)}
            className={`px-3 py-3 text-xs font-medium transition-colors relative ${
              item.id === activeItem
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {item.label}
            {item.id === activeItem && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
