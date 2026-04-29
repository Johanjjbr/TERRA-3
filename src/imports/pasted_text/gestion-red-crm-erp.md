Gemini dijo
¡Perfecto! Vamos a diseñar la sección de "Gestión de Red" en Figma. Esta sección es compleja y abarca múltiples sub-vistas, por lo que crearemos un layout maestro y luego especificaremos las variantes para cada pestaña basada en las imágenes de referencia.

Aquí tienes el prompt detallado para que un diseñador de UI o una IA de diseño en Figma cree la interfaz de usuario completa:

Prompt de Figma para "Gestión de Red" (CRM/ERP de ISP)
Contexto y Layout General
Estamos diseñando la sección central de la aplicación CRM/ERP para un ISP (Proveedor de Servicios de Internet). El diseño debe integrarse en el layout de tres paneles ya establecido:

Sidebar Izquierdo (Mantenlo): El menú lateral ya creado, con el perfil "JESUS - CIUDAD FIBRA" arriba y el menú vertical de 16 ítems. Asegúrate de que "Gestión de Red" esté resaltado como activo y expandido, mostrando sus sub-ítems: Configuración, Planes, Nodos, Estado Radius, Cajas de Fibra. El ítem "Configuración" bajo "Gestión de Red" debe estar marcado como activo por defecto.

Área Central Principal (Contenido a diseñar): El área principal que ocupará la mayor parte de la pantalla (fondo blanco, borde sutil).

Panel Lateral Derecho (Resumen/Acciones a diseñar): Un panel lateral derecho con fondo blanco y borde izquierdo sutil para separarlo del centro.

1. Área Central Principal (Layout Maestro y Vistas)
Navegación por Pestañas (Sub-tabs)
Crea una barra de navegación horizontal superior justo debajo de la barra de título de la sección general (si la hay). Esta barra debe contener los siguientes sub-ítems para la sección de Red: CONFIGURACIÓN, PLANES, NODOS, ESTADO RADIUS, CAJAS DE FIBRA. La pestaña activa debe tener texto en azul y una línea azul gruesa en el borde inferior.

Vista 1: Pestaña "CONFIGURACIÓN" (Basada en image_4.png)
Al tener esta pestaña activa, el área central debe mostrar una vista de tarjetas organizativas:

Título: Un título grande y claro: "CONFIGURACIÓN GESTIÓN DE RED".

Contenedor de Lista de Cuadrícula (Auto Layout): Una fila de tres tarjetas o columnas organizativas, cada una con un padding sutil y bordes sutiles.

Tarjeta 1: "ADDRESS LIST"

Título: "ADDRESS LIST"

Botón "+": Un botón cuadrado blanco con un "+" azul a la derecha del título.

Lista de elementos (ejemplos): "10.6.0.1/16", "10.11.0.0/22".

Tarjeta 2: "REDES"

Título: "REDES"

Botón "+": Botón cuadrado blanco con "+" azul.

Lista de elementos (ejemplos): "NODO CAUCETE 1", "CASUARINAS", "NODO CAUCETE 2", "CASUARINA DHCP POOL", "CASUARINA DHCP POOL". (Sí, la última está duplicada como en la imagen).

Tarjeta 3: "RADIUS IP POOLS"

Título: "RADIUS IP POOLS"

Botón "+": Botón cuadrado blanco con "+" azul.

Lista de elementos (ejemplo): "test".

2. Instrucciones de Figma: Crear Variantes de Tabla como Componentes Separados
El prompt debe instruir a Figma para crear las siguientes tablas como componentes separados para que puedan ser cargadas en las otras pestañas de la sección. Todas las tablas deben tener cabeceras en gris muy claro, filas con fondo blanco alternado, tipografía sans-serif pequeña (12-13px) y usar Auto Layout para alta densidad de datos.

Variante A: Tabla "PLANES" (Basada en image_3.png)
Título de Pestaña: "Planes".

