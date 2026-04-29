import { useState } from 'react';
import { Switch } from '../ui/switch';

interface FormularioUsuarioProps {
  usuario?: any;
}

export function FormularioUsuario({ usuario }: FormularioUsuarioProps) {
  const [activeTab, setActiveTab] = useState('datos-principales');
  const [formData, setFormData] = useState({
    nombreUsuario: usuario?.usuario || '',
    contrasena: '',
    repetirContrasena: '',
    perfil: usuario?.perfil || 'administrador',
    nombre: usuario?.nombre || '',
    emailRecuperacion: usuario?.emailRecuperacion || '',
    whatsappRecuperacion: '',
    operador: usuario?.operador === 'Si' || false,
    vendedor: usuario?.vendedor === 'Si' || false,
    habilitado: usuario?.habilitado ?? true,
  });

  const tabs = [
    { id: 'datos-principales', label: 'DATOS PRINCIPALES' },
    { id: 'datos-secundarios', label: 'DATOS SECUNDARIOS' },
    { id: 'configuracion', label: 'CONFIGURACIÓN' },
    { id: 'empresas', label: 'EMPRESAS' },
    { id: 'depositos', label: 'DEPÓSITOS' },
    { id: 'puntos-venta', label: 'PUNTOS DE VENTA' },
    { id: 'cajas', label: 'CAJAS' },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Guardar usuario:', formData);
    // Aquí iría la lógica para guardar
  };

  const handleCancel = () => {
    console.log('Cancelar');
    // Aquí iría la lógica para cancelar
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Title */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-bold text-gray-900">USUARIO</h2>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'datos-principales' && (
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre de Usuario */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Nombre de Usuario:
                </label>
                <input
                  type="text"
                  value={formData.nombreUsuario}
                  onChange={(e) => handleInputChange('nombreUsuario', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="usuario123"
                />
              </div>

              {/* Perfil */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Perfil:
                </label>
                <select
                  value={formData.perfil}
                  onChange={(e) => handleInputChange('perfil', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="administrador">Administrador</option>
                  <option value="operador">Operador</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="supervisor">Supervisor</option>
                </select>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Contraseña:
                </label>
                <input
                  type="password"
                  value={formData.contrasena}
                  onChange={(e) => handleInputChange('contrasena', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              {/* Repetir Contraseña */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Repetir Contraseña:
                </label>
                <input
                  type="password"
                  value={formData.repetirContrasena}
                  onChange={(e) => handleInputChange('repetirContrasena', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              {/* Nombre */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Nombre:
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="NOMBRE COMPLETO"
                />
              </div>

              {/* Email de Recuperación */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Email de Recuperación:
                </label>
                <input
                  type="email"
                  value={formData.emailRecuperacion}
                  onChange={(e) => handleInputChange('emailRecuperacion', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="email@ejemplo.com"
                />
              </div>

              {/* WhatsApp de Recuperación */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  WhatsApp de Recuperación:
                </label>
                <input
                  type="tel"
                  value={formData.whatsappRecuperacion}
                  onChange={(e) => handleInputChange('whatsappRecuperacion', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="+54 9 264 123-4567"
                />
              </div>
            </div>

            {/* Toggle Controls */}
            <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Operador</label>
                <Switch
                  checked={formData.operador}
                  onCheckedChange={(checked) => handleInputChange('operador', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Vendedor</label>
                <Switch
                  checked={formData.vendedor}
                  onCheckedChange={(checked) => handleInputChange('vendedor', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Habilitado</label>
                <Switch
                  checked={formData.habilitado}
                  onCheckedChange={(checked) => handleInputChange('habilitado', checked)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'datos-principales' && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">
              Contenido de la pestaña "{tabs.find(t => t.id === activeTab)?.label}"
            </p>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            CANCELAR
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            GUARDAR
          </button>
        </div>
      </div>
    </div>
  );
}
