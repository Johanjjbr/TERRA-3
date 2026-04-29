import { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';

interface Client {
  id: string;
  codigo: string;
  nombre: string;
  desde: string;
  domicilio: string;
  estado: 'Habilitado' | 'Bloqueado' | 'Sin servicio';
  etiquetas?: string[];
  codPlan: string;
  nodo: string;
  tipoId: string;
  numeroDoc: string;
  telefono: string;
  fechaBloqueo?: string;
  apoyo?: string;
  conexion: string;
  idNum: string;
  lg?: string;
  contratoSinFirmar: boolean;
  cajaFibra?: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    codigo: '000352',
    nombre: 'LORENA CABRERA GO',
    desde: '0,00',
    domicilio: 'CAUCETE - PE DE PA...',
    estado: 'Habilitado',
    etiquetas: ['LITC'],
    codPlan: '200HOGAP',
    nodo: 'HUAWEI1',
    tipoId: 'DNI',
    numeroDoc: '23948521',
    telefono: '2645800235',
    conexion: 'Sí',
    idNum: '1',
    contratoSinFirmar: false,
  },
  {
    id: '2',
    codigo: '000496',
    nombre: 'SOFIA DE LAS MERCE RU',
    desde: '0,00',
    domicilio: 'JUAN MARTIN LU...',
    estado: 'Sin servicio',
    codPlan: '',
    nodo: '',
    tipoId: 'DNI',
    numeroDoc: '44674637',
    telefono: '2645588892',
    conexion: 'No',
    idNum: '2',
    contratoSinFirmar: false,
  },
  {
    id: '3',
    codigo: '000408',
    nombre: 'NELSON HERNAN DA',
    desde: '0,00',
    domicilio: 'CAUCETE - VILLA RO...',
    estado: 'Sin servicio',
    codPlan: '',
    nodo: '',
    tipoId: 'DNI',
    numeroDoc: '23681703',
    telefono: '2645404463',
    conexion: 'No',
    idNum: '3',
    contratoSinFirmar: false,
  },
  {
    id: '4',
    codigo: '000364',
    nombre: 'RODRIGO EDITH ERO',
    desde: '20.000,00',
    domicilio: 'VALLE FERTIL - ENTR...',
    estado: 'Habilitado',
    etiquetas: ['LITC'],
    codPlan: 'WIRELESS-50MB',
    nodo: 'Mikrotik Central',
    tipoId: 'DNI',
    numeroDoc: '17740606',
    telefono: '2644819848',
    conexion: 'Sí',
    idNum: '4',
    contratoSinFirmar: false,
  },
  {
    id: '5',
    codigo: '000463',
    nombre: 'ANTONIO ROBERTO',
    desde: '0,00',
    domicilio: 'SAN MARTIN - LA PU...',
    estado: 'Sin servicio',
    codPlan: '',
    nodo: '',
    tipoId: 'DNI',
    numeroDoc: '24656976',
    telefono: '2646227119',
    conexion: 'No',
    idNum: '5',
    contratoSinFirmar: false,
  },
  {
    id: '6',
    codigo: '000352',
    nombre: 'WILSON ROSANA LI...',
    desde: '0,00',
    domicilio: 'CAUCETE - VILLA COL...',
    estado: 'Sin servicio',
    codPlan: '',
    nodo: '',
    tipoId: 'DNI',
    numeroDoc: '22750732',
    telefono: '2644880954',
    conexion: 'No',
    idNum: '6',
    contratoSinFirmar: false,
  },
  {
    id: '7',
    codigo: '000531',
    nombre: 'JOSE ALEXIS SALAZA',
    desde: '115.000,00',
    domicilio: 'CAUCETE - BARRIO U...',
    estado: 'Habilitado',
    codPlan: '100HOGAP',
    nodo: 'HUAWEI-OLT-Norte',
    tipoId: 'DNI',
    numeroDoc: '38255555',
    telefono: '2810158994',
    lg: '-47.416832, -68.817323',
    conexion: 'Sí',
    idNum: '7',
    contratoSinFirmar: false,
  },
  {
    id: '8',
    codigo: '000346',
    nombre: 'JORGE ALBERTO HERRERA',
    desde: '0,00',
    domicilio: 'CAUCETE - BARRIO...',
    estado: 'Habilitado',
    codPlan: 'ANTENA-100MB',
    nodo: 'Mikrotik Torre Sur',
    tipoId: 'DNI',
    numeroDoc: '26301794',
    telefono: '2645254063',
    conexion: 'Sí',
    idNum: '8',
    contratoSinFirmar: false,
  },
  {
    id: '9',
    codigo: '000759',
    nombre: 'JOSE ANTONIO SARD',
    desde: '0,00',
    domicilio: 'CAUCETE - LOS MEDI...',
    estado: 'Habilitado',
    codPlan: '100HOGAP',
    nodo: 'Radius Principal',
    tipoId: 'DNI',
    numeroDoc: '41172265',
    telefono: '2615219636',
    conexion: 'No',
    idNum: '9',
    contratoSinFirmar: false,
  },
  {
    id: '10',
    codigo: '000458',
    nombre: 'FABIAN ANTONIO SA',
    desde: '115.000,00',
    domicilio: 'VALLE FERTIL - BARRI...',
    estado: 'Habilitado',
    codPlan: 'POSPITAL',
    nodo: 'Radius Principal',
    tipoId: 'DNI',
    numeroDoc: '21821653',
    telefono: '2646347.61 |UMA...',
    lg: '-47.445836, -68.448566',
    conexion: 'No',
    idNum: '10',
    contratoSinFirmar: false,
  },
];

