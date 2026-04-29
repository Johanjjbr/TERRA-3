import { useState } from 'react';
import { Switch } from '../ui/switch';

export function CorteBloqueoView() {
  const [config, setConfig] = useState({
    corteAutomatico: true,
    diasSuspension: 5,
    recargoAutomatico: false,
    avisoDeuda: true,
    diasAviso: 3,
    ipRedireccion: '192.168.1.1',
  });

  const handleToggle = (field: string, value: boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Guardar configuración:', config);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Card 1: Reglas de Suspensión Automática */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-6">
              Reglas de Suspensión Automática
            </h3>

            <div className="space-y-6">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Activar corte automático por falta de pago
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    El sistema suspenderá automáticamente el servicio cuando se cumpla el plazo configurado
                  </p>
                </div>
                <Switch
                  checked={config.corteAutomatico}
                  onCheckedChange={(checked) => handleToggle('corteAutomatico', checked)}
                />
              </div>

              {/* Input: Días de suspensión */}
              {config.corteAutomatico && (
                <div className="pl-4 border-l-2 border-blue-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span>Suspender servicio a los</span>
                    <input
                      type="number"
                      value={config.diasSuspension}
                      onChange={(e) => handleInputChange('diasSuspension', parseInt(e.target.value) || 0)}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      min="1"
                      max="90"
                    />
                    <span>días después del vencimiento</span>
                  </div>
                </div>
              )}

              {/* Toggle 2 */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Aplicar recargo automático al suspender
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Se agregará un recargo al saldo del cliente cuando se suspenda su servicio
                  </p>
                </div>
                <Switch
                  checked={config.recargoAutomatico}
                  onCheckedChange={(checked) => handleToggle('recargoAutomatico', checked)}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Aviso en Pantalla (Portal Cautivo) */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-6">
              Aviso en Pantalla (Portal Cautivo)
            </h3>

            <div className="space-y-6">
              {/* Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Mostrar aviso de deuda en el navegador del cliente
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Los clientes con deuda verán un mensaje al intentar navegar
                  </p>
                </div>
                <Switch
                  checked={config.avisoDeuda}
                  onCheckedChange={(checked) => handleToggle('avisoDeuda', checked)}
                />
              </div>

              {/* Inputs */}
              {config.avisoDeuda && (
                <div className="space-y-4 pl-4 border-l-2 border-blue-200">
                  {/* Días de aviso */}
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span>Mostrar aviso</span>
                    <input
                      type="number"
                      value={config.diasAviso}
                      onChange={(e) => handleInputChange('diasAviso', parseInt(e.target.value) || 0)}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      min="0"
                      max="30"
                    />
                    <span>días antes del vencimiento</span>
                  </div>

                  {/* IP de redirección */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      IP de redirección o perfil de bloqueo del Mikrotik
                    </label>
                    <input
                      type="text"
                      value={config.ipRedireccion}
                      onChange={(e) => handleInputChange('ipRedireccion', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="192.168.1.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Puede ser una IP local o el nombre de un perfil de Mikrotik
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-white">
        <div className="max-w-4xl mx-auto flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            GUARDAR CONFIGURACIÓN
          </button>
        </div>
      </div>
    </div>
  );
}
