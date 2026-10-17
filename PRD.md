# PRD.md - Biblioteca

## 1. Descripción del proyecto

Biblioteca es una aplicación web que permite visualizar y administrar un catálogo de libros mediante operaciones CRUD sobre una única tabla de libros.

## 2. Objetivo

Desarrollar una página web sencilla que permita consultar, agregar, editar y eliminar libros de la biblioteca.

## 3. Alcance

La aplicación tendrá una única vista central donde se mostrarán todos los libros registrados.

Cada libro tendrá los siguientes datos:

- **Título:** nombre del libro.
- **Autor:** nombre del autor.
- **Portada:** imagen seleccionada y subida por el usuario desde su dispositivo.

La aplicación permitirá realizar las siguientes operaciones:

- **Consultar:** visualizar los libros registrados y sus datos.
- **Agregar:** registrar un libro proporcionando su título, autor y una imagen de portada.
- **Editar:** modificar el título, el autor y la portada de un libro existente.
- **Eliminar:** eliminar un libro previa confirmación del usuario.

## 4. Requisitos funcionales

**RF-01. Visualización de libros**

Mostrar los libros registrados en la vista central, incluyendo su título, autor y portada.

**RF-02. Agregar libro**

Permitir registrar un libro proporcionando su título, autor y un archivo de imagen seleccionado desde el dispositivo del usuario.

**RF-03. Editar libro**

Permitir seleccionar un libro existente y modificar su título, autor y portada. El usuario podrá seleccionar una nueva imagen para reemplazar la portada actual.

**RF-04. Eliminar libro**

Permitir solicitar la eliminación de un libro mediante su acción correspondiente.

Antes de eliminarlo, se debe mostrar el siguiente mensaje, reemplazando `{titulo del libro}` por el título real:

`¿Estás seguro de eliminar {titulo del libro}?`

La eliminación solo se realizará si el usuario confirma. Si cancela, el libro deberá conservarse y devolverlo a la vista anterior

**RF-05. Actualización del catálogo**

Después de agregar, editar o eliminar un libro, la vista debe reflejar los cambios realizados.

## 5. Interfaz de usuario

La aplicación tendrá una única vista central que contendrá:

- El nombre de la aplicación: **Biblioteca**.
- El catálogo de libros registrados.
- Una acción para agregar libros.
- Una acción para editar cada libro.
- Una acción para eliminar cada libro.

Los formularios de registro y edición permitirán introducir el título y el autor, y seleccionar un archivo de imagen para la portada.

La presentación visual se definirá en `DESIGN.md`.

## 6. Restricciones

- El sistema administrará únicamente libros.
- La información se organizará en una sola tabla de libros.
- Los datos de cada libro serán título, autor y portada.
- Las portadas se proporcionarán mediante archivos de imagen seleccionados por el usuario, no mediante enlaces introducidos como texto.
- Las tecnologías y el mecanismo de almacenamiento se definirán en `ARCHITECTURE.md`.
- No se incluirán funcionalidades ajenas al CRUD solicitado.

## 7. Criterios de aceptación

- Se pueden visualizar los libros registrados con su título, autor y portada.
- Se puede agregar un libro seleccionando una imagen desde el dispositivo.
- Se pueden editar el título, el autor y la portada de un libro.
- Se solicita confirmación antes de eliminar un libro.
- Cancelar la confirmación conserva el libro.
- Confirmar la eliminación retira el libro del catálogo.
- Los cambios se reflejan correctamente en la vista central.

## 8. Fuera del alcance

No se contemplan usuarios, autenticación, préstamos, reservas, categorías, búsqueda avanzada ni otras funcionalidades que no sean necesarias para el CRUD solicitado.
