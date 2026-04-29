import { useParams } from 'react-router';
import { ConfiguracionView } from '../components/tickets/ConfiguracionView';
import { TicketsTable } from '../components/tickets/TicketsTable';
import { CalendarioView } from '../components/tickets/CalendarioView';

export function Tickets() {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'tickets-list':
        return <TicketsTable />;
      case 'calendario':
        return <CalendarioView />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return <TicketsTable />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
}
