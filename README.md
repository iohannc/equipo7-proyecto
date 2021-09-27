# Equipo 7 - Fase 2 - Backend Fundamentals - BEDU Santander

## Integrantes:
- Estefanía Aguilar Arroyo
- Hugo Joshua Gasperin Castelan
- Juan Negrete Castañeda
- Fabiola Rasgado Celaya
- Angel Esteban Torres Trejo

## Especificaciones del Proyecto
###  Objetivo
Crear API de conexión a una base de datos de historias de terror.
### Descripcion
Se desarrolla una API sustentada en ExpressJS con el objetivo de registrar y dar a conocer historias de terror de diferentes temáticas en un sistema versatil para cualquier usuario.
Se espera el desarrollo de un sistema eficiente que pueda ser la base de una comunidad activa dentro del terror literario.

### Links de Heroku y Swagger
- https://proyecto-equipo7.herokuapp.com/v1/
- https://app.swaggerhub.com/apis-docs/frasgado/Historias-de-Terror/1.0

### Entidades
- Usuarios

Seran las personas que desen crear o buscar historias de terror en el sistema

- Administradores

Seran los encargados de depurar el contenido sin que esto los excluya de las capacidades del usuario.

- Historias

Los objetos principales que se estarán manejando a través de la API y resguardados en la DB de Mongo, susceptibles a las operaciones CRUD definidas.

![](https://raw.githubusercontent.com/frasgado/assets/main/modelo_horrorstories.jpg)


### User Stories
![](https://github.com/frasgado/assets/blob/main/Team7-TheUserStories.jpg?raw=true)


### Use Case Diagram
![](https://raw.githubusercontent.com/frasgado/assets/main/CU-01.jpg)

### Tecnologias usadas
El proyecto a realizar esta sustentado en diferentes tecnologias para tener un desempeño optimo:
- Usamos ExpressJS como base de la arquitectura del backend.
- Empleamos MongoDB como el admnistrador de bases de datos del proyecto.
- Node es el entorno de ejecución dentro de nuestro servidor

### Instrucciones de inicialización
1. Ubicarse en la carpeta raíz del proyecto
2. Ejecutar "npm install", para instalar las dependencias requeridas por el proyecto.
3. Correr en la linea de comandos "npm run start"
3. Disfrutar 😎
