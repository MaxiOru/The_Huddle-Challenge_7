// Importamos Express para crear el servidor web
const express = require('express');
// Importamos Path para manejar rutas de archivos del sistema
const path = require('path');
// Importamos las rutas del controlador de temas
const topicRoutes = require('./controllers/topicController');

// Creamos la instancia de la aplicación Express
const app = express();
// Definimos el puerto donde correrá el servidor
const PORT = 3000;

// CONFIGURACIÓN DE EJS: Establecemos EJS como motor de plantillas para renderizar vistas HTML dinámicas
app.set('view engine', 'ejs');
// CONFIGURACIÓN DE DIRECTORIO DE VISTAS: Definimos la carpeta 'views' como ubicación de las plantillas EJS
// El primer 'views' es la clave de configuración de Express, el segundo es el nombre de la carpeta física
app.set('views', path.join(__dirname, 'views'));


// MIDDLEWARE: Configuramos Express para procesar datos de formularios HTML (application/x-www-form-urlencoded)
// extended: true permite procesar datos complejos con objetos y arrays
app.use(express.urlencoded({ extended: true }));

// RUTAS: Registramos todas las rutas del controlador de temas bajo la ruta raíz '/'
app.use('/', topicRoutes);

// INICIAR SERVIDOR: Ponemos el servidor a escuchar en el puerto definido y mostramos mensaje de confirmación
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});