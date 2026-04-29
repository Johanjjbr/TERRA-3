import { useState } from 'react';
import { Plus, Save, Trash2, Download, RotateCcw, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

interface Backup {
  id: string;
  fecha: string;
  nombreArchivo: string;
  tamano: string;
  tipo: string;
  creadoPor: string;
}

const backupsData: Backup[] = [
  {
    id: '1',
    fecha: '18/03/2026 02:00:00',
    nombreArchivo: 'backup_db_18032026.sql',
    tamano: '145 MB',
    tipo: 'Automático',
    creadoPor: 'Sistema',
  },
  {
    id: '2',
    fecha: '17/03/2026 02:00:00',
    nombreArchivo: 'backup_db_17032026.sql',
    tamano: '144 MB',
    tipo: 'Automático',
    creadoPor: 'Sistema',
  },
  {
    id: '3',
    fecha: '16/03/2026 15:30:00',
    nombreArchivo: 'backup_manual_config.sql',
    tamano: '12 MB',
    tipo: 'Manual',
    creadoPor: 'admin',
  },
  {
    id: '4',
    fecha: '16/03/2026 02:00:00',
    nombreArchivo: 'backup_db_16032026.sql',
    tamano: '143 MB',
    tipo: 'Automático',
    creadoPor: 'Sistema',
  },
  {
    id: '5',
    fecha: '15/03/2026 02:00:00',
    nombreArchivo: 'backup_db_15032026.sql',
    tamano: '142 MB',
    tipo: 'Automático',
    creadoPor: 'Sistema',
  },
  {
    id: '6',
    fecha: '14/03/2026 18:45:00',
    nombreArchivo: 'backup_preupdate.sql',
    tamano: '141 MB',
    tipo: 'Manual',
    creadoPor: 'supervisor',
  },
  {
    id: '7',
    fecha: '14/03/2026 02:00:00',
    nombreArchivo: 'backup_db_14032026.sql',
    tamano: '141 MB',
    tipo: 'Automático',
    creadoPor: 'Sistema',
  },
  {
    id: '8',
    fecha: '13/03/2026 02:00:00',
    nombreArchivo: 'backup_db_13032026.sql',
    tamano: '140 MB',
    tipo: 'Automático',
    creadoPor: 'Sistema',
  },
  {
    id: '9',
    fecha: '12/03/2026 02:00:00',
    nombreArchivo: 'backup_db_12032026.sql',
    tamano: '139 MB',
    tipo: 'Automático',
    creadoPor: 'Sistema',
  },
  {
    id: '10',
    fecha: '11/03/2026 02:00:00',
    nombreArchivo: 'backup_db_11032026.sql',
    tamano: '138 MB',
    tipo: 'Automático',
    creadoPor: 'Sistema',
  },
];

export function BackupsView() {
  const [selectedBackups, setSelectedBackups] = useState<string[]>([]);
  const [recordsPerPage, setRecordsPerPage] = useState('10');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBackups(backupsData.map(b => b.id));
    } else {
      setSelectedBackups([]);
    }
  };

  const handleSelectBackup = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedBackups([...selectedBackups, id]);
    } else {
      setSelectedBackups(selectedBackups.filter(bId => bId !== id));
    }
  };

  const handleDownload = (backup: Backup) => {
    console.log('Descargar backup:', backup.nombreArchivo);
  };

  const handleRestore = (backup: Backup) => {
    console.log('Restaurar backup:', backup.nombreArchivo);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Icon buttons */}
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Crear backup">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Guardar configuración">
              <Save className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Eliminar">
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar backup..."
              className="flex-1 text-xs outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-left w-10">
                <Checkbox 
                  checked={selectedBackups.length === backupsData.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre de Archivo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tamaño</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-3 py-2 text-left font-medium text-gray-700">Creado por</th>
              <th className="px-3 py-2 text-center font-medium text-gray-700 w-24">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {backupsData.map((backup) => (
              <tr 
                key={backup.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">
                  <Checkbox 
                    checked={selectedBackups.includes(backup.id)}
                    onCheckedChange={(checked) => handleSelectBackup(backup.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-2 text-gray-900">{backup.fecha}</td>
                <td className="px-3 py-2">
                  <code className="text-blue-600 font-mono text-xs">
                    {backup.nombreArchivo}
                  </code>
                </td>
                <td className="px-3 py-2 font-medium text-gray-900">{backup.tamano}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    backup.tipo === 'Automático' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {backup.tipo}
                  </span>
                </td>
                <td className="px-3 py-2 text-gray-700">{backup.creadoPor}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button 
                      onClick={() => handleDownload(backup)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors" 
                      title="Descargar"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => handleRestore(backup)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors" 
                      title="Restaurar"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-green-600" />
                    </button>
                  </div>
                </td>
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
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
          <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-gray-600">
          Registros del 1 al 10 de {backupsData.length} registros
        </div>
      </div>
    </div>
  );
}
