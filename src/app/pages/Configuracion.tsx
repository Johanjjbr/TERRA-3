import { useParams } from 'react-router';
import {
  GeneralView,
  CorteBloqueoView,
  PlantillasView,
  ModulosView,
  VariablesView,
  BackupsView,
} from '../components/configuracion';
import { Settings } from 'lucide-react';

export function Configuracion() {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'general':
        return <GeneralView />;
      case 'corte-bloqueo':
        return <CorteBloqueoView />;
      case 'plantillas':
        return <PlantillasView />;
      case 'modulos':
        return <ModulosView />;
      case 'variables':
        return <VariablesView />;
      case 'backups':
        return <BackupsView />;
      case 'empresas':
      case 'archivos':
      case 'codigos-postales':
      case 'app-portal':
      case 'resumenes':
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#F8FAFC]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Configuración - {section?.replace('-', ' ').toUpperCase()}
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                Esta sección está disponible para configuración adicional.
              </p>
            </div>
          </div>
        );
      default:
        return <GeneralView />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
}