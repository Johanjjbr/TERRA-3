import { useParams } from 'react-router';
import { ConfiguracionView } from '../components/finanzas/ConfiguracionView';
import { CajaTable } from '../components/finanzas/CajaTable';
import { ChequesTable } from '../components/finanzas/ChequesTable';
import { CuentasTable } from '../components/finanzas/CuentasTable';
import { ImpuestosTable } from '../components/finanzas/ImpuestosTable';

export function Finanzas() {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'finanzas-config':
        return <ConfiguracionView />;
      case 'caja':
        return <CajaTable />;
      case 'cheques':
        return <ChequesTable />;
      case 'cuentas':
        return <CuentasTable />;
      case 'impuestos':
        return <ImpuestosTable />;
      default:
        return <CajaTable />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
}