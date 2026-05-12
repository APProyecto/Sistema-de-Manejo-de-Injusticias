## 1. Visión General de la Arquitectura

El sistema se implementa como una **arquitectura de microservicios con API REST**, siguiendo el patrón *Database per Service*. Cada módulo backend posee su propia base de datos independiente y se comunica con los demás **exclusivamente a través de HTTP**.

La arquitectura sigue además el patrón **N-Capas** dentro de cada módulo:

| Capa | Descripción |
|------|-------------|
| **UI** (User Interface) | Presentación e interacción con el usuario. No contiene lógica de negocio. |
| **BL** (Business Layer) | Lógica de negocio, reglas, cálculos y decisiones. |
| **DA** (Data Access) | Abstracción de la comunicación con la base de datos. |
| **DB** (Database) | Almacenamiento persistente de datos. |

---

## 2. Tabla de Módulos

| Módulo | Nombre | Base de Datos | Tecnología |
|--------|--------|---------------|------------|
| **M1** | Usuarios y Seguridad | Por definir | Por definir |
| **M2** | Gestión de Boycotts | Por definir | Por definir |
| **M3** | Comentarios y Reportes | Por definir | Por definir |
| **M4** | Estadísticas y Consultas | Por definir | Por definir |
| **M5** | Frontend (Web + Móvil) | — | Por definir |

---

## 3. Descripción Detallada por Módulo

---

### Módulo 1 — Usuarios y Seguridad

**Base de datos:** Por definir  
**Responsabilidad:** Gestión de identidad, autenticación y autorización.

#### Funcionalidades
- Registro y login de usuarios.
- Encriptación de contraseñas con algoritmos reconocidos (SHA-256, bcrypt, AES, RSA).
- Encriptación de datos sensibles: nombre, apellido y correo.
- Gestión de roles:
  - Usuario sin cuenta (solo lectura pública)
  - Usuario registrado (puede votar, comentar, crear boycotts, añadir favoritos)
  - Administrador (modera contenido, aprueba reportes, responde sugerencias)
  - Administrador máster (acceso a consultas generales y bitácora)
- Validación y emisión de tokens JWT.
- Perfiles de usuario con foto, alias, país, género y estado de cuenta.
- Historial de actividad por usuario.

#### Datos del registro de usuario
| Campo | Detalle |
|-------|---------|
| Primer nombre | Encriptado en BD |
| Primer apellido | Encriptado en BD |
| Nombre de usuario (alias) | Público |
| Género | Masculino / Femenino / Otro |
| Foto de perfil | Archivo de imagen |
| Correo electrónico | Encriptado en BD |
| País de residencia | Catálogo parametrizable |
| Contraseña | Encriptada con hash |
| Fecha de registro | Automático |
| Estado de cuenta | Activa / Suspendida / Eliminada |
| Permisos | Master / Admin / Estándar

#### Endpoint clave expuesto
```
POST /api/validar-token
→ Recibe JWT, retorna datos del usuario autenticado.
   Usado por M2, M3 y M4.
```

---

### Módulo 2 — Gestión de Boycotts

**Base de datos:** Por definir
**Responsabilidad:** CRUD completo de boycotts, votos y favoritos.

#### Funcionalidades
- Creación de boycotts en dos partes:
  1. **Adición de empresa/individuo/organización:** nombre, categoría, logotipo, industria/sector.
  2. **Descripción del boycott:** tipo de injusticia, país, descripción, imágenes/videos/documentos.
- Validación de duplicados al crear una entidad.
- Estados del formulario: `activo`, `eliminado`, `en revisión`, `editado`.
- Sistema de votos: apoyar u oponerse a un boycott (contador público).
- Gestión de boycotts favoritos por usuario.
- Subida y almacenamiento de archivos:
  - Hasta 10 imágenes y 1 video.
  - Hasta 5 documentos de prueba.
- Edición y eliminación de boycotts por su autor.
- Aprobación/rechazo de reportes por administrador.
- Envío de correo al autor al cambiar el estado del boycott.

