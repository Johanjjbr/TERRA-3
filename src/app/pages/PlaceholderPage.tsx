import { LucideIcon } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  icon: LucideIcon;
  description?: string;
}

export function PlaceholderPage({ title, icon: Icon, description }: PlaceholderPageProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Icon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">{title}</h2>
          <p className="text-sm text-gray-500">
            {description || 'Esta sección está en desarrollo. Próximamente estará disponible con todas sus funcionalidades.'}
          </p>
        </div>
      </div>
    </div>
  );
}
