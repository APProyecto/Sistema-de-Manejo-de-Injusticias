# M2 Boycotts - Admin Routes (Persona 4)

Este archivo documenta las rutas de administracion para M2 y ejemplos basicos de uso.
Prefijo base: /api/admin/boycotts

## 1. Listado admin de boycotts
GET /api/admin/boycotts

Query params:
- page (default 1)
- size (default 12)
- sort: created | relevance | activity
- includeDeleted: true | false (default true)
- q: texto libre
- stateId, state
- creatorId
- checkedBy
- countryId
- injusticeTypeId
- entityId

Ejemplo:
GET /api/admin/boycotts?page=1&size=10&sort=activity&state=Active

Respuesta (resumen):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "...",
      "caseNumber": null,
      "publicationDate": "...",
      "createdAt": "...",
      "lastUpdateDate": "...",
      "lastCheckDate": "...",
      "votesInFavor": 0,
      "votesAgainst": 0,
      "favorites": 0,
      "comments": 2,
      "reports": 0,
      "mongoDocumentId": null,
      "deletedByUser": false,
      "deletedAt": null,
      "createdBy": null,
      "modifiedBy": null,
      "checkedBy": null,
      "creatorId": 1,
      "state": { "id": 1, "name": "Active" },
      "country": { "id": 187, "name": "United States" },
      "injusticeType": { "id": 3, "name": "Environmental Damage" },
      "entity": {
        "id": 1,
        "name": "Nestle",
        "description": "...",
        "category": { "id": 1, "name": "Company" },
        "industryType": { "id": 2, "name": "Food" },
        "sector": { "id": 1, "name": "Private Sector" }
      }
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 1, "pages": 1 }
}

## 2. Detalle admin de boycott
GET /api/admin/boycotts/:id

Incluye datos administrativos y, si existe, el documento Mongo con descripcion y adjuntos.

Ejemplo:
GET /api/admin/boycotts/1

Respuesta (resumen):
{
  "success": true,
  "data": {
    "id": 1,
    "title": "...",
    "caseNumber": null,
    "publicationDate": "...",
    "createdAt": "...",
    "lastUpdateDate": "...",
    "lastCheckDate": "...",
    "votesInFavor": 0,
    "votesAgainst": 0,
    "favorites": 0,
    "comments": 2,
    "reports": 0,
    "mongoDocumentId": null,
    "deletedByUser": false,
    "deletedAt": null,
    "createdBy": null,
    "modifiedBy": null,
    "checkedBy": null,
    "creatorId": 1,
    "state": { "id": 1, "name": "Active" },
    "country": { "id": 187, "name": "United States" },
    "injusticeType": { "id": 3, "name": "Environmental Damage" },
    "entity": { "id": 1, "name": "Nestle", "description": "..." },
    "mongo": {
      "description": "...",
      "creatorUsername": "...",
      "entityDescription": "...",
      "filesNumber": 0,
      "evidence": [],
      "lastUpdateDate": "..."
    }
  }
}

## 3. Adjuntos admin de boycott
GET /api/admin/boycotts/:id/attachments

Ejemplo:
GET /api/admin/boycotts/1/attachments

Respuesta:
{
  "success": true,
  "data": [
    { "id": "mongoFileId", "name": "file.pdf", "type": "application/pdf", "size": 12345 }
  ]
}

## 4. Crear boycott como admin
POST /api/admin/boycotts
Body JSON:
{
  "title": "Titulo",
  "description": "Descripcion",
  "creatorId": 1,
  "creatorUsername": "admin",
  "entityId": 1,
  "countryId": 187,
  "injusticeTypeId": 3,
  "boycottStateId": 1,
  "caseNumber": 123
}

Respuesta:
{
  "success": true,
  "data": {
    "boycottId": 1,
    "mongoDocumentId": "..."
  }
}

## 5. Mis boycotts - admin
GET /api/admin/boycotts/my?adminId=1

Respuesta:
- Misma forma que listado admin, paginada.

## 6. Favoritos admin
- Listar favoritos:
GET /api/admin/boycotts/favorites?userId=1

- Agregar favorito:
POST /api/admin/boycotts/:id/favorites?userId=1

- Quitar favorito:
DELETE /api/admin/boycotts/:id/favorites?userId=1

## 7. Acciones administrativas futuras
PATCH /api/admin/boycotts/:id/state
Actualmente devuelve 501 (placeholder).

## 8. Pruebas y hallazgos (para informe final)
- Listado admin y detalle admin responden correctamente con datos extra.
- Adjuntos admin devuelve lista vacia si no hay evidencia.
- Creacion admin crea registro MySQL y documento Mongo base.
- Favoritos admin funcionan con userId/adminId en query.

Notas:
- No hay endpoint de edicion admin (definido por requerimiento).
- Las respuestas incluyen datos suficientes para tarjetas y detalle admin.