#### Campos del formulario de boycott
| Campo | Detalle |
|-------|---------|
| Nombre entidad | Empresa / Organización / Persona |
| Categoría | Empresa, producto, organización, persona |
| Logotipo / fotografía | Imagen |
| Industria / sector | Catálogo parametrizable |
| Estado | Activo / Eliminado / En revisión / Editado |
| Usuario creador | Referencia a M1 |
| Imágenes o videos | Hasta 10 imgs + 1 video |
| Documentos | Hasta 5 archivos |
| Número expediente judicial | Opcional |
| País | Catálogo parametrizable |
| Tipo de injusticia | Guerra, abuso, etc. (catálogo parametrizable) |
| Descripción | Texto libre |
| Fecha de creación | Automático |
| Fecha de actualización | Automático |

#### Comunicación con otros módulos
- **→ M1:** valida token JWT antes de operaciones autenticadas.

---

### Módulo 3 — Comentarios y Reportes

**Base de datos:** Por definir
**Responsabilidad:** Comentarios en boycotts, reportes de contenido y buzón de sugerencias.

#### Funcionalidades
- Comentarios en boycotts (solo usuarios registrados).
- Sistema de votos en comentarios (apoyar u oponerse).
- Ordenamiento de comentarios por relevancia (votos).
- Eliminación de comentarios por su autor o por administrador.
- Reporte de comentarios con razón y descripción:
  - Noticias falsas
  - Discurso de odio
  - Contenido inapropiado
- Reporte de boycotts con las mismas razones.
- Panel de administrador para revisar y responder reportes.
- **Buzón de sugerencias:** formulario con asunto y descripción; el administrador responde por correo.
- **Jobs automáticos:**
  - Alerta al panel de administración cuando un boycott acumula 30 o más reportes (umbral parametrizable).
  - Notificación automática al administrador ante nuevas sugerencias.
  - Job semanal: boletín con el Top 10 de organizaciones con mayor incremento de reportes y temas en tendencia.

#### Comunicación con otros módulos

- **→ M1:** valida token JWT antes de operaciones en comentarios.
- **→ M2:** consulta datos del boycott al que pertenece un comentario.

---

### Módulo 4 — Estadísticas y Consultas

**Base de datos:** Por definir
**Responsabilidad:** Consultas avanzadas, estadísticas con gráficos y auditoría.

#### Consultas para administradores
| ID | Consulta |
|----|----------|
| C1 | Listado de publicaciones para auditoría: autor, entidad, tipo de injusticia, evidencias. Filtros: categoría, fechas, región. Ordenable por votos. |
| C2 | Publicaciones en contra de una entidad específica: título, fecha, autor, estado. Filtros: nombre, fechas, estado. |
| C3 | Historial de actividad por usuario: publicaciones, comentarios, favoritos. Filtro: correo o alias. |
| C4 | Injusticias más seguidas: entidad, injusticia y lista de correos que la marcaron favorita. Filtros: nombre injusticia / entidad. |

> Todas las consultas deben mostrar el **total de registros** consultados.

#### Consultas exclusivas para Administrador Máster
| ID | Consulta |
|----|----------|
| G1 | Total de injusticias con boycotts asociados, última fecha de revisión y votos. Filtros: región o industria. |
| G2 | Lista de reportes de boycotts pendientes, ordenada por cantidad de reportes. |
| G3 | Bitácora de cambios en la aplicación. |
| G4 | Lista de usuarios con cantidad de publicaciones realizadas. |
| G5 | Publicaciones reportadas: cuáles y cuántas, con fecha de reporte. |

#### Estadísticas (con datos numéricos, porcentajes y gráficos)
- Distribución de usuarios por país/región.
- Industrias con más boycotts registrados.
- Top N de industrias con más boycotts por región.
- Total de favoritos por país.
- Campañas favoritas por género del usuario.
- Top N de entidades con más boycotts.
- Estadísticas de moderación: reportes aprobados / rechazados / pendientes y tiempo promedio de resolución.
- Top N de razones de rechazo de reportes.
- Boycotts por categoría de injusticia con porcentaje sobre el total.
- Distribución geográfica de boycotts por país o región afectada.
- Top N de usuarios con más boycotts publicados.
- Top N de boycotts con mejor y peor valoración.

