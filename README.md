# Learning Topics Platform

## ¿Qué es este proyecto?

**Learning Topics Platform** es una aplicación web para gestionar y organizar temas de aprendizaje con enlaces útiles. Permite a los usuarios crear temas educativos, agregar enlaces de recursos y votar por los más útiles, creando una plataforma colaborativa de conocimiento.

## ¿Para qué sirve?

- **Crear y gestionar temas de aprendizaje** (JavaScript, Python, etc.)
- **Agregar enlaces útiles** a cada tema (documentación, tutoriales, videos)
- **Sistema de votación** para destacar los mejores recursos
- **Editar temas y enlaces** existentes
- **Eliminar contenido** no relevante
- **Organización automática** por popularidad (votos)

## ¿Qué problema soluciona?

### Problemas que resuelve:

- **Dispersión de recursos**: Enlaces guardados en múltiples lugares
- **Falta de organización**: Recursos sin categorizar por temas
- **Sin validación comunitaria**: No hay forma de saber qué recursos son mejores
- **Pérdida de enlaces**: Bookmarks que se pierden o desorganizan
- **Falta de colaboración**: Cada persona busca recursos individualmente

### Beneficios:

- **Centralización**: Todos los recursos en un lugar
- **Organización por temas**: Estructura clara y navegable
- **Validación comunitaria**: Los mejores recursos suben por votos
- **Colaborativo**: Múltiples usuarios pueden contribuir
- **Persistente**: Base de datos que mantiene la información

## Estructura del Proyecto

```
📦 learning-topics-platform/
├── 📄 app.js                    # Servidor principal con configuración Express y EJS
├── 📄 package.json              # Dependencias y configuración del proyecto
├── 📁 config/
│   └── 📄 database.js           # Configuración SQLite + creación automática de tablas
├── 📁 controllers/
│   └── 📄 topicController.js    # Todas las rutas HTTP (GET/POST) con comentarios detallados
├── 📁 models/
│   └── 📄 LearningTopic.js      # Operaciones de base de datos (CRUD completo comentado)
├── 📁 views/                    # Plantillas EJS con conexiones a controlador comentadas
│   ├── 📄 index.ejs             # Página principal (lista temas + navegación)
│   ├── 📄 topicDetail.ejs       # Detalle tema + enlaces + acciones
│   ├── 📄 newTopic.ejs          # Formulario crear tema
│   ├── 📄 editTopic.ejs         # Formulario editar tema
│   ├── 📄 newLink.ejs           # Formulario crear enlace
│   └── 📄 editLink.ejs          # Formulario editar enlace
├── 📄 README.md                 # Documentación general del proyecto
├── 📄 GUIA_TECNICA.md          # Documentación técnica detallada
└── 📄 learning_plataform.db     # Base de datos SQLite (generada automáticamente)
```

## Tecnologías Utilizadas

### **Backend**

| Tecnología              | Versión | ¿Para qué sirve en el proyecto?                                    |
| ------------------------ | -------- | -------------------------------------------------------------------- |
| **Node.js**        | Latest   | Motor de JavaScript del servidor. Ejecuta todo el código backend    |
| **Express.js**     | ^4.21.2  | Framework web que maneja rutas, middleware y servidor HTTP           |
| **Better-SQLite3** | ^12.4.1  | Driver de base de datos SQLite. Operaciones síncronas y rápidas |

### **Frontend**

| Tecnología     | Versión | ¿Para qué sirve en el proyecto?                             |
| --------------- | -------- | ------------------------------------------------------------- |
| **EJS**   | ^3.1.10  | Motor de plantillas. Genera HTML dinámico con datos de la DB |
| **HTML5** | -        | Estructura de las páginas web                                |
| **CSS3**  | Inline   | Estilos básicos para formularios y layout                    |

### **Desarrollo**

| Tecnología       | Versión | ¿Para qué sirve en el proyecto?                                    |
| ----------------- | -------- | -------------------------------------------------------------------- |
| **Nodemon** | ^3.0.1   | Reinicia automáticamente el servidor al hacer cambios en desarrollo |

## Configuración para Ejecutar

### Prerequisitos

- **Node.js** v16 o superior
- **npm** (incluido con Node.js)
- Terminal/PowerShell

### Instalación

1. **Navegar al directorio del proyecto**
   ```powershell
   cd "ruta\del\proyecto"
   ```

2. **Inicializar proyecto Node.js**
   ```powershell
   npm init -y
   ```

3. **Instalar dependencias requeridas**
   ```powershell
   npm install express@^4.21.2 ejs@^3.1.10 better-sqlite3@^12.4.1
   npm install --save-dev nodemon@^3.0.1
   ```

4. **Configurar scripts en package.json**
   
   Agregar en la sección `"scripts"`:
   ```json
   "scripts": {
     "start": "node app.js",
     "dev": "nodemon app.js"
   }
   ```

### Dependencias del Proyecto

| Dependencia | Versión | Tipo | Propósito |
|-------------|---------|------|-----------|
| **express** | ^4.21.2 | production | Framework web del servidor |
| **ejs** | ^3.1.10 | production | Motor de plantillas para las vistas |
| **better-sqlite3** | ^12.4.1 | production | Driver de base de datos SQLite (síncrono y rápido) |
| **nodemon** | ^3.0.1 | development | Herramienta de desarrollo (reinicio automático) |

### Ejecución

**Modo Desarrollo:**
```powershell
npm run dev
```

**Modo Producción:**
```powershell
npm start
```

### Acceso a la Aplicación

Una vez iniciado el servidor:

- **URL**: `http://localhost:3000`
- **Puerto**: 3000 (configurable en `app.js`)

### Verificación de Funcionamiento

1. **Página principal**: Debe mostrar "Temas de Aprendizaje"
2. **Crear tema**: Enlace "Nuevo Tema" debe funcionar
3. **Base de datos**: Se crea automáticamente `learning_plataform.db`
4. **Navegación**: Todos los enlaces deben responder
