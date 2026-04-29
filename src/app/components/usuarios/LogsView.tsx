import { FileText } from 'lucide-react';

export function LogsView() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
          <FileText className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Logs del Sistema
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          Aquí se mostrarán los registros de actividad y auditoría del sistema.
        </p>
      </div>
    </div>
  );
}