#### Comunicación con otros módulos
- **→ M1, M2, M3:** recolecta datos para generar estadísticas y reportes.

---

### Módulo 5 — Frontend Web y Móvil

**Tecnología:** React (web) + React Native (móvil)  
**Responsabilidad:** Interfaz gráfica; consume las APIs de M1–M4.

#### Pantallas del sistema
| Pantalla | Acceso | Descripción |
|----------|--------|-------------|
| **Principal** | Público | Lista de boycotts activos con filtros y buscador. |
| **Crear Boycott** | Registrado | Formulario de creación de boycott en dos partes. |
| **Boycotts Favoritos** | Registrado | Lista de boycotts guardados como favoritos. |
| **Estadísticas** | Registrado / Admin | Consultas y gráficos según permisos. |
| **Sobre Nosotros** | Público | Motivación y descripción del proyecto. |
| **Perfil** | Registrado | Info del usuario, favoritos, votos y boycotts creados. |

#### Filtros de la pantalla principal
- Industria o sector
- País
- Tipo de injusticia
- Tipo de entidad (empresa, organización, persona)
- Orden alfabético
- Más votos positivos / negativos

#### Requisitos de interfaz
- Idioma: **inglés**.
- Diseño **responsive** (web y móvil).
- Logo original creado por el equipo.
- Manejo de autenticación con JWT.
- Ningún dato en duro en el código (parametrizable).

---

## 4. Principios Arquitectónicos

| Principio | Implementación |
|-----------|---------------|
| **Independencia** | Cada módulo tiene su propia base de datos. |
| **Comunicación** | Solo por HTTP REST — no se comparten bases de datos. |
| **Autenticación** | JWT emitido y validado por el Módulo 1. |
| **Parametrización** | Sin datos en duro; todos los parámetros gestionables desde la aplicación. |
| **Despliegue** | Cada módulo corre en un puerto independiente. |
| **Versionado** | Se utiliza Github para hacer un repositorio con los diferentes módulos |

---

## 5. Tecnologías por Capa

| Capa | Tecnología |
|------|-----------|
| Backend (todos los módulos) | Node.js + Express |
| Autenticación | JWT + bcrypt |
| Base de datos M1 y M2 | Por definir |
| Base de datos M3 | Por definir |
| Base de datos M4 | Por definir |
| Frontend Web | Por definir |
| Frontend Móvil | Por definir |
| Cliente HTTP (inter-módulos) | Fetch API / Axios |
| Encriptación | bcrypt, SHA-256, AES o RSA (o librería pública) |

---

## 6. Estructura de Repositorios

```
GitHub / GitLab Organization: ethical-consumer-platform
│
├── backend-module-1-usuarios/
├── backend-module-2-boycotts/
├── backend-module-3-comentarios/
├── backend-module-4-estadisticas/
├── frontend-module-5-web/
├── mobile-module-5-app/          ← opcional
└── documentation/
```

---

## 7. Seguridad

- Contraseñas encriptadas en base de datos (nunca en texto plano).
- Nombre, apellido y correo encriptados en BD para protección ante robo de datos.
- Sistema de roles implementado con **Access Manager**:
  - Sin cuenta → solo lectura pública.
  - Usuario registrado → interacción completa.
  - Administrador → moderación y gestión.
  - Administrador máster → consultas generales y bitácora.
- Todos los endpoints protegidos validan JWT contra el Módulo 1.

---

## 8. Ejemplo de Comunicación Inter-módulos

```javascript
// Módulo 2 valida el token JWT con Módulo 1 antes de operar
const usuario = await fetch('http://localhost:3001/api/validar-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
}).then(r => r.json());
```

