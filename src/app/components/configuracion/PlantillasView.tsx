import { useState } from 'react';
import { Search, Bold, Italic, Eye } from 'lucide-react';
import { Switch } from '../ui/switch';

interface Plantilla {
  id: string;
  nombre: string;
  asunto: string;
  contenido: string;
  habilitada: boolean;
}

const plantillasData: Plantilla[] = [
  {
    id: 'bienvenida',
    nombre: 'Bienvenida nuevo cliente',
    asunto: 'Bienvenido a Ciudad Fibra',
    contenido: 'Hola {{nombre_cliente}},\n\n¡Bienvenido a Ciudad Fibra! Estamos muy contentos de que formes parte de nuestra familia.\n\nTu servicio de internet de alta velocidad ya está activo. Tus datos de conexión son:\n\nUsuario: {{usuario}}\nContraseña: {{contrasena}}\n\nSi tienes alguna consulta, no dudes en contactarnos.\n\nSaludos,\nEquipo de Ciudad Fibra',
    habilitada: true,
  },
  {
    id: 'vencimiento-email',
    nombre: 'Aviso de vencimiento (Email)',
    asunto: 'Recordatorio de pago - Factura {{numero_factura}}',
    contenido: 'Estimado/a {{nombre_cliente}},\n\nTe recordamos que tu factura N° {{numero_factura}} por un monto de ${{monto_deuda}} vence el {{fecha_vencimiento}}.\n\nPuedes realizar el pago a través de:\n- Transferencia bancaria\n- Mercado Pago\n- En nuestras oficinas\n\nPara cualquier consulta, estamos a tu disposición.\n\nSaludos cordiales,\nCiudad Fibra',
    habilitada: true,
  },
  {
    id: 'vencimiento-sms',
    nombre: 'Aviso de vencimiento (SMS)',
    asunto: '',
    contenido: 'Ciudad Fibra: Tu factura {{numero_factura}} por ${{monto_deuda}} vence el {{fecha_vencimiento}}. Paga online en www.ciudadfibra.com',
    habilitada: true,
  },
  {
    id: 'confirmacion-pago',
    nombre: 'Confirmación de pago',
    asunto: 'Pago recibido - Gracias {{nombre_cliente}}',
    contenido: 'Hola {{nombre_cliente}},\n\nHemos recibido tu pago de ${{monto_pago}} correspondiente a la factura {{numero_factura}}.\n\nFecha de pago: {{fecha_pago}}\nMétodo: {{metodo_pago}}\n\nTu recibo ha sido generado y puedes descargarlo desde tu portal de cliente.\n\n¡Gracias por tu pago puntual!\n\nEquipo de Ciudad Fibra',
    habilitada: true,
  },
  {
    id: 'ticket-resuelto',
    nombre: 'Ticket resuelto',
    asunto: 'Ticket #{{ticket_id}} resuelto',
    contenido: 'Hola {{nombre_cliente}},\n\nTu ticket #{{ticket_id}} - "{{ticket_asunto}}" ha sido resuelto.\n\nResolución: {{ticket_resolucion}}\n\nSi el problema persiste o tienes alguna consulta adicional, no dudes en contactarnos.\n\nSaludos,\nSoporte Técnico - Ciudad Fibra',
    habilitada: false,
  },
];

export function PlantillasView() {
  const [plantillas] = useState(plantillasData);
  const [selectedPlantilla, setSelectedPlantilla] = useState(plantillasData[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHabilitada, setIsHabilitada] = useState(selectedPlantilla.habilitada);
  const [asunto, setAsunto] = useState(selectedPlantilla.asunto);
  const [contenido, setContenido] = useState(selectedPlantilla.contenido);

  const handleSelectPlantilla = (plantilla: Plantilla) => {
    setSelectedPlantilla(plantilla);
    setIsHabilitada(plantilla.habilitada);
    setAsunto(plantilla.asunto);
    setContenido(plantilla.contenido);
  };

  const filteredPlantillas = plantillas.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGuardar = () => {
    console.log('Guardar plantilla:', {
      id: selectedPlantilla.id,
      asunto,
      contenido,
      habilitada: isHabilitada,
    });
  };

  const handlePrevisualizar = () => {
    console.log('Previsualizar plantilla');
  };

  return (
    <div className="flex-1 flex bg-white overflow-hidden">
      {/* Left Panel - List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar plantilla..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-auto">
          {filteredPlantillas.map((plantilla) => (
            <button
              key={plantilla.id}
              onClick={() => handleSelectPlantilla(plantilla)}
              className={`w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                selectedPlantilla.id === plantilla.id
                  ? 'bg-blue-50 border-l-4 border-l-blue-600'
                  : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-sm font-medium ${
                  selectedPlantilla.id === plantilla.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {plantilla.nombre}
                </span>
                {plantilla.habilitada && (
                  <span className="text-xs text-green-600 font-semibold">●</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              {selectedPlantilla.nombre}
            </h2>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Habilitada</label>
              <Switch
                checked={isHabilitada}
                onCheckedChange={setIsHabilitada}
              />
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl space-y-6">
            {/* Asunto */}
            {selectedPlantilla.id !== 'vencimiento-sms' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Asunto del Email
                </label>
                <input
                  type="text"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Asunto del correo electrónico"
                />
              </div>
            )}

            {/* Toolbar */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contenido del Mensaje
              </label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-t px-3 py-2 bg-gray-50">
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Negrita">
                  <Bold className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Cursiva">
                  <Italic className="w-4 h-4 text-gray-600" />
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <select className="text-xs border-0 bg-transparent outline-none text-gray-700">
                  <option>Insertar Variable</option>
                  <option>{'{{nombre_cliente}}'}</option>
                  <option>{'{{usuario}}'}</option>
                  <option>{'{{contrasena}}'}</option>
                  <option>{'{{numero_factura}}'}</option>
                  <option>{'{{monto_deuda}}'}</option>
                  <option>{'{{fecha_vencimiento}}'}</option>
                  <option>{'{{monto_pago}}'}</option>
                  <option>{'{{fecha_pago}}'}</option>
                  <option>{'{{metodo_pago}}'}</option>
                  <option>{'{{ticket_id}}'}</option>
                  <option>{'{{ticket_asunto}}'}</option>
                </select>
              </div>

              {/* Textarea */}
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="w-full border border-gray-300 border-t-0 rounded-b px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono leading-relaxed"
                rows={15}
                placeholder="Escribe el contenido de la plantilla..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Usa variables como <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">{'{{nombre_cliente}}'}</code> para personalizar el mensaje
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="max-w-3xl flex items-center justify-end gap-3">
            <button
              onClick={handlePrevisualizar}
              className="px-6 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              PREVISUALIZAR
            </button>
            <button
              onClick={handleGuardar}
              className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              GUARDAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}