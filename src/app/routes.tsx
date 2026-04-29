import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { MainWorkspace } from "./pages/MainWorkspace";
import { GestionRed } from "./pages/GestionRed";
import { Finanzas } from "./pages/Finanzas";
import { Ventas } from "./pages/Ventas";
import { Inventario } from "./pages/Inventario";
import { Tickets } from "./pages/Tickets";
import { Usuarios } from "./pages/Usuarios";
import { Configuracion } from "./pages/Configuracion";
import { ConfiguracionRed } from "./pages/ConfiguracionRed";
import { NOCDashboard } from "./pages/NOCDashboard";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { TablesDemo } from "./pages/TablesDemo";
import { 
  Percent, 
  Building2, 
  Receipt, 
  ShoppingCart, 
  ShoppingBag, 
  Package, 
  Wifi, 
  MessageSquare, 
  Ticket, 
  User, 
  Settings, 
  Globe, 
  Server 
} from 'lucide-react';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <MainWorkspace />,
      },
      // Demo de Tablas
      {
        path: "tables-demo",
        element: <TablesDemo />,
      },
      // Gestión de red
      {
        path: "gestion-red",
        element: <GestionRed />,
      },
      {
        path: "gestion-red/:section",
        element: <GestionRed />,
      },
      // Finanzas
      {
        path: "finanzas",
        element: <Finanzas />,
      },
      {
        path: "finanzas/:section",
        element: <Finanzas />,
      },
      // Promociones
      {
        path: "promociones",
        element: <PlaceholderPage title="Promociones" icon={Percent} />,
      },
      {
        path: "promociones/:section",
        element: <PlaceholderPage title="Promociones" icon={Percent} />,
      },
      // Pagos
      {
        path: "pagos",
        element: <PlaceholderPage title="Pagos" icon={Building2} />,
      },
      {
        path: "pagos/:section",
        element: <PlaceholderPage title="Pagos" icon={Building2} />,
      },
      // Ventas
      {
        path: "ventas",
        element: <Ventas />,
      },
      {
        path: "ventas/:section",
        element: <Ventas />,
      },
      // Otros módulos sin sub-items
      {
        path: "recargos",
        element: <PlaceholderPage title="Recargos" icon={ShoppingCart} />,
      },
      {
        path: "compras",
        element: <PlaceholderPage title="Compras" icon={ShoppingBag} />,
      },
      {
        path: "inventario",
        element: <Inventario />,
      },
      {
        path: "inventario/:section",
        element: <Inventario />,
      },
      {
        path: "fichas-hotspot",
        element: <PlaceholderPage title="Fichas Hotspot" icon={Wifi} />,
      },
      {
        path: "comunicaciones",
        element: <PlaceholderPage title="Comunicaciones" icon={MessageSquare} />,
      },
      {
        path: "tickets",
        element: <Tickets />,
      },
      {
        path: "tickets/:section",
        element: <Tickets />,
      },
      // Usuarios
      {
        path: "usuarios",
        element: <Usuarios />,
      },
      {
        path: "usuarios/:section",
        element: <Usuarios />,
      },
      // Configuración
      {
        path: "configuracion",
        element: <Configuracion />,
      },
      {
        path: "configuracion/:section",
        element: <Configuracion />,
      },
      // Configuración de red
      {
        path: "configuracion-red",
        element: <ConfiguracionRed />,
      },
      // NOC Dashboard
      {
        path: "noc",
        element: <NOCDashboard />,
      },
      // ISPCube
      {
        path: "ispcube",
        element: <PlaceholderPage title="ISPCube" icon={Server} />,
      },
    ],
  },
]);