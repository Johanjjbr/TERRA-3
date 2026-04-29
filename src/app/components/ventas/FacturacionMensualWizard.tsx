import { useState } from 'react';
import { Calendar } from 'lucide-react';

export function FacturacionMensualWizard() {
  const [activeStep, setActiveStep] = useState(1);
  const [parcial, setParcial] = useState(false);
  const [facturarBloqueados, setFacturarBloqueados] = useState(false);
  const [bloqueadosMode, setBloqueadosMode] = useState<'deuda' | 'todos'>('deuda');
  const [primerMesAdelantado, setPrimerMesAdelantado] = useState(false);

  const steps = [
    { id: 1, label: '1. CONFIGURACIÓN LOTE' },
    { id: 2, label: '2. GENERAR FACTURAS' },
    { id: 3, label: '3. FACTURACIÓN EN CURSO' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Sub-navigation tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-1 px-4">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`px-4 py-3 text-xs font-medium transition-colors relative ${
                step.id === activeStep
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {step.label}
              {step.id === activeStep && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeStep === 1 && (
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* COLUMN 1: PARÁMETROS GENERALES */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="border-b-2 border-blue-600 pb-2 mb-4">
                <h3 className="text-xs font-semibold text-blue-600 uppercase">Parámetros Generales</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Período a facturar</label>
                  <input
                    type="text"
                    defaultValue="Abril - 2026"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="18/03/2026"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                    />
                    <Calendar className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">1er vencimiento</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                    />
                    <Calendar className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">2do vencimiento</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                    />
                    <Calendar className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Valor Dólar</label>
                  <input
                    type="text"
                    defaultValue="$ 1"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* COLUMN 2: PARÁMETROS AVANZADOS */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="border-b-2 border-blue-600 pb-2 mb-4">
                <h3 className="text-xs font-semibold text-blue-600 uppercase">Parámetros Avanzados</h3>
              </div>

              <div className="space-y-4">
                {/* Parcial */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Parcial</label>
                    <button
                      onClick={() => setParcial(!parcial)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        parcial ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          parcial ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                  {parcial && (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Desde</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Hasta</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Facturar bloqueados */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Facturar bloqueados</label>
                    <button
                      onClick={() => setFacturarBloqueados(!facturarBloqueados)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        facturarBloqueados ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          facturarBloqueados ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                  {facturarBloqueados && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setBloqueadosMode('deuda')}
                          className={`flex-1 px-3 py-2 text-xs rounded border transition-colors ${
                            bloqueadosMode === 'deuda'
                              ? 'bg-gray-200 border-gray-300 text-gray-900'
                              : 'bg-white border-gray-300 text-gray-600'
                          }`}
                        >
                          Hasta deuda
                        </button>
                        <button
                          onClick={() => setBloqueadosMode('todos')}
                          className={`flex-1 px-3 py-2 text-xs rounded border transition-colors ${
                            bloqueadosMode === 'todos'
                              ? 'bg-gray-200 border-gray-300 text-gray-900'
                              : 'bg-white border-gray-300 text-gray-600'
                          }`}
                        >
                          Todos
                        </button>
                      </div>
                      {bloqueadosMode === 'deuda' && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Hasta</label>
                          <input
                            type="text"
                            defaultValue="$ 0"
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN 3: ADELANTOS Y ACCIONES */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="border-b-2 border-blue-600 pb-2 mb-4">
                <h3 className="text-xs font-semibold text-blue-600 uppercase">Adelantos y Acciones</h3>
              </div>

              <div className="space-y-4">
                {/* Primer mes por adelantado */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-700">Primer mes por adelantado</label>
                    <button
                      onClick={() => setPrimerMesAdelantado(!primerMesAdelantado)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        primerMesAdelantado ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          primerMesAdelantado ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                  {primerMesAdelantado && (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Desde</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Hasta</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons at bottom */}
                <div className="pt-32">
                  <div className="flex flex-col gap-2">
                    <button className="w-full px-4 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      PREVISUALIZAR
                    </button>
                    <button className="w-full px-4 py-2 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      CERRAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generar Facturas</h3>
            <p className="text-sm text-gray-500">Complete la configuración del lote para continuar</p>
          </div>
        </div>
      )}

      {activeStep === 3 && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Facturación en Curso</h3>
            <p className="text-sm text-gray-500">No hay procesos de facturación en curso</p>
          </div>
        </div>
      )}
    </div>
  );
}
