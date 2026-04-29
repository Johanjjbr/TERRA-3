import { User, Edit, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';

interface ClientPanelProps {
  clientData?: any;
}

export function ClientPanel({ clientData }: ClientPanelProps) {
  // Use clientData if provided, otherwise use default JORGE ALBERTO HERRERA
  const nombre = clientData?.nombre || 'JORGE ALBERTO HERRERA';
  const codigo = clientData?.codigo || '000416';
  const estado = clientData?.estado || 'Habilitado';
  const domicilio = clientData?.domicilio || 'CAUCETE - BARRIO CONJUNTO 2 M/1 C/20';
  const telefono = clientData?.telefono || '264450109';
  
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-screen flex flex-col">
      {/* Client Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
            <User className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-sm font-medium text-gray-900 mb-1">{nombre}</h2>
          <p className="text-xs text-gray-500 mb-2">Código: {codigo}</p>
          <Badge className={`${
            estado === 'Habilitado' 
              ? 'bg-green-100 text-green-700' 
              : estado === 'Bloqueado'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700'
          } hover:bg-green-100 text-xs px-3 py-0.5`}>
            {estado}
          </Badge>
        </div>

        {/* Client Information */}
        <div className="space-y-3 text-xs">
          <div>
            <p className="text-gray-500 mb-0.5">Dirección:</p>
            <p className="text-gray-900">{domicilio}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-0.5">Teléfono:</p>
            <p className="text-gray-900">{telefono}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-0.5">Vencimiento:</p>
            <p className="text-gray-900">Regular</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col gap-2">
          <button className="w-full px-4 py-2 text-xs font-medium border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Edit className="w-3.5 h-3.5" />
            EDITAR
          </button>
          <button className="w-full px-4 py-2 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
            BLOQUEAR
          </button>
          <button className="w-full px-4 py-2 text-xs font-medium bg-green-600 text-white rounded opacity-50 cursor-not-allowed">
            HABILITAR
          </button>
        </div>
      </div>

      {/* Billing Section - Positioned at bottom */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">TOTAL:</span>
            <span className="text-lg font-semibold text-gray-900">0,00</span>
          </div>
          <button className="w-full px-4 py-2 text-xs font-medium border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <DollarSign className="w-3.5 h-3.5" />
            COBRAR
          </button>
        </div>
      </div>
    </div>
  );
}