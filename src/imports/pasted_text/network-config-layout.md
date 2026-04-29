Contexto y Layout General
Estamos diseñando la sección de "Configuración de Red" del área central de la aplicación CRM/ERP.

Sidebar Izquierdo: El menú lateral debe tener el ítem "Configuración de red" seleccionado como activo (resaltado en fondo oscuro y borde azul).

Área Central Principal: Usaremos el sistema de pestañas (Tabs) en la parte superior del espacio de trabajo. Fondo general de la pantalla gris muy claro (#F8FAFC). El contenedor del formulario debe tener fondo blanco, borde sutil gris claro, padding de 24px y esquinas ligeramente redondeadas.

Título General: En la parte superior del contenedor blanco, un título oscuro: "CONFIGURACIÓN DE RED".

Sub-Navegación Interna (Tabs): Justo debajo del título, una barra de pestañas horizontales con los ítems: "API" (Activa), "SMART OLT", "DHCP RELAY", "TR-069", "BMU", "RUTAS BGP". La pestaña activa debe tener texto azul y línea inferior azul.

1. Vista A: Pestaña "API" (Servidor de Conexiones)
Basada en la imagen image_6dbd9a.png

Pestaña Activa: API.

Sección de Formulario:

Título de bloque: "Servidor de Conexiones API" (Texto pequeño, negrita, azul o gris oscuro).

Grid vertical (Auto layout):

Label: "Host" -> Input de texto (placeholder vacío o con una IP de ejemplo).

Label: "Token" -> Input de texto.

Footer de formulario: Alineado a la izquierda o derecha abajo: Botón "GUARDAR" (Azul sólido).

2. Vista B: Pestaña "SMART OLT"
Basada en la imagen image_6dbd9e.png

Pestaña Activa: SMART OLT.

Sección de Formulario:

Título de bloque: "SMART OLT".

Grid vertical:

Label: "Host" -> Input de texto.

Label: "Client ID" -> Input de texto.

Label: "Client Key" -> Input de texto.

Debajo de los inputs, un texto con icono de enlace (azul): "Haga clic aquí para obtener más información de la API de SmartOLT".

Footer: Botón "GUARDAR" (Azul sólido).

3. Vista C: Pestaña "DHCP RELAY"
Basada en la imagen image_6dbda2.png

Pestaña Activa: DHCP RELAY.

Bloque de Información (Alert Box):

Un recuadro en la parte superior con fondo azul muy claro (o amarillo claro de advertencia) y texto informativo: "Para implementar esto en tu red debes usar DHCP Relay en tus Nodos. Selecciona un Nodo para administrar sus opciones de DHCP."

Sección de Formulario:

Label: "Nodos" -> Dropdown select (con el valor "Ninguno" seleccionado por defecto).

Bloque secundario: "+ Opciones" (como un texto o botón sutil).

Inputs adicionales en lista: "Address pool", "Lease time", "Netmask", "Gateway", "Dns primario", "Dns secundario", "Dns terciario". (Todos los inputs con altura compacta, 36px).

Footer: Botón "GUARDAR".

4. Vista D: Pestañas "TR-069" y "BMU" (Integraciones con Toggle)
Basadas en las imágenes image_6dbdba.png y image_6dbdbe.png

(Instrucción para Figma: Ambas pestañas comparten exactamente la misma estructura visual, solo cambia el título).

Estructura Común:

Control Superior: Un Toggle Switch (Interruptor) a la izquierda con el texto "Integración TR-069" o "Habilitado" (para BMU). Debe mostrarse en estado Apagado (Gris).

Grid vertical (estos inputs pueden verse ligeramente opacos si el toggle está apagado):

Label: "URL GenieACS" (o "URL BMU") -> Input de texto.

Label: "Token GenieACS" (o "Token") -> Input de texto.

Enlace inferior azul: "Ver instrucciones de integración".

Footer: Botón "GUARDAR".

5. Vista E: Pestaña "RUTAS BGP"
Basada en la imagen image_6dbdf8.png

Pestaña Activa: RUTAS BGP.

Texto Informativo: Párrafo simple en gris oscuro: "Desde acá podrá inyectar rutas hacia sus Servidores BGP".

Sección de Formulario:

Toggle Switch: "Estado" (Apagado/Gris).

Inputs (Grid):

Label: "Network" -> Input de texto.

Label: "Server BGP" -> Dropdown.

Label: "Gateway" -> Input de texto.

Label: "Comentario" -> Input de texto ancho.

Footer: Botón "GUARDAR".

Notas de Diseño para Figma:
Simplicidad: A diferencia de las tablas masivas de otras secciones, estas pantallas son configuraciones directas de sistema. Mantén el ancho máximo de los inputs a unos 400px - 500px para que no se estiren innecesariamente por toda la pantalla, alineándolos a la izquierda.

Consistencia en Inputs: Utiliza el mismo componente base de "Input Field" y "Label" (12px gris oscuro para labels, borde gris claro y altura 36px para la caja de texto) que venimos usando en la pestaña de registro de clientes.