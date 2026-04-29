import { useState } from 'react';
import { Search, Calendar, Check } from 'lucide-react';

interface FacturaItem {
  id: string;
  codigo: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  impuesto: string;
  total: number;
}

export function CrearFacturaForm() {
  const [items, setItems] = useState<FacturaItem[]>([]);
  const [enviarCorreo, setEnviarCorreo] = useState(false);
  const [seleccionarListado, setSeleccionarListado] = useState(false);

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const iva21 = items
      .filter(item => item.impuesto === 'IVA 21%')
      .reduce((sum, item) => sum + (item.total * 0.21), 0);
    const iva105 = items
      .filter(item => item.impuesto === 'IVA 10.5%')
      .reduce((sum, item) => sum + (item.total * 0.105), 0);
    const iva27 = items
      .filter(item => item.impuesto === 'IVA 27%')
      .reduce((sum, item) => sum + (item.total * 0.27), 0);
    const total = subtotal + iva21 + iva105 + iva27;

    return { subtotal, iva21, iva105, iva27, total };
  };

  const totals = calculateTotals();

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-bold text-gray-900">NUEVA FACTURA</h2>
      </div>

      {/* Form Content - 3 Columns */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* COLUMN 1: DATOS CLIENTE */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="border-b-2 border-blue-600 pb-2 mb-4">
              <h3 className="text-xs font-semibold text-blue-600 uppercase">Datos Cliente</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">ID Cliente</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                    placeholder="Buscar cliente..."
                  />
                  <Search className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Nombre cliente</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded bg-gray-50 text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">CUIT/CUIL/DNI</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded bg-gray-50 text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Dirección</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded bg-gray-50 text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Código postal</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded bg-gray-50 text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Ciudad</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded bg-gray-50 text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Condición frente al IVA</label>
                <input
                  type="text"
                  disabled
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded bg-gray-50 text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* COLUMN 2: DATOS FACTURA */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="border-b-2 border-blue-600 pb-2 mb-4">
              <h3 className="text-xs font-semibold text-blue-600 uppercase">Datos Factura</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tipo comprobante</label>
                <select className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500">
                  <option>Factura A</option>
                  <option>Factura B</option>
                  <option>Factura C</option>
                  <option>Nota de Crédito</option>
                  <option>Nota de Débito</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Valor tipo de cambio</label>
                <input
                  type="text"
                  defaultValue="1"
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
                <label className="block text-xs font-medium text-gray-700 mb-1">1 Vencimiento</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                  />
                  <Calendar className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">2 Vencimiento</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                  />
                  <Calendar className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  defaultValue="Factura Manual"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Concepto</label>
                <select className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500">
                  <option>Servicios</option>
                  <option>Productos</option>
                  <option>Productos y Servicios</option>
                </select>
              </div>
            </div>
          </div>

          {/* COLUMN 3: CARGAR ITEMS FACTURA */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="border-b-2 border-blue-600 pb-2 mb-4">
              <h3 className="text-xs font-semibold text-blue-600 uppercase">Cargar Items Factura</h3>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setSeleccionarListado(!seleccionarListado)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  seleccionarListado ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    seleccionarListado ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="text-xs text-gray-700">Seleccionar ítems de mis listados</span>
            </div>

            {/* Item input form */}
            <div className="space-y-2 mb-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Código listado</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                    />
                    <Search className="absolute right-2 top-2 w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Impuesto</label>
                  <select className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-blue-500">
                    <option>IVA 21%</option>
                    <option>IVA 10.5%</option>
                    <option>IVA 27%</option>
                    <option>Exento</option>
                  </select>
                </div>
              </div>

              <button className="w-full px-4 py-2 text-xs border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                AGREGAR
              </button>
            </div>

            {/* Items list */}
            <div className="border border-gray-200 rounded p-4 mb-4 min-h-32 flex items-center justify-center">
              {items.length === 0 ? (
                <p className="text-xs text-gray-400">Todavía no hay ítems cargados</p>
              ) : (
                <div className="w-full">
                  {/* Render items here */}
                </div>
              )}
            </div>

            {/* Totals box */}
            <div className="bg-gray-50 border border-gray-200 rounded p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">IVA 21%</span>
                <span className="text-gray-900 font-medium">{totals.iva21.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">IVA 10.5%</span>
                <span className="text-gray-900 font-medium">{totals.iva105.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">IVA 27%</span>
                <span className="text-gray-900 font-medium">{totals.iva27.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs bg-blue-50 -mx-3 -mb-3 px-3 py-2 rounded-b">
                <span className="text-blue-700 font-semibold">Total</span>
                <span className="text-blue-700 font-bold">{totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enviarCorreo"
            checked={enviarCorreo}
            onChange={(e) => setEnviarCorreo(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor="enviarCorreo" className="text-xs text-gray-700">
            Enviar factura por correo al emitir
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            CERRAR
          </button>
          <button className="px-4 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            EMITIR FACTURA
          </button>
        </div>
      </div>
    </div>
  );
}
