import { Bell } from 'lucide-react';

export function NotificacionesView() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <Bell className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Notificaciones de Usuario
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          Aquí se configurarán las notificaciones para los usuarios del sistema.
        </p>
      </div>
    </div>
  );
}
