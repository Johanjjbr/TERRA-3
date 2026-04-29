import { useParams } from 'react-router';
import { ConfiguracionView } from '../components/gestion-red/ConfiguracionView';
import { PlanesTable } from '../components/gestion-red/PlanesTable';
import { NodosTable } from '../components/gestion-red/NodosTable';
import { EstadoRadiusTable } from '../components/gestion-red/EstadoRadiusTable';
import { CajasFibraTable } from '../components/gestion-red/CajasFibraTable';

export function GestionRed() {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'gestion-config':
        return <ConfiguracionView />;
      case 'planes':
        return <PlanesTable />;
      case 'nodos':
        return <NodosTable />;
      case 'estado-radius':
        return <EstadoRadiusTable />;
      case 'cajas-fibra':
        return <CajasFibraTable />;
      default:
        return <ConfiguracionView />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
}