import { MapPin, Plus, Save, Edit, Trash2, Map, Activity, Info, ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

export function RegistrosForm() {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-auto">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Icon buttons */}
            <button className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors" title="Agregar">
              <Plus className="w-4 h-4 text-white" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Guardar">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Editar">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors border border-gray-300" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Text buttons */}
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5" />
              Mapa
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Log de Tráfico
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Tráfico
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Info CPE-ONU
            </button>
            <button className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {/* Form Grid - 3 columns */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-5 mb-6">
          {/* Razón social */}
          <div className="space-y-1.5">
            <Label htmlFor="razon-social" className="text-xs text-gray-700 font-medium">
              Razón social
            </Label>
            <Input 
              id="razon-social" 
              className="h-9 text-xs border-gray-300"
              placeholder=""
            />
          </div>

          {/* Nombre */}
          <div className="space-y-1.5">
            <Label htmlFor="nombre" className="text-xs text-gray-700 font-medium">
              Nombre
            </Label>
            <Input 
              id="nombre" 
              className="h-9 text-xs border-gray-300"
              defaultValue="JORGE ALBERTO"
            />
          </div>

          {/* Apellido */}
          <div className="space-y-1.5">
            <Label htmlFor="apellido" className="text-xs text-gray-700 font-medium">
              Apellido
            </Label>
            <Input 
              id="apellido" 
              className="h-9 text-xs border-gray-300"
              defaultValue="HERRERA"
            />
          </div>

          {/* Tipo DNI */}
          <div className="space-y-1.5">
            <Label htmlFor="tipo-dni" className="text-xs text-gray-700 font-medium">
              Tipo DNI
            </Label>
            <div className="relative">
              <select 
                id="tipo-dni"
                className="w-full h-9 text-xs border border-gray-300 rounded px-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option>DNI</option>
                <option>CUIT</option>
                <option>CUIL</option>
                <option>Pasaporte</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Número DNI */}
          <div className="space-y-1.5">
            <Label htmlFor="numero-dni" className="text-xs text-gray-700 font-medium">
              Número DNI
            </Label>
            <Input 
              id="numero-dni" 
              className="h-9 text-xs border-gray-300"
              defaultValue="26435645"
            />
          </div>

          {/* Cond. IVA */}
          <div className="space-y-1.5">
            <Label htmlFor="cond-iva" className="text-xs text-gray-700 font-medium">
              Cond. Iva
            </Label>
            <div className="relative">
              <select 
                id="cond-iva"
                className="w-full h-9 text-xs border border-gray-300 rounded px-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option>Consumidor Final</option>
                <option>Responsable Inscripto</option>
                <option>Monotributo</option>
                <option>Exento</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-3 pointer-events-none" />
            </div>
          </div>

          {/* CUIT */}
          <div className="space-y-1.5">
            <Label htmlFor="cuit" className="text-xs text-gray-700 font-medium">
              Cuit
            </Label>
            <Input 
              id="cuit" 
              className="h-9 text-xs border-gray-300"
              placeholder=""
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs text-gray-700 font-medium">
              Email
            </Label>
            <Input 
              id="email" 
              type="email"
              className="h-9 text-xs border-gray-300"
              placeholder=""
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-1.5">
            <Label htmlFor="telefono" className="text-xs text-gray-700 font-medium">
              Teléfono
            </Label>
            <Input 
              id="telefono" 
              className="h-9 text-xs border-gray-300"
              defaultValue="2645450109"
            />
          </div>

          {/* Móvil */}
          <div className="space-y-1.5">
            <Label htmlFor="movil" className="text-xs text-gray-700 font-medium">
              Móvil
            </Label>
            <Input 
              id="movil" 
              className="h-9 text-xs border-gray-300"
              placeholder=""
            />
          </div>

          {/* Dirección */}
          <div className="space-y-1.5 col-span-2">
            <Label htmlFor="direccion" className="text-xs text-gray-700 font-medium">
              Dirección
            </Label>
            <Input 
              id="direccion" 
              className="h-9 text-xs border-gray-300"
              defaultValue="CAUCETE - BARRIO CONJUNTO 2 M/I C/20"
            />
          </div>

          {/* Localidad */}
          <div className="space-y-1.5">
            <Label htmlFor="localidad" className="text-xs text-gray-700 font-medium">
              Localidad
            </Label>
            <Input 
              id="localidad" 
              className="h-9 text-xs border-gray-300"
              defaultValue="Caucete"
            />
          </div>

          {/* Provincia */}
          <div className="space-y-1.5">
            <Label htmlFor="provincia" className="text-xs text-gray-700 font-medium">
              Provincia
            </Label>
            <div className="relative">
              <select 
                id="provincia"
                className="w-full h-9 text-xs border border-gray-300 rounded px-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option>San Juan</option>
                <option>Buenos Aires</option>
                <option>Córdoba</option>
                <option>Santa Fe</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Código Postal */}
          <div className="space-y-1.5">
            <Label htmlFor="codigo-postal" className="text-xs text-gray-700 font-medium">
              Código Postal
            </Label>
            <Input 
              id="codigo-postal" 
              className="h-9 text-xs border-gray-300"
              defaultValue="5442"
            />
          </div>

          {/* Coordenadas */}
          <div className="space-y-1.5">
            <Label htmlFor="coordenadas" className="text-xs text-gray-700 font-medium">
              Coordenadas
            </Label>
            <div className="relative">
              <Input 
                id="coordenadas" 
                className="h-9 text-xs border-gray-300 pr-8"
                placeholder=""
              />
              <MapPin className="w-4 h-4 text-gray-400 absolute right-2 top-2.5" />
            </div>
          </div>

          {/* Observaciones - Full width */}
          <div className="space-y-1.5 col-span-3">
            <Label htmlFor="observaciones" className="text-xs text-gray-700 font-medium">
              Observaciones
            </Label>
            <textarea 
              id="observaciones"
              className="w-full h-20 text-xs border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder=""
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="h-9 text-xs px-6 border-gray-300 hover:bg-gray-50 uppercase"
          >
            Cancelar
          </Button>
          <Button 
            className="h-9 text-xs px-6 bg-blue-600 hover:bg-blue-700 uppercase"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}