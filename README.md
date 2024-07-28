<!-- markdownlint-disable MD033 -->
# <div align="center">⚡ Mango Loco 🥭

<img src="docs/mango.png" alt="mango" style="width:100%;max-width:1080px;">

## Plantilla de Servidor en TypeScript con Decoradores

Utilizando routing-controllers, TypeORM y TypeDI

![Build Status](https://travis-ci.com/MrARC/Mango.svg?token=dsjyRm5j3xVPphZTyCrG&branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Thanks [@Typestack](<https://github.com/typestack>)!!!
: Class-Validator, Class-Transformer, Routing-Controllers, TypeDI.
</div>

## 📚 Índice

- [⚡ Mango Loco 🥭](#-mango-loco-)
  - [Plantilla de Servidor en TypeScript con Decoradores](#plantilla-de-servidor-en-typescript-con-decoradores)
  - [📚 Índice](#-índice)
  - [🥭 Sobre Mango](#-sobre-mango)
  - [⚡ Características](#-características)
  - [🚀 Cómo Usar](#-cómo-usar)
    - [Prerrequisitos](#prerrequisitos)
    - [Instalación](#instalación)
  - [📂 Estructura del Proyecto](#-estructura-del-proyecto)
  - [💻 Guía de Desarrollo](#-guía-de-desarrollo)
    - [Creando una Respuesta API](#creando-una-respuesta-api)
    - [Añadiendo un Nuevo Módulo](#añadiendo-un-nuevo-módulo)
    - [Protección de Rutas](#protección-de-rutas)
  - [📝 Changelog](#-changelog)
  - [📋 Tareas Pendientes](#-tareas-pendientes)
  - [🙏 Créditos](#-créditos)

## 🥭 Sobre Mango

⚡ **Mango Loco** es una plantilla de servidor TypeScript, basada en [Mango](https://github.com/ojoanalogo/Mango) (archivado en 2020). Su diseño tiene como objetivo simplificar y acelerar el desarrollo de aplicaciones backend robustas. Esta versión ofrece una manera sencilla de construir aplicaciones de servidor en Node.js,
> "Si buscabas una plantilla de servidor con características útiles, Mango es para ti 🤗" - [@ojoanalogo](https://github.com/ojoanalogo)

## ⚡ Características

- **TypeScript**: Desarrolla con un lenguaje tipado que compila a JavaScript limpio y eficiente.
- **Express Framework**: Utiliza uno de los frameworks web más populares y robustos para Node.js.
- **TypeORM**: ORM potente y flexible para TypeScript y JavaScript.
- **TypeDI**: Sistema de inyección de dependencias para TypeScript y JavaScript.
- **Routing-Controllers**: Define tus rutas utilizando decoradores, simplificando la estructura de tu API.
- **Autenticación JWT**: Implementación de flujo de tokens de acceso y actualización.
- **Protección de Recursos**: Sistema de autorización basado en roles.
- **Logging**: Registro detallado utilizando Winston.
- **Gestión de Archivos**: Subida de imágenes de perfil con Multer.
- **Configuración Flexible**: Usa variables de entorno con dotenv.
- **Listo para Producción**: Configurado para desplegarse con PM2.

## 🚀 Cómo Usar

### Prerrequisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/) (o cualquier base de datos compatible con TypeORM)

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/undefined/MangoLoco
   cd MangoLoco/server
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   ```bash
   cp .example.env .env
   ```

   Edita el archivo `.env` con tus configuraciones.

4. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

## 📂 Estructura del Proyecto

```markdown
mangoloco/server
└── 📁src: Directorio raíz del código fuente
    └── .example.env: Archivo de ejemplo con variables de entorno para configuración
    └── 📁api: Contiene código relacionado con la API
        └── 📁controllers: Maneja las solicitudes entrantes y devuelve respuestas
            └── user.controller.ts: Controlador para operaciones relacionadas con usuarios
        └── 📁dtos: Objetos de Transferencia de Datos para estructurar la información
            └── 📁usuario: DTOs específicos para operaciones de usuario
                └── create-user.dto.ts: DTO para crear un nuevo usuario
                └── search-user.dto.ts: DTO para buscar usuarios
                └── update-user.dto.ts: DTO para actualizar información de usuario
                └── usuario.dto.ts: DTO general de usuario
        └── 📁models: Define los modelos de datos
            └── user.entity.ts: Definición de la entidad Usuario
        └── 📁repositories: Maneja operaciones de base de datos
            └── user.repository.ts: Repositorio para operaciones de base de datos relacionadas con usuarios
        └── 📁services: Contiene la lógica de negocio
            └── user.service.ts: Servicio para operaciones relacionadas con usuarios
    └── 📁common: Utilidades compartidas y funcionalidad común
        └── 📁env: Código relacionado con el entorno
            └── env-schema.ts: Esquema para variables de entorno
            └── environment.ts: Configuración del entorno
        └── 📁interfaces: Interfaces comunes
            └── env-interface.ts: Interfaz para variables de entorno
        └── 📁models: Modelos base
            └── base-dto.ts: Objeto de Transferencia de Datos base
            └── base-entity.ts: Modelo de entidad base
        └── 📁pagination: Código relacionado con la paginación
            └── 📁dtos: DTOs para paginación
                └── base-search.dto.ts: DTO base para operaciones de búsqueda
                └── order-by.dto.ts: DTO para ordenar resultados
                └── page-metadata.dto.ts: DTO para metadatos de página
                └── paginated.dto.ts: DTO para resultados paginados
                └── response.dto.ts: DTO para respuestas de API
            └── 📁interceptors: Interceptores para paginación
                └── pagination-interceptor.ts: Interceptor para manejar paginación
            └── 📁mappers: Mapeadores para paginación
                └── pagination.mapper.ts: Mapeador para datos de paginación
        └── 📁types: Definiciones de tipos personalizados
            └── deep_partial.type.ts: Definición de tipo parcial profundo
    └── 📁config: Archivos de configuración
        └── 📁database: Configuración de base de datos
            └── data-source.ts: Configuración de fuente de datos
        └── 📁logger: Configuración de registro
            └── logger.ts: Configuración del logger
        └── 📁swagger: Configuración de documentación Swagger
            └── setup-swagger.ts: Configuración de Swagger
    └── main.ts: Punto de entrada principal de la aplicación
    └── 📁middlewares: Funciones de middleware
        └── errors-middleware.ts: Middleware para manejo de errores
        └── exception-middleware.ts: Middleware para manejo de excepciones
        └── logger-middleware.ts: Middleware para registro de logs
```

## 💻 Guía de Desarrollo

### Creando una Respuesta API

Utiliza la clase `ApiResponse` para estandarizar las respuestas de tu API:

```typescript
import { ApiResponse } from 'handlers/api_response.handler';
import { HTTP_STATUS_CODE } from 'utils/http.utils';

const response = new ApiResponse(response)
  .withData({ msg: 'hello' })
  .withStatusCode(HTTP_STATUS_CODE.OK)
  .build();
```

### Añadiendo un Nuevo Módulo

Usa [plop](https://github.com/amwmedia/plop) para generar nuevos módulos fácilmente:

```bash
npm run add:module
```

Sigue las instrucciones en la consola para crear controladores, servicios y repositorios.

### Protección de Rutas

Utiliza el decorador `@Authorized` para proteger tus rutas:

```typescript
import { Authorized, Post, Body, Res } from 'routing-controllers';
import { Response } from 'express';
import { RoleType } from 'utils/role.utils';

class ExampleController {
  @Post()
  @Authorized(RoleType.USER)
  async exampleRoute(@Res() response: Response, @Body() body: any): Promise<Response> {
    // Tu lógica aquí
  }
}
```

## 📝 Changelog

- **v0.0.1** (Fecha actual):
  - Actualización a las últimas versiones de todas las dependencias
  - Mejora significativa en la estructura del proyecto y documentación
  - Implementación de nuevas características de TypeScript 5.x
  - Optimización del flujo de autenticación JWT
  - Validación de datos de entrada con class-validator
  - Adición de una estrategia de paginado robusta para mejorar las respuestas del servidor
  - Configuración y optimización de contenedores para asegurar el correcto funcionamiento de:
    - Inyección de dependencias con TypeDI
    - Integración de TypeORM para la gestión de base de datos
    - Configuración de Express para el manejo de metadata y repositorios de entidades de TypeORM
  - Resolución de problemas de conectividad entre los diferentes componentes del sistema
  - Implementación de un sistema de logging mejorado para facilitar el debug y monitoreo

## 📋 Tareas Pendientes

- [ ] Implementar configuración centralizada
- [ ] Añadir soporte para Docker
- [ ] Explorar integración con GraphQL
- [ ] Configurar un sistema de migraciones de base de datos
- [ ] Implementar un sistema de notificaciones en tiempo real (por ejemplo, con WebSockets)
- [ ] Implementar un sistema de manejo de errores más detallado

## 🙏 Créditos

- Basado en el proyecto original [Mango](https://github.com/ojoanalogo/Mango) por [@ojoanalogo](https://github.com/ojoanalogo)

---
"# mango-loco" 