Toolbar Superior:

Botones cuadrados pequeños: [+], [Guardar], [Editar], [Papelera], [Bandera], [Lápiz con línea].

Buscador a la derecha: "Escribir y presionar Enter" con icono de lupa.

Columnas de la tabla: Checkbox, Nombre, Código, Conexiones, Precio, Moneda, Impuesto, Vel. Bajada, Vel. Subida, Descontinuado, Etiquetas, Fecha alta, Última Modificación, Predeterminado, Address list.

Fila de ejemplo detallada: "SAN CAYETANO 8 TV MAS 1...", "POSADA-SANC", "1", "79.800,00" (alineado a la derecha), "Pesos", "IVA 21%", "102400", "102400", "No", (vacío), "14/11/2025", "10/03/2026", "No", (vacío).

Variante B: Tabla "NODOS" (Basada en image_2.png)
Título de Pestaña: "Nodos".

Toolbar Superior:

Botones cuadrados pequeños: [+], [Guardar], [Editar], [Papelera].

Botón con borde: "Mapa".

Buscador a la derecha.

Columnas de la tabla: Checkbox, Código, Tipo, Ip, IP local, IP remota, Puerto, Nombre, Fecha alta, Integración, Estado (badge verde "Activo" o rojo "Sin Conexión"), Etiquetas, Url hotspot.

Fila de ejemplo detallada: "Astica", "Mikrotik", "179.0.193.166", (vacío), (vacío), "8729", "Astica", "04/11/2025", "Si", Badge verde "Activo", (vacío), (vacío).

Variante C: Tabla "ESTADO RADIUS" (Basada en image_1.png)
Título de Pestaña: "Estado Radius".

Toolbar Superior:

Botones con borde: "Exportar Historial de IP", "Ver duplicados".

Dropdown: "Archivos de Radius".

Buscador a la derecha.

Columnas de la tabla: Checkbox, Id, Dirección IP Router, Usuario, Fecha Inicio, Fecha Fin, Subida MB/s, Bajada MB/s, MAC SN, Id Session, Dirección Ip, Sesión de Accounting, Dirección IPv6, Prefijo IPv6, ID interface IPv6, Prefijo IPv6 delegado.

Fila de ejemplo detallada: "69591853", "179.0.193.154", "valle773fibra", "2026-03-18 10:13:33", (vacío), "0,00", "0,00", "6C:D2:A1:0D:04:16", "81707380", "10.100.14.168", "1", (vacío), (vacío), (vacío), (vacío).

Variante D: Tabla "CAJAS DE FIBRA" (Basada en image_0.png)
Título de Pestaña: "Cajas de Fibra".

Toolbar Superior:

Botones cuadrados pequeños: [+], [Guardar], [Editar], [Papelera].

Botones con borde: "Puertos FTTH", "Mapa", "Geolocalizar cajas de fibra".

Buscador a la derecha.

Columnas de la tabla: Checkbox, Nombre, Dirección, Puertos, Disponibles, Comentario, Lat, Lng, Etiquetas, Potencia.

Fila de ejemplo detallada: "1-1 CONTROL FORESTAL CAJA 6", "ruta 141 a 730 metros de ruta 20 - bascula", "8", "8", "CAJA CON SPLIT X8", "-31.694444", "-68.186667", (vacío), "-23.00".

3. Panel Lateral Derecho (Resumen/Acciones de Red)
Título: "RESUMEN DE RED".

Métricas de Red: Muestra métricas clave en un diseño limpio (Auto Layout). Ejemplos: "Nodos Activos: 7/8", "Cajas de Fibra: 31", "Planes de Internet: 14", "Alertas de Conexión: 1" (en rojo).

Botones de Acción Global:

Botón azul sólido: "SINCRONIZAR RED" con icono de actualización.

Botón blanco con borde gris: "GENERAR BACKUPS".

Botón blanco con borde gris: "AUDITORÍA DE RED".

