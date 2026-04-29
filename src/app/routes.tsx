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
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./contexts/ProtectedRoute";
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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <MainWorkspace />
          </ProtectedRoute>
        ),
      },
      // Demo de Tablas
      {
        path: "tables-demo",
        element: (
          <ProtectedRoute>
            <TablesDemo />
          </ProtectedRoute>
        ),
      },
      // Gestión de red
      {
        path: "gestion-red",
        element: (
          <ProtectedRoute>
            <GestionRed />
          </ProtectedRoute>
        ),
      },
      {
        path: "gestion-red/:section",
        element: (
          <ProtectedRoute>
            <GestionRed />
          </ProtectedRoute>
        ),
      },
      // Finanzas
      {
        path: "finanzas",
        element: (
          <ProtectedRoute>
            <Finanzas />
          </ProtectedRoute>
        ),
      },
      {
        path: "finanzas/:section",
        element: (
          <ProtectedRoute>
            <Finanzas />
          </ProtectedRoute>
        ),
      },
      // Promociones
      {
        path: "promociones",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="Promociones" icon={Percent} />
          </ProtectedRoute>
        ),
      },
      {
        path: "promociones/:section",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="Promociones" icon={Percent} />
          </ProtectedRoute>
        ),
      },
      // Pagos
      {
        path: "pagos",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="Pagos" icon={Building2} />
          </ProtectedRoute>
        ),
      },
      {
        path: "pagos/:section",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="Pagos" icon={Building2} />
          </ProtectedRoute>
        ),
      },
      // Ventas
      {
        path: "ventas",
        element: (
          <ProtectedRoute>
            <Ventas />
          </ProtectedRoute>
        ),
      },
      {
        path: "ventas/:section",
        element: (
          <ProtectedRoute>
            <Ventas />
          </ProtectedRoute>
        ),
      },
      // Otros módulos sin sub-items
      {
        path: "recargos",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="Recargos" icon={ShoppingCart} />
          </ProtectedRoute>
        ),
      },
      {
        path: "compras",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="Compras" icon={ShoppingBag} />
          </ProtectedRoute>
        ),
      },
      {
        path: "inventario",
        element: (
          <ProtectedRoute>
            <Inventario />
          </ProtectedRoute>
        ),
      },
      {
        path: "inventario/:section",
        element: (
          <ProtectedRoute>
            <Inventario />
          </ProtectedRoute>
        ),
      },
      {
        path: "fichas-hotspot",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="Fichas Hotspot" icon={Wifi} />
          </ProtectedRoute>
        ),
      },
      {
        path: "comunicaciones",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="Comunicaciones" icon={MessageSquare} />
          </ProtectedRoute>
        ),
      },
      {
        path: "tickets",
        element: (
          <ProtectedRoute>
            <Tickets />
          </ProtectedRoute>
        ),
      },
      {
        path: "tickets/:section",
        element: (
          <ProtectedRoute>
            <Tickets />
          </ProtectedRoute>
        ),
      },
      // Usuarios
      {
        path: "usuarios",
        element: (
          <ProtectedRoute>
            <Usuarios />
          </ProtectedRoute>
        ),
      },
      {
        path: "usuarios/:section",
        element: (
          <ProtectedRoute>
            <Usuarios />
          </ProtectedRoute>
        ),
      },
      // Configuración
      {
        path: "configuracion",
        element: (
          <ProtectedRoute>
            <Configuracion />
          </ProtectedRoute>
        ),
      },
      {
        path: "configuracion/:section",
        element: (
          <ProtectedRoute>
            <Configuracion />
          </ProtectedRoute>
        ),
      },
      // Configuración de red
      {
        path: "configuracion-red",
        element: (
          <ProtectedRoute>
            <ConfiguracionRed />
          </ProtectedRoute>
        ),
      },
      // NOC Dashboard
      {
        path: "noc",
        element: (
          <ProtectedRoute>
            <NOCDashboard />
          </ProtectedRoute>
        ),
      },
      // ISPCube
      {
        path: "ispcube",
        element: (
          <ProtectedRoute>
            <PlaceholderPage title="ISPCube" icon={Server} />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);