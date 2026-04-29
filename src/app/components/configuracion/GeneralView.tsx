import { useState } from 'react';
import { Upload } from 'lucide-react';

export function GeneralView() {
  const [formData, setFormData] = useState({
    razonSocial: 'CIUDAD FIBRA S.A.',
    nombreFantasia: 'Ciudad Fibra',
    cuit: '30-12345678-9',
    direccion: 'Av. Principal 1234, San Juan',
    telefono: '+54 264 123-4567',
    email: 'contacto@ciudadfibra.com',
    sitioWeb: 'www.ciudadfibra.com',
    moneda: 'pesos',
    zonaHoraria: 'gmt-3',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Guardar cambios:', formData);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="border-b border-blue-600 pb-2 mb-6">
                <h2 className="text-sm font-bold text-blue-600 uppercase">Datos Generales</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Razón Social */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Razón Social
                  </label>
                  <input
                    type="text"
                    value={formData.razonSocial}
                    onChange={(e) => handleInputChange('razonSocial', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Nombre de Fantasía */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Nombre de Fantasía
                  </label>
                  <input
                    type="text"
                    value={formData.nombreFantasia}
                    onChange={(e) => handleInputChange('nombreFantasia', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* CUIT/RUT */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    CUIT/RUT
                  </label>
                  <input
                    type="text"
                    value={formData.cuit}
                    onChange={(e) => handleInputChange('cuit', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Dirección */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Email corporativo */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email corporativo
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Sitio Web */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Sitio Web
                  </label>
                  <input
                    type="text"
                    value={formData.sitioWeb}
                    onChange={(e) => handleInputChange('sitioWeb', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Moneda por defecto */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Moneda por defecto
                  </label>
                  <select
                    value={formData.moneda}
                    onChange={(e) => handleInputChange('moneda', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="pesos">Pesos</option>
                    <option value="dolares">Dólares</option>
                    <option value="euros">Euros</option>
                  </select>
                </div>

                {/* Zona Horaria */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Zona Horaria
                  </label>
                  <select
                    value={formData.zonaHoraria}
                    onChange={(e) => handleInputChange('zonaHoraria', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="gmt-3">GMT-3 Buenos Aires</option>
                    <option value="gmt-4">GMT-4 Santiago</option>
                    <option value="gmt-5">GMT-5 Lima</option>
                    <option value="gmt+0">GMT+0 Londres</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="border-b border-blue-600 pb-2 mb-6">
                <h2 className="text-sm font-bold text-blue-600 uppercase">Logotipo y Marca</h2>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1">Arrastrar logo aquí</p>
                <p className="text-xs text-gray-500">o</p>
                <button className="mt-2 text-sm text-blue-600 hover:underline">
                  Cargar imagen
                </button>
                <p className="text-xs text-gray-400 mt-3">PNG, JPG hasta 5MB</p>
              </div>

              {/* Current Logo */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Logo actual:</p>
                <div className="flex items-center justify-center h-24 bg-white rounded border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">CIUDAD</div>
                    <div className="text-lg font-semibold text-blue-800">FIBRA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-white">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            GUARDAR CAMBIOS
          </button>
        </div>
      </div>
    </div>
  );
}