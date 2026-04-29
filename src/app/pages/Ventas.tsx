import { useParams } from 'react-router';
import { MisFacturasTable } from '../components/ventas/MisFacturasTable';
import { CrearFacturaForm } from '../components/ventas/CrearFacturaForm';
import { FacturacionMensualWizard } from '../components/ventas/FacturacionMensualWizard';
import { ExtrasTable } from '../components/ventas/ExtrasTable';
import { AutorizarTable } from '../components/ventas/AutorizarTable';

export function Ventas() {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'mis-facturas':
        return <MisFacturasTable />;
      case 'crear-factura':
        return <CrearFacturaForm />;
      case 'facturacion-mensual':
        return <FacturacionMensualWizard />;
      case 'extras':
        return <ExtrasTable />;
      case 'autorizar':
        return <AutorizarTable />;
      default:
        return <MisFacturasTable />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
}
