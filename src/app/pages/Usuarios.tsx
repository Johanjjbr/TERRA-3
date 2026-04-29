import { useParams } from 'react-router';
import {
  UsuariosTable,
  PermisosView,
  NotificacionesView,
  LogsView,
} from '../components/usuarios';

export function Usuarios() {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'permisos-vistas':
        return <PermisosView />;
      case 'notificaciones-usuario':
        return <NotificacionesView />;
      case 'logs':
        return <LogsView />;
      default:
        return <UsuariosTable />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
}