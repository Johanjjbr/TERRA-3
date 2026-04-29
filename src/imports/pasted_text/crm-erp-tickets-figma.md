Prompt de Figma para "Tickets" (CRM/ERP de ISP)
Contexto y Layout General
Estamos diseñando la sección de "Tickets" del área central de la aplicación CRM/ERP.

Sidebar Izquierdo: El menú lateral debe tener el ítem "Tickets" expandido y resaltado. Sus sub-ítems deben ser: "Tickets" y "Calendario".

Área Central Principal: El área principal de trabajo utilizará el sistema de pestañas (Tabs) dinámicas en la parte superior. Fondo general blanco o gris muy claro (#F8FAFC), usando Auto Layout. Tipografía base sans-serif pequeña (12-13px).

1. Vista A: Pestaña "Configuración" (Layout de Tarjetas)
Basada en la imagen image_7996c9.png

Pestaña Superior: Tab activa con el texto "Configuración" y botón "x".

Título de Sección: "CONFIGURACIÓN DE TICKETS" (Texto oscuro, negrita, tamaño mediano).

Estructura (Auto Layout Grid): Una fila con 3 o 4 columnas o "Listas de tarjetas". Cada columna tiene un encabezado gris claro, título en azul oscuro y una lista de ítems.

Columna 1: "ÁREAS"

Encabezado: "ÁREAS" con botón cuadrado "+" azul a la derecha.

Ítems (Cajas blancas, texto centrado azul, botón de papelera al hacer hover): "Soporte Técnico", "Ventas", "Administración", "Bajas".

Columna 2: "ESTADOS"

Encabezado: "ESTADOS" con botón "+".

Ítems: "Abierto", "En proceso", "Resuelto", "Cerrado", "Rechazado".

Columna 3: "ASUNTOS"

Encabezado: "ASUNTOS" con botón "+".

Estructura anidada: Esta lista muestra grupos desplegables.

Grupo 1: "Soporte Técnico" (fondo gris claro). Debajo, sub-ítems identados: "Activación", "Baja", "Cambio de domicilio", "Corte de Fibra", "Falta de servicio", "INSTALACION".

Grupo 2: "Ventas". Sub-ítems: "Consulta de cobertura", "Venta nueva".

2. Vista B: Pestaña "Tickets" (Tabla de Datos)
Basada en la imagen image_7996c8.png

Pestaña Superior: Tab activa "Tickets" con botón "x".

Toolbar Superior:

Grupo de iconos cuadrados: [+], [Guardar/Disquete], [Papelera], [PDF], [Excel], [Lista/Ajustes de tabla]. Separador vertical |.

A la derecha: Botón de filtro (embudo) y buscador "Escribir y presionar Enter" con icono de lupa.

Tabla de Datos:

Cabeceras: Checkbox, Id, Cliente, Área, Estado, Asunto, Operador, Prioridad, Fecha asignación, N° Factura, Nodo, Creado, Última actualización, Creado por, Acciones.

Detalles de Fila de Ejemplo 1 (En proceso): "219714" (Enlace azul), "JULIO CESAR GUZMAN" (Enlace azul), "Soporte Técnico", Badge Amarillo "EN PROCESO", "INSTALACION" (Enlace azul), "JULIO", Badge Gris "NORMAL", "19/03/2026 a las 09:30 - 10:00 hs.", (vacío), (vacío), "18/03/2026 12:44", "18/03/2026 12:44", "JESUS", (icono acciones).

Detalles de Fila de Ejemplo 2 (Cerrado/Alta): "219502", "DANIEL ESTEBAN ZABALETA", "Soporte Técnico", Badge Gris Bordeado "CERRADO", "Falta de servicio", "MARCELO", Badge Rojo "ALTA", (vacío), (vacío), (vacío), "17/03/2026 12:50", "17/03/2026 18:31", "JESUS".

Footer de Tabla: Paginación estándar. Mostrar 10 registros. Texto: "Registros del 1 al 10 de 16,929 registros".

3. Vista C: Pestaña "Calendario" (Grilla de turnos y Zonas)
Basada en la imagen image_7996c7.png

Pestaña Superior: Tab activa "Calendario" con botón "x".

Layout Principal: Dividido en dos grandes bloques: Área del Calendario (80% ancho) y Panel lateral derecho de Zonas (20% ancho).

Área del Calendario (Izquierda):

Header del calendario: Título "MI CALENDARIO". A la derecha, toggle "Filtrar por mis zonas" y un Dropdown selector de operador "Todos los operadores" (con "JULIO" seleccionado).

Controles de mes: Botones [<] y [>] con el texto del mes actual: "marzo 2026" (o "Hoy"). Toggle "Mes / Semana / Día".

Grilla (Mes): Cabeceras de días (lun, mar, mié, jue, vie, sáb, dom). Celdas para cada día. El día actual (ej. 18) debe estar resaltado sutilmente.

Evento en el calendario (Bloque de visita): En el día correspondiente (ej. 19 de marzo), un bloque horizontal para el ticket 219714.

Diseño del bloque: Borde izquierdo de color (ej. verde oscuro, asociado al operador JULIO), fondo verde muy claro.

Texto del bloque (11px/12px): "09:30 219714 JULIO CESAR GUZMAN - Caucete Centro".

Panel Lateral "ZONAS" (Derecha):

Fondo gris muy claro o blanco con borde izquierdo.

Título: "ZONAS".

Lista de Checkboxes (Auto Layout vertical, gap 8px):

[x] Caucete Centro

[x] Bermejo

[x] Casuarinas

[x] Caucete - Área 1

[x] Caucete - Área 2

Continuar con un listado simulado de zonas...

Este panel permite filtrar qué visitas se ven en el calendario.

Notas de Diseño para Figma:
Badges (Etiquetas de estado): Son críticos para la legibilidad. Usa colores semánticos suaves para los fondos y texto oscuro/saturado (Ej: EN PROCESO = Fondo amarillo claro, texto naranja/marrón oscuro; CERRADO = Fondo transparente, borde gris, texto gris; ALTA = Fondo rojo claro, texto rojo oscuro).

Consistencia de Datos: Notar que el ticket 219714 del cliente "JULIO CESAR GUZMAN" aparece tanto en la tabla "Tickets" como en la grilla del "Calendario". Mantener estos pequeños detalles da mucha credibilidad al prototipo.