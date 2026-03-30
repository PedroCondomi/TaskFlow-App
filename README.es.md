# TaskFlow

Lee esto en otros idiomas:

🇪n English: [README.md](README.md)

TaskFlow es una aplicación fullstack de gestión de tareas diseñada para equipos e individuos.
Permite a los usuarios gestionar tareas personales, colaborar en equipos y controlar permisos basados en roles.

---

## Funcionalidades

### Autenticación

- Sistema de login basado en JWT
- Acceso basado en roles (admin / usuario)

### Tareas

- Crear, editar y eliminar tareas
- Tareas personales vs. tareas de equipo
- Gestión de estado (Pendiente, En Progreso, Completada)
- Niveles de prioridad (Baja, Media, Alta)
- Fechas límite

### Equipos

- Crear y gestionar equipos
- Asignar tareas a equipos y miembros
- Agregar / eliminar miembros
- Promover / degradar administradores

### Usuarios (solo Admin)

- Ver todos los usuarios
- Eliminar usuarios

### Sistema de Permisos

- Los usuarios solo pueden gestionar sus propias tareas personales
- Solo los administradores pueden gestionar tareas de equipo
- Los usuarios pueden actualizar el estado **solo si están asignados**

### Internacionalización

- Selector de idioma Inglés / Español
- Persistencia de idioma seleccionado

---

## Tecnologías Usadas

### Frontend

- React
- TypeScript
- Tailwind CSS
- Zustand (gestión de estado)
- React Query (estado del servidor)

### Backend

- Node.js
- Express
- Bcrypt
- MongoDB (Mongoose)
- Autenticación con JWT

---

## Estructura del Proyecto

```bash
client/
  src/
    api/
    components/
    hooks/
    pages/
    services/
    store/
    types/

server/
  src/
    controllers/
    middleware/
    models/
    routes/
    types/
    utils/
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/PedroCondomi/TaskFlow-App.git
cd taskflow
```

### 2. Configurar backend

```bash
cd server
npm install
```

Crear un archivo `.env`:

```bash
PORT=your_port
MONGO_USERNAME=your_mongodb_username
MONGO_PASS=your_mongodb_password
JWT_SECRET=your_secret
ADMIN_SECRET=your_admin_secret
```

Ejecutar:

```bash
npm run dev
```

### 3. Configurar frontend

```bash
cd client
npm install
```

Crear un archivo `.env`:

```bash
VITE_API_BASE=your_route
```

Ejecutar:

```bash
npm run dev
```
---

## Resumen de Permisos

| Acción            | Admin | Usuario             |
| ----------------- | ----- | ---------------- |
| Crear tareas equipo | ✅    | ❌               |
| Eliminar tareas | ✅    | ❌               |
| Gestionar miembros    | ✅    | ❌               |
| Tareas personales    | ✅    | ✅ (solo propias)    |
| Cambiar estado     | ✅    | ✅ (asignado) |

---

## Detalles de UI

- Dashboard limpio
- Diseño basado en tarjetas
- Interacciones hover sutiles
- Estados deshabilitados para acciones restringidas
- Patrones de UX consistentes

---

## Mejoras Futuras

- Search & filtering
- Notifications
- Drag & drop tasks (kanban)
- Dark mode
- More languages (i18n scalable)


---

## Capturas de Pantalla

### Interfaz de Login/Registro
<img width="1132" height="865" alt="Sin título" src="https://github.com/user-attachments/assets/88a89eea-f14c-46e5-a4d3-8f2531bfd503" />

### Diseño del Dashboard
<img width="1919" height="865" alt="Sin título2" src="https://github.com/user-attachments/assets/124196fc-18c4-4d0f-86f4-cad60c2bdd46" />

### Creación / Edición de tareas
<img width="699" height="748" alt="Sin título3" src="https://github.com/user-attachments/assets/37100432-fd70-46d7-ad60-eca468db3cdb" />

### Gestión de equipos
<img width="1916" height="859" alt="Sin título4" src="https://github.com/user-attachments/assets/2e34c4e6-a820-49c1-8bd1-704ae4048699" />

---

## ¿Por qué este proyecto?

Este proyecto demuestra:

- Arquitectura fullstack
- Gestión de estado limpia
- Permisos basados en roles
- Patrones de UI escalables
- Enfoque en producto real

---

## Autor

### Pedro Condomí

- GitHub: https://github.com/PedroCondomi

---

### Apoyo al Proyecto

Si este proyecto resulta de interés, se agradece considerarlo con una estrella ⭐ en el repositorio y no dudes en establecer contacto.
