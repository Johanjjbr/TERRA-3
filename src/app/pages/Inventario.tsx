import { useParams } from 'react-router';
import { ConfiguracionView } from '../components/inventario/ConfiguracionView';
import { ProductosTable } from '../components/inventario/ProductosTable';
import { EquiposTable } from '../components/inventario/EquiposTable';
import { MovimientosTable } from '../components/inventario/MovimientosTable';
import { ProveedoresTable } from '../components/inventario/ProveedoresTable';
import { ComprasTable } from '../components/inventario/ComprasTable';

export function Inventario() {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'inventario-config':
        return <ConfiguracionView />;
      case 'productos':
        return <ProductosTable />;
      case 'equipos':
        return <EquiposTable />;
      case 'movimientos':
        return <MovimientosTable />;
      case 'proveedores':
        return <ProveedoresTable />;
      case 'compras':
        return <ComprasTable />;
      default:
        return <ProductosTable />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
}
