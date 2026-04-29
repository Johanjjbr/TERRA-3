Estamos diseñando la sección de "Configuración" del área central de la aplicación CRM/ERP.

Sidebar Izquierdo: El menú lateral debe tener el ítem "Configuración" expandido y resaltado. Sus sub-ítems visibles son: General, Corte y Bloqueo, Plantillas, Empresas, Archivos, Backups, Códigos postales, App y portal, Resúmenes, Módulos, Variables.

Área Central Principal: Usaremos el sistema de pestañas (Tabs) dinámicas en la parte superior. Fondo general blanco o gris muy claro (#F8FAFC), usando estrictamente Auto Layout. Tipografía base sans-serif pequeña (12-13px).

1. Vista A: Pestaña "General" (Formulario de Empresa)
Pestaña Superior: Tab activa con el texto "General" y botón "x".

Layout: Contenedor principal dividido en dos columnas (70% izquierda para datos, 30% derecha para logo/imágenes).

Columna Izquierda (Datos de la Empresa):

Título: "DATOS GENERALES" (Azul, texto pequeño, línea divisoria inferior).

Cuadrícula de Inputs (Grid 2 columnas): Razón Social, Nombre de Fantasía, CUIT/RUT, Dirección, Teléfono, Email corporativo, Sitio Web, Moneda por defecto (Dropdown: "Pesos", "Dólares"), Zona Horaria (Dropdown: "GMT-3 Buenos Aires").

Todos los inputs deben tener su respectivo label superior en gris oscuro (12px) y caja con borde gris claro.

Columna Derecha (Identidad Visual):

Título: "LOGOTIPO Y MARCA".

Área de subida de imagen: Un recuadro punteado (Dash) gris claro con un icono de imagen y el texto "Arrastrar logo aquí o Cargar imagen". Debajo, un logo de ejemplo ("CIUDAD FIBRA").

Footer de Formulario: Alineado a la derecha, botón "GUARDAR CAMBIOS" (Azul sólido).

2. Vista B: Pestaña "Corte y Bloqueo" (Reglas y Toggles)
Pestaña Superior: Tab activa "Corte y Bloqueo" con botón "x".

Layout: Estructura de tarjetas verticales apiladas, cada una manejando un aspecto de la morosidad.

Tarjeta 1: "Reglas de Suspensión Automática"

Toggle (Interruptor): "Activar corte automático por falta de pago" (Encendido/Azul).

Inputs en línea: "Suspender servicio a los [ 5 ] días después del vencimiento".

Toggle: "Aplicar recargo automático al suspender".

Tarjeta 2: "Aviso en Pantalla (Portal Cautivo)"

Toggle: "Mostrar aviso de deuda en el navegador del cliente" (Encendido/Azul).

Inputs en línea: "Mostrar aviso [ 3 ] días antes del vencimiento".

Selector: IP de redirección o perfil de bloqueo del Mikrotik.

Footer: Botón "GUARDAR CONFIGURACIÓN".

3. Vista C: Pestaña "Módulos" (Grid de Tarjetas / Switches)
Pestaña Superior: Tab activa "Módulos" con botón "x".

Layout: Cuadrícula (Grid) de 3 a 4 columnas con tarjetas rectangulares.

Diseño de Tarjeta de Módulo:

Fondo blanco, borde sutil, sombra muy ligera al hacer hover.

Parte superior: Icono representativo a la izquierda, Toggle switch a la derecha.

Centro: Título en negrita (ej. "Facturación Electrónica AFIP", "Portal de Clientes", "Sistema de Tickets", "Integración WhatsApp", "Control de Inventario").

Parte inferior: Breve texto descriptivo en gris claro (ej. "Permite a los clientes ver sus facturas y pagar online").

Estado: Muestra un par de tarjetas con el toggle encendido (icono y borde azul) y otras apagadas (grisáceas).

4. Vista D: Pestaña "Plantillas" (Lista de Edición)
Pestaña Superior: Tab activa "Plantillas" con botón "x".

Layout: Dos paneles. Panel izquierdo (30%) lista de plantillas, Panel derecho (70%) editor.

Panel Izquierdo (Lista):

Buscador superior.

Lista de ítems seleccionables: "Bienvenida nuevo cliente", "Aviso de vencimiento (Email)", "Aviso de vencimiento (SMS)", "Confirmación de pago", "Ticket resuelto". El ítem activo debe tener fondo azul muy claro y borde izquierdo azul.

Panel Derecho (Editor):

Título de la plantilla seleccionada y Toggle "Habilitada".

Input: "Asunto del Email".

Barra de herramientas (Rich Text): Negrita, Cursiva, Insertar Variable.

Área de texto (Textarea grande): Contenido del mensaje con variables resaltadas como {{nombre_cliente}} o {{monto_deuda}}.

Botones inferiores: "PREVISUALIZAR" y "GUARDAR".

5. Vista E: Pestaña "Variables" / "Backups" (Tablas de Datos)
Pestaña Superior: Tab activa "Variables" (o "Backups") con botón "x".

Toolbar Superior: Botones cuadrados de acción: [+], [Guardar], [Lápiz], [Papelera]. A la derecha: Buscador.

Tabla de Datos (Ejemplo Variables):

Cabeceras: Checkbox, Nombre, Código, Valor, Descripción, Acciones.

Fila de ejemplo: "Tasa de Interés Mensual", interes_mora, "3.5", "Porcentaje de recargo por pago fuera de término".

Tabla de Datos (Ejemplo Backups):

Cabeceras: Checkbox, Fecha, Nombre de Archivo, Tamaño, Tipo, Creado por, Acciones (Iconos de Descarga y Restaurar).

Fila de ejemplo: "18/03/2026 02:00:00", backup_db_18032026.sql, "145 MB", "Automático", "Sistema", (Iconos azules de acción).

Footer: Paginación estándar (Mostrar 10 registros, Registros del 1 al X).

Notas de Diseño para Figma:
Jerarquía: En la sección "General" y "Corte y Bloqueo", asegúrate de agrupar visualmente los campos relacionados (usando gap y bordes sutiles en los contenedores).

Consistencia: Los toggles (interruptores) deben mantener el mismo tamaño y color activo (azul corporativo) en toda la sección.

Variables: Para la vista de Plantillas, destaca visualmente los "tags" o variables (ej. {{cliente_id}}) usando un fondo gris con texto monoespaciado para indicar que son campos dinámicos.