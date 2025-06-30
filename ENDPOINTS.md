# API Endpoints Documentation

Este documento lista los principales endpoints de la API disponibles en el backend, incluyendo los métodos HTTP, rutas completas con URL base y puerto, y una breve descripción de los datos esperados.

## Base URL

La API escucha en el puerto configurado en la variable de entorno `PORT`. Si no está configurado, usa el puerto 8080 por defecto.

Ejemplo de base URL local: `http://localhost:8080`

## Clients

| HTTP Method | URL                                      | Descripción                      | Cuerpo de la petición           | Respuesta                     |
|-------------|------------------------------------------|---------------------------------|--------------------------------|-------------------------------|
| GET         | http://localhost:8080/clients/            | Obtener todos los clientes       | Ninguno                        | Array JSON de objetos cliente |
| GET         | http://localhost:8080/clients/whoami      | Obtener info del cliente autenticado | Ninguno                    | Objeto JSON cliente           |
| POST        | http://localhost:8080/clients/signup      | Registro de cliente              | JSON con datos de registro     | Mensaje de éxito o error      |
| POST        | http://localhost:8080/clients/login       | Login de cliente                 | JSON con credenciales          | Token JWT o error             |
| PATCH       | http://localhost:8080/clients/{userId}    | Actualizar cliente por userId    | JSON con campos a actualizar   | Mensaje de éxito o error      |
| PATCH       | http://localhost:8080/clients/            | Actualizar datos propios         | JSON con campos a actualizar   | Mensaje de éxito o error      |
| DELETE      | http://localhost:8080/clients/            | Eliminar cuenta propia           | Ninguno                       | Mensaje de éxito o error      |

## Users

| HTTP Method | URL                                      | Descripción                      | Cuerpo de la petición           | Respuesta                     |
|-------------|------------------------------------------|---------------------------------|--------------------------------|-------------------------------|
| POST        | http://localhost:8080/users/first         | Crear primer usuario (admin)     | JSON con datos de usuario      | Mensaje de éxito o error      |
| POST        | http://localhost:8080/users/login         | Login de usuario                 | JSON con credenciales          | Token JWT o error             |
| POST        | http://localhost:8080/users/               | Registrar nuevo usuario          | JSON con datos de usuario      | Mensaje de éxito o error      |
| GET         | http://localhost:8080/users/whoami         | Obtener info del usuario autenticado | Ninguno                    | Objeto JSON usuario           |
| GET         | http://localhost:8080/users/               | Obtener todos los usuarios       | Ninguno                       | Array JSON de objetos usuario |
| PATCH       | http://localhost:8080/users/               | Actualizar datos propios         | JSON con campos a actualizar   | Mensaje de éxito o error      |
| PATCH       | http://localhost:8080/users/{userId}       | Actualizar usuario por ID        | JSON con campos a actualizar   | Mensaje de éxito o error      |
| DELETE      | http://localhost:8080/users/{userId}       | Eliminar usuario por ID          | Ninguno                       | Mensaje de éxito o error      |

## Branches

| HTTP Method | URL                                      | Descripción                      | Cuerpo de la petición           | Respuesta                     |
|-------------|------------------------------------------|---------------------------------|--------------------------------|-------------------------------|
| GET         | http://localhost:8080/branches/           | Obtener todas las sucursales     | Ninguno                       | Array JSON de objetos sucursal|
| GET         | http://localhost:8080/branches/{id}       | Obtener sucursal por ID          | Ninguno                       | Objeto JSON sucursal          |
| POST        | http://localhost:8080/branches/           | Crear sucursal                  | JSON con datos de sucursal     | Mensaje de éxito o error      |
| PATCH       | http://localhost:8080/branches/{id}       | Actualizar sucursal             | JSON con campos a actualizar   | Mensaje de éxito o error      |
| DELETE      | http://localhost:8080/branches/{id}       | Eliminar sucursal               | Ninguno                       | Mensaje de éxito o error      |

## Schedules

| HTTP Method | URL                                      | Descripción                      | Cuerpo de la petición           | Respuesta                     |
|-------------|------------------------------------------|---------------------------------|--------------------------------|-------------------------------|
| POST        | http://localhost:8080/schedules/          | Crear horario                   | JSON con datos de horario       | Mensaje de éxito o error      |
| DELETE      | http://localhost:8080/schedules/          | Eliminar horario                | JSON con identificador de horario | Mensaje de éxito o error    |
| GET         | http://localhost:8080/schedules/get/{branch} | Obtener horarios por sucursal | Ninguno                       | Array JSON de objetos horario |

## Appointments

| HTTP Method | URL                                      | Descripción                      | Cuerpo de la petición           | Respuesta                     |
|-------------|------------------------------------------|---------------------------------|--------------------------------|-------------------------------|
| GET         | http://localhost:8080/appointments/       | Obtener todas las citas          | Ninguno                       | Array JSON de objetos cita    |
| GET         | http://localhost:8080/appointments/{id}   | Obtener cita por ID              | Ninguno                       | Objeto JSON cita              |
| GET         | http://localhost:8080/appointments/get     | Obtener citas por fecha          | Parámetros de consulta para fecha | Array JSON de objetos cita  |
| POST        | http://localhost:8080/appointments/       | Crear cita                     | JSON con datos de cita          | Mensaje de éxito o error      |
| PATCH       | http://localhost:8080/appointments/status/{id} | Cambiar estado de cita       | JSON con datos de estado        | Mensaje de éxito o error      |
| PATCH       | http://localhost:8080/appointments/barber/{id} | Asignar barbero a cita       | JSON con ID de barbero          | Mensaje de éxito o error      |

## Services

| HTTP Method | URL                                      | Descripción                      | Cuerpo de la petición           | Respuesta                     |
|-------------|------------------------------------------|---------------------------------|--------------------------------|-------------------------------|
| GET         | http://localhost:8080/service/             | Obtener todos los servicios      | Ninguno                       | Array JSON de objetos servicio|
| GET         | http://localhost:8080/service/{id}         | Obtener servicio por ID          | Ninguno                       | Objeto JSON servicio          |
| POST        | http://localhost:8080/service/             | Crear nuevo servicio             | JSON con nombre, duración, precio | Mensaje de éxito o error    |
| PATCH       | http://localhost:8080/service/{id}         | Actualizar servicio existente    | JSON con campos a actualizar   | Mensaje de éxito o error      |
| DELETE      | http://localhost:8080/service/             | Eliminar servicio                | JSON con ID de servicio        | Mensaje de éxito o error      |

## Autenticación y Middleware

- La mayoría de los endpoints requieren autenticación vía JWT.
- El middleware maneja cabeceras y niveles de autorización.

---