interface ClientsListProps {
  onClientClick: (client: Client) => void;
}

export function ClientsList({ onClientClick }: ClientsListProps) {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClients(mockClients.map(c => c.id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleSelectClient = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedClients([...selectedClients, id]);
    } else {
      setSelectedClients(selectedClients.filter(cId => cId !== id));
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'Habilitado':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Habilitado</Badge>;
      case 'Bloqueado':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">Bloqueado</Badge>;
      case 'Sin servicio':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">Sin servicio</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-left w-10">
                <Checkbox 
                  checked={selectedClients.length === mockClients.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700 w-10"></th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Código</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Desde</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Domicilio</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Etiquetas</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Cod. Plan</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nodo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo ID</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Número Doc</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Teléfono</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha de bloqueo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Apoyo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700"># conexión</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Id#</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">L+g</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Con contrato sin firmar</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Caja de fibra</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {mockClients.map((client) => (
              <tr 
                key={client.id}
                onClick={() => onClientClick(client)}
                className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedClients.includes(client.id)}
                    onCheckedChange={(checked) => handleSelectClient(client.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-700">{client.idNum}</td>
                <td className="px-3 py-2 text-gray-700">{client.codigo}</td>
                <td className="px-3 py-2">
                  <a className="text-blue-600 hover:underline">{client.nombre}</a>
                </td>
                <td className="px-3 py-2 text-gray-700">{client.desde}</td>
                <td className="px-3 py-2 text-gray-700">{client.domicilio}</td>
                <td className="px-3 py-2">{getEstadoBadge(client.estado)}</td>
                <td className="px-3 py-2">
                  {client.etiquetas?.map((tag, idx) => (
                    <Badge key={idx} className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs mr-1">
                      {tag}
                    </Badge>
                  ))}
                </td>
                <td className="px-3 py-2 text-gray-700">{client.codPlan}</td>
                <td className="px-3 py-2 text-gray-700">{client.nodo}</td>
                <td className="px-3 py-2 text-gray-700">{client.tipoId}</td>
                <td className="px-3 py-2 text-gray-700">{client.numeroDoc}</td>
                <td className="px-3 py-2 text-gray-700">{client.telefono}</td>
                <td className="px-3 py-2 text-gray-700">{client.fechaBloqueo || ''}</td>
                <td className="px-3 py-2 text-gray-700">{client.apoyo || ''}</td>
                <td className="px-3 py-2 text-gray-700">{client.conexion}</td>
                <td className="px-3 py-2 text-gray-700"></td>
                <td className="px-3 py-2 text-gray-700 text-xs">{client.lg || ''}</td>
                <td className="px-3 py-2 text-gray-700">{client.contratoSinFirmar ? 'Sí' : 'No'}</td>
                <td className="px-3 py-2 text-gray-700">{client.cajaFibra || '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>Mostrar</span>
          <select 
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-xs outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>registros</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            3
          </button>
          <span className="px-2">...</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            688
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al 10 de 6.879 registros
        </div>
      </div>
    </div>
  );
}
