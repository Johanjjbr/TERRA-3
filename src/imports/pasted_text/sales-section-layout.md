Contexto y Layout General
Estamos diseñando la sección de "Ventas" del área central de la aplicación CRM/ERP.

Sidebar Izquierdo: El menú lateral debe tener el ítem "Ventas" expandido y resaltado. Sus sub-ítems visibles deben ser: Mis facturas, Crear factura, Facturación mensual, Extras, Autorizar. (Para la primera vista, "Mis facturas" estará activo).

Área Central Principal: El área principal de trabajo utilizará el sistema de pestañas (Tabs) dinámicas en la parte superior. Cada vista que diseñaremos representa una de estas pestañas. Fondo general blanco o gris muy claro (#F8FAFC), usando Auto Layout para todos los elementos.

1. Vista A: Pestaña "Mis facturas" (Tabla de Datos)
Basada en la imagen image_7a86c4.png

Pestaña Superior: Tab activa con el texto "Mis facturas" y botón "x".

Toolbar Superior:

Grupo izquierdo: Botones cuadrados pequeños con iconos: [+], [Sobre/Email], [Impresora], [Papelera]. Separador vertical |.

Botón con texto y borde: Un botón blanco con borde y un icono de "x" o prohibido que diga "Anular factura/s".

A la derecha: Botón de filtro (embudo) y buscador "Escribir y presionar Enter" con icono de lupa.

Tabla de Datos:

Cabeceras: Checkbox, Fecha, Tipo, N°, Código, Nombre, Descripción, 1 Vencimiento, Total, Fecha Real, Deuda, Vendedor, y Acciones (icono de lista).

Fila de ejemplo: Fecha "18/03/2026", Tipo "CX", N° "92869" (enlace azul), Código "003447", Nombre "JULIANA MICAELA VILLEGAS" (enlace azul), Descripción "Ajuste Saldo", Vencimiento "18/03/2026", Total "5.000,00" (alineado a la derecha), Deuda "0,00".

Footer de Tabla: * Alineado a la derecha, debajo de los montos, un bloque de subtotales: "Registros visibles: 22.000,00" (en negrita) y "Total registros: Calcular" (Calcular como enlace azul).

Abajo del todo: Paginación estándar (Mostrar 10 registros, Registros del 1 al 10 de 254,463, controles < 1 2 3 ... 25447 >).

2. Vista B: Pestaña "Crear factura" (Formulario Complejo)
Basada en la imagen image_7a86c7.png (Pestaña "Facturas creando")

Pestaña Superior: Tab activa "Facturas creando" con botón "x".

Título de Sección: "NUEVA FACTURA" (Texto oscuro, negrita, alineado a la izquierda).

Estructura: Un layout de 3 columnas para formularios (Auto layout horizontal, gap amplio).

Columna 1: DATOS CLIENTE

Título: DATOS CLIENTE (azul, texto pequeño en mayúsculas). Línea divisoria inferior azul.

Campos: "ID Cliente" (con icono de búsqueda). El resto de campos deben verse deshabilitados/opacos (fondo gris muy claro): "Nombre cliente", "CUIT/CUIL/DNI", "Dirección", "Código postal", "Ciudad", "Condición frente al IVA".

Columna 2: DATOS FACTURA

Título: DATOS FACTURA.

Campos (activos): "Tipo comprobante" (Dropdown), "Valor tipo de cambio" (1), "Fecha" (18/03/2026 con icono calendario), "1 Vencimiento", "2 Vencimiento", "Descripción" (Valor: "Factura Manual"), "Concepto" (Dropdown: "Servicios").

Columna 3: CARGAR ITEMS FACTURA

Título: CARGAR ITEMS FACTURA.

Control superior: Toggle switch (interruptor) con texto "Seleccionar ítems de mis listados".

Fila de inputs en línea (Grid): Código listado (input pequeño + lupa), Descripción (input mediano), Cantidad (1), Precio (input), Impuesto (Dropdown "IVA 21%"), Botón "✓ AGREGAR" (blanco con borde azul y texto azul).

Área central vacía: Texto centrado "Todavía no hay ítems cargados".

Caja de Totales (abajo a la derecha): Una pequeña cuadrícula alineada a la derecha con: Subtotal (0.00), IVA 21% (0.00), IVA 10.5% (0.00), IVA 27% (0.00), Total (0.00, con fondo azul claro).

Footer de Formulario (Barra inferior):

Izquierda: Checkbox "Enviar factura por correo al emitir".

Derecha: Botones "CERRAR" (blanco, borde gris) y "EMITIR FACTURA" (azul sólido).

3. Vista C: Pestaña "Facturación mensual" (Wizard / Configurador)
Basada en la imagen image_7a86c9.png

Pestaña Superior: Tab activa "Facturación mensual" con botón "x".

Sub-navegación (Tabs internas horizontales): "1. CONFIGURACIÓN LOTE" (activo, texto azul, línea azul inferior), "2. GENERAR FACTURAS", "3. FACTURACIÓN EN CURSO".

Estructura: Tres columnas.

Columna 1: PARÁMETROS GENERALES

Campos: Período a facturar ("Abril - 2026"), Fecha ("18/03/2026"), 1er vencimiento, 2do vencimiento, Valor Dólar ("$ 1"). (Todos con label superior).

Columna 2: PARÁMETROS AVANZADOS

Toggle "Parcial" alineado a la derecha en su fila. Campos: "Desde", "Hasta".

Toggle "Facturar bloqueados". Segmented control / Botones agrupados: "Hasta deuda" (activo, gris) / "Todos" (inactivo, blanco). Campo: "Hasta ($ 0)".

Columna 3: ADELANTOS Y ACCIONES

Toggle "Primer mes por adelantado". Campos: "Desde", "Hasta".

Abajo a la derecha: Botones "CERRAR" (blanco) y "PREVISUALIZAR" (azul sólido).

4. Vista D: Pestaña "Extras" (Tabla de Datos)
Basada en la imagen image_7a86cc.png

Pestaña Superior: Tab activa "Extras" con botón "x".

Toolbar Superior: Botones cuadrados: [+], [Guardar/Disquete], [Etiqueta], [Documento], [Lápiz], [Papelera]. A la derecha: Filtro y Buscador.

Tabla de Datos:

Cabeceras: Checkbox, Código, Cód. Cliente, Cliente, Extra, Monto, Moneda, Meses, Restante, Sin límite de tiempo, Finalizado, Fecha alta, Etiquetas, Operador, Eliminado, Comentario, Acciones.

Fila de ejemplo: "3252", "009279", "SOFIA NELLY GUZMAN" (enlace azul), "Desplazamiento + 2 Conec...", "5.000,00", "Pesos", "1", "1", "No", "No", "17/03/2026", (vacío), "JESUS", "No", (vacío).

Paginación: Mostrar 10 registros. Texto: "Registros del 1 al 10 de 81 registros".

Notas de Diseño para Figma:
Mantener el espaciado (padding/margin) consistente usando variables o estilos locales (ej. p-4 o 16px).

Los enlaces clicables (Nombres, Números de Factura, IPs) deben ir en el color corporativo azul primario y font-weight medium.

Mantener la altura de las filas de tabla en unos 40px a 48px para asegurar la alta densidad de información sin perder legibilidad.