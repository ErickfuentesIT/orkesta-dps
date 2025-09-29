# Guía de Usuario — ORKESTA-APP

Última actualización: 28-09-2025

Esta guía explica la funcionalidad, elementos clave, y cómo usar la aplicación frontend ORKESTA-APP. También describe su relación con el backend SGPT-BACKEND (API REST en Spring Boot) y proporciona ejemplos de uso y comandos para arrancar la aplicación en desarrollo y producción.

## 1. ¿Qué es ORKESTA-APP?

ORKESTA-APP es un cliente web construido con Next.js que consume la API REST del proyecto SGPT-BACKEND para gestionar usuarios, proyectos y tareas. Proporciona interfaces para registrarse, iniciar sesión, crear y listar proyectos, y gestionar tareas y asignaciones.

Principales objetivos:

- Facilitar la gestión de proyectos y tareas en una interfaz web moderna.
- Consumir los endpoints proporcionados por SGPT-BACKEND para persistencia y negocio.
- Ofrecer componentes reutilizables para listas, formularios y tableros de tareas.

## 2. Estructura del proyecto

Carpeta src/app (Next.js):

- globals.css, layout.js, page.js — configuración y estilos globales.
- app/(public)/ — rutas públicas (login, register).
- app/(protected)/ — rutas que suponen un usuario autenticado (dashboard, projects).
- app/components/ — componentes UI agrupados por funcionalidad:
  - common/ — NavBar, SideBar, FirstForm.
  - projects/ — AddProjectForm, ProjectCard, ProjectGrids, ProjectList.
  - tasks/ — AddTaskForm, TaskBoard, TaskList.
  - ui/ — Button, StaggerInput.

Carpeta src/services:

- projects.js, tasks.js, users.js, usersTasks.js — módulos que encapsulan llamadas HTTP a la API.
- useAuth.js, useProjects.js, useTasks.js — hooks personalizados para lógica de estado y consumo de servicios.

Otros archivos de interés:

- public/ — logos, assets y SVGs usados en la app.
- package.json — scripts y dependencias.

## 3. Elementos clave y su función

- Autenticación (UI): páginas login y register en app/(public) permiten crear cuentas e iniciar sesión. El frontend usa useAuth.js para almacenar el estado del usuario autenticado (posiblemente en contexto o localStorage).
- Navegación: NavBar y SideBar en app/components/common muestran navegación entre dashboard, proyectos y tareas.
- Gestión de proyectos: AddProjectForm y ProjectList/ProjectGrids permiten crear y visualizar proyectos; las llamadas a la API están en src/services/projects.js.
- Gestión de tareas: AddTaskForm, TaskBoard y TaskList permiten crear, listar y asignar tareas; la lógica está en src/services/tasks.js y src/services/usersTasks.js para asignaciones.
- Hooks: useProjects.js y useTasks.js implementan la lógica de carga, creación y sincronización entre UI y servicios.

## 4. Conexión con SGPT-BACKEND

ORKESTA-APP está pensado para comunicarse con el backend SGPT-BACKEND (Spring Boot). El backend expone endpoints REST para manejar usuarios, proyectos, tareas y relaciones entre ellos.

Puntos importantes de integración:

- Base URL: en el frontend hay un archivo de servicios (src/services/*.js) donde debe configurarse la URL base del backend (por ejemplo http://localhost:8080). Revisa estos archivos para ajustar la URL según tu entorno.
- Formatos: los DTOs que espera y devuelve SGPT-BACKEND usan objetos con propiedades anidadas (ej.: { "idUser": 1 } o { "idProjects": { "idProject": 1 } }). Asegúrate de enviar los cuerpos en esos formatos cuando crees recursos desde el frontend.
- Fechas: el backend usa LocalDateTime en formato ISO (2025-09-28T10:00:00). En los forms, serializa las fechas en ese formato.

La guía del backend (SGPT-BACKEND) incluye una descripción detallada de endpoints, modelos DTO y ejemplos de uso. Revisala para entender contratos exactos de cada endpoint. (Resumen incluido en este repositorio en docs/ si se desea.)

## 5. Endpoints relevantes (resumen)

Los endpoints consumidos por el frontend normalmente estarán entre:

- Users: /users (registro, login, obtener usuarios por proyecto, etc.)
- Projects: /projects (crear, listar, actualizar, obtener por usuario)
- Tasks: /tasks (crear, listar, actualizar, obtener por proyecto)
- Users-Tasks: /users-tasks (asignar usuarios a tareas)
- Users-Projects: /users-projects (asignar usuarios a proyectos)

Consulta la guía de SGPT-BACKEND incluida para ejemplos JSON y payloads recomendados.

## 6. Contrato mínimo (inputs/outputs)

- Inputs clave enviados desde la app:
  - Crear usuario: { "userName": "juanp", "email": "juanp@example.com", "password": "miPassword123", "userStatus": true }
  - Crear proyecto: { "idOwnerUser": { "idUser": 1 }, "project": "Proyecto A", "description": "Desc" }
  - Crear tarea: { "idProjects": { "idProject": 1 }, "name": "Tarea 1", "status": { "idStatus": 1 }, "description": "Desc" }
- Outputs típicos: el backend devuelve DTOs con propiedades como idUser, idProject, tasks, assigment, y detalles anidados.

## 7. Cómo correr la aplicación (desarrollo y producción)

Requisitos locales:

- Node.js (versión soportada por Next.js en package.json — preferible LTS).
- npm o pnpm (las instrucciones usan npm).
- SGPT-BACKEND corriendo y accesible (por defecto http://localhost:8080).

Scripts disponibles (ver package.json):

- npm run dev — arranca Next.js en modo desarrollo (hot reload) usando Turbopack.
- npm run build — construye la app para producción.
- npm run start — arranca la app en modo producción.
- npm run lint — ejecuta ESLint.

Comandos ejemplo (PowerShell):

powershell
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Empaquetar para producción
npm run build

# Ejecutar producción (después de build)
npm run start


Si tu backend está en otra URL, exporta o ajusta la variable/archivo de configuración en src/services/* antes de arrancar.

## 8. Ejemplos de requests desde PowerShell (curl) — integración con SGPT-BACKEND

Crear usuario (frontend → backend):

powershell
curl -X POST "http://localhost:8080/users" -H "Content-Type: application/json" -d '{"userName":"juanp","email":"juanp@example.com","password":"miPassword123","userStatus":true}'


Login:

powershell
curl -X POST "http://localhost:8080/users/login" -H "Content-Type: application/json" -d '{"email":"juanp@example.com","password":"miPassword123"}'


Crear proyecto (ejemplo):

powershell
curl -X POST "http://localhost:8080/projects" -H "Content-Type: application/json" -d '{"idOwnerUser":{"idUser":1},"project":"Proyecto A","description":"Desc","createdDate":"2025-09-28T10:00:00","projectStatus":true}'


Crear tarea (ejemplo):

powershell
curl -X POST "http://localhost:8080/tasks" -H "Content-Type: application/json" -d '{"idProjects":{"idProject":1},"name":"Tarea 1","status":{"idStatus":1},"description":"Desc tarea","plannedStartDate":"2025-09-29T09:00:00","plannedEndDate":"2025-10-01T18:00:00"}'


Asignar usuario a tarea:

powershell
curl -X POST "http://localhost:8080/users-tasks" -H "Content-Type: application/json" -d '{"idUser":{"idUser":2},"idTask":{"tasks":1}}'


## 9. Recomendaciones de seguridad y buenas prácticas

- No almacenar ni exponer contraseñas en claro desde el frontend o backend. El backend debe aplicar hashing (BCrypt) y no devolver la contraseña en responses.
- Usar HTTPS en producción y configurar CORS en SGPT-BACKEND para permitir sólo orígenes necesarios.
- Añadir autenticación basada en tokens (por ejemplo JWT) y proteger rutas protegidas en el frontend.
- Validar datos en frontend además del backend.

## 10. Troubleshooting (problemas comunes)

- Errores 4xx al crear recursos: revisa el formato JSON y campos obligatorios. SGPT-BACKEND usa DTOs con anotaciones de validación.
- Error CORS: asegúrate que la URL del frontend esté permitida en el backend o usa proxy en desarrollo.
- Backend no responde: asegúrate que SGPT-BACKEND está arriba en http://localhost:8080 o actualiza la base URL en src/services.

## 11. Anexos: referencias rápidas

- Script de arranque backend (PowerShell):

powershell
# Desde la carpeta SGPT-BACKEND
.\mvnw.cmd spring-boot:run


## 12. Colección Postman — DPS-SGPT (endpoints y su uso)

En Postman tienes una colección llamada DPS-SGPT con carpetas y requests agrupados. A continuación se listan los endpoints tal como aparecen en la colección y una breve explicación de cuándo usarlos desde la app o para pruebas manuales.

USERS

- POST Login — autentica un usuario (body: { "email": "...", "password": "..." }). Usar para obtener token o validar credenciales.
- POST AddUser — crea un nuevo usuario (body: UsersRQ). Usar en el registro desde la UI.
- GET GetAllUsers — lista todos los usuarios. Útil en pantallas de administración o asignación.

PROJECTS

- GET GetAllProjectsByUserID — obtiene todos los proyectos de un usuario (usa id del usuario). Usado para mostrar proyectos del usuario logueado.
- POST SaveProject — crea un proyecto (body: ProjectsRQ). Usar en AddProjectForm.
- PATCH UpdateProjectByID — actualiza proyecto por id (body: ProjectsRQ parcheado). Usar en edición de proyectos.
- GET GetProjectID(Edit) — obtiene un proyecto por id (para cargar formulario de edición).
- POST AsignUserToProject — asigna un usuario a un proyecto (body: UserProjectsRQ). Usar desde pantallas de administración/colaboradores.

Tasks

- POST SaveTask — crea una tarea (body: TasksRQ). Usar en AddTaskForm.
- GET GetTaskByID — obtiene detalles de una tarea por id.
- GET GetTaskByProjectID — lista tareas de un proyecto (útil para el TaskBoard/TaskList de un proyecto).
- PATCH UpdateTask — actualiza una tarea por id (body: TasksRQ parcheado).
- POST AssignUserToTask — asigna un usuario a una tarea (body: UserTasksRQ). Equivale a users-tasks del backend.
- GET GetUsersByProject — obtiene usuarios asociados a un proyecto (útil para seleccionar asignados a tareas).
- DEL DeleteTaskAssignToUser — elimina (o marca como eliminado) la asignación de tarea a usuario.

Notas prácticas:

- Los nombres de los requests en Postman coinciden con los controllers/servicios del backend. Úsalos como referencia rápida cuando implementes llamadas desde src/services/*.
- Para pruebas con la colección Postman, actualiza la variable de entorno baseUrl a http://localhost:8080 (o la URL donde corra SGPT-BACKEND).
- Donde la colección usa GET con parámetros (por ejemplo usuario o project id), asegúrate de pasar el id correcto en la ruta.

---