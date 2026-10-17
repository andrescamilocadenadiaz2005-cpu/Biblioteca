# DESIGN.md - Biblioteca

## 1. Objetivo del diseño

Diseñar una interfaz elegante, sobria y sencilla, inspirada en una biblioteca clásica. La aplicación priorizará la legibilidad, la organización del catálogo y la facilidad de uso.

## 2. Identidad visual

### 2.1 Colores

- **Fondo principal:** negro (`#0B0B0B`).
- **Superficies y tarjetas:** negro oscuro (`#151515`).
- **Dorado principal:** `#D4AF37`.
- **Dorado suave:** `#B89B45`.
- **Texto principal:** blanco cálido (`#F5F1E8`).
- **Texto secundario:** gris claro (`#B8B8B8`).
- **Bordes:** dorado discreto (`#665523`).

El negro será el color predominante. El dorado se utilizará en títulos, bordes, botones y elementos interactivos, sin saturar la interfaz.

### 2.2 Tipografía

Se utilizará **Times New Roman** en toda la aplicación, incluidos títulos, textos, botones, formularios y mensajes de confirmación.

La tipografía mantendrá una apariencia clásica y formal, con tamaños y pesos diferenciados para establecer una jerarquía visual clara.

## 3. Estilo general

- Diseño oscuro, elegante y minimalista.
- Contraste suficiente entre textos, fondos y controles.
- Bordes finos y detalles dorados.
- Tarjetas rectangulares con espaciado uniforme.
- Botones claramente identificables.
- Sin animaciones, decoraciones ni elementos innecesarios.
- Interfaz adaptable a diferentes tamaños de pantalla.

## 4. Vista central: catálogo de libros

La página principal mostrará el título **Biblioteca** y un botón destacado con el texto **Agregar libro**.

Debajo se presentará el listado de libros mediante rectángulos horizontales. Cada rectángulo contendrá:

- La portada del libro.
- El título.
- El autor.

Las portadas mantendrán dimensiones uniformes y una proporción adecuada para imágenes de libros.

Cada rectángulo será seleccionable. Al seleccionar un libro, se mostrarán las acciones disponibles para ese registro.

Si no existen libros registrados, se mostrará un mensaje indicando que el catálogo está vacío y se facilitará el acceso a la acción de agregar un libro.

## 5. Acciones sobre los libros

Al seleccionar un libro, se mostrarán las siguientes opciones:

- **Editar libro:** abrir el formulario de edición.
- **Eliminar libro:** abrir la confirmación de eliminación.

Las acciones estarán asociadas al libro seleccionado y no afectarán a otros registros.

## 6. Formulario de agregar libro

Se abrirá al pulsar el botón **Agregar libro**.

Contendrá los siguientes campos:

- **Título:** campo de texto.
- **Autor:** campo de texto.
- **Portada:** selector de archivo de imagen.

Incluirá un botón para guardar el libro y otro para cancelar la operación.

El selector permitirá elegir una imagen desde el dispositivo. Cuando se seleccione una imagen, se podrá mostrar una vista previa de la portada.

## 7. Formulario de editar libro

Se abrirá al seleccionar la acción **Editar libro**.

Mostrará los datos actuales del libro y permitirá modificar:

- Título.
- Autor.
- Portada.

La portada actual permanecerá visible mientras no se seleccione una imagen de reemplazo.

Antes de aplicar los cambios, se mostrará el siguiente mensaje:

**¿Estás seguro de editar este libro?**

Se ofrecerán las opciones **Confirmar** y **Cancelar**.

- Confirmar aplicará los cambios.
- Cancelar descartará los cambios pendientes y devolverá al usuario a la vista anterior sin modificar el registro.

## 8. Confirmación de eliminación

Al seleccionar **Eliminar libro**, se mostrará un cuadro de confirmación con el siguiente mensaje:

**¿Estás seguro de eliminar {titulo del libro}?**

El título se sustituirá por el nombre real del libro seleccionado.

Se ofrecerán las opciones **Confirmar** y **Cancelar**.

- Confirmar eliminará el libro seleccionado.
- Cancelar conservará el libro y devolverá al usuario a la vista anterior.

La acción de eliminación deberá distinguirse visualmente de las acciones normales para reducir errores accidentales.

## 9. Componentes visuales

- **Botón principal:** fondo dorado, texto oscuro.
- **Botón secundario:** fondo oscuro, borde dorado y texto claro.
- **Acción de eliminación:** estilo de advertencia claramente identificable.
- **Tarjeta de libro:** fondo negro oscuro, borde discreto y contenido alineado horizontalmente.
- **Formularios:** campos oscuros, texto claro y bordes visibles.
- **Confirmaciones:** cuadros de diálogo con fondo oscuro, mensaje legible y botones claramente diferenciados.

## 10. Estados de la interfaz

La interfaz contemplará los siguientes estados:

- Catálogo con libros.
- Catálogo vacío.
- Formulario de registro.
- Formulario de edición.
- Confirmación de edición.
- Confirmación de eliminación.
- Operación en curso.
- Error al guardar, actualizar o eliminar un libro.

Los mensajes de error deberán ser claros y permitir comprender que la operación no se completó.

## 11. Criterios de aceptación visual

- Predominan el fondo negro y los detalles dorados.
- Toda la interfaz utiliza Times New Roman.
- Los libros aparecen en rectángulos horizontales con portada, título y autor.
- Existe un botón visible para agregar libros.
- Al seleccionar un libro se muestran las acciones de edición y eliminación.
- La edición y la eliminación solicitan confirmación antes de modificar los datos.
- Los formularios y diálogos respetan la identidad visual.
- La interfaz sigue siendo legible y utilizable en diferentes tamaños de pantalla.