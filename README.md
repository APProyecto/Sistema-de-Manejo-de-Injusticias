# Repositorio AP_Proyecto
## Plataforma de Boycotts Éticos — Guía de Control de Versiones

---

## 1. Estructura del repositorio

```
AP_Proyecto/
│
├── m1-usuarios/
├── m2-boycotts/
├── m3-comentarios/
├── m4-estadisticas/
├── m5-frontend/
├── docs/
├── .gitignore
└── README.md
```

---

## 2. Branches principales

| Branch | Propósito |
|--------|-----------|
| `main` | Versión estable lista para la defensa. **Nadie hace push directo aquí.** |
| `develop` | Rama de integración. Todo el trabajo terminado llega aquí primero. |

La regla de oro: **nunca trabajar directamente en `main` ni en `develop`**. Todo cambio pasa por una branch propia antes de llegar a `develop`, y de `develop` a `main` solo cuando hay una versión estable lista.

---

## 3. Branches de trabajo

Antes de tocar cualquier código, crear una branch desde `develop`. El nombre debe empezar con el tipo de cambio seguido de una descripción corta:

```
feat/nombre-de-la-feature
fix/nombre-del-bug
style/que-se-cambio
refactor/que-se-cambio
docs/que-se-cambio
```

Ejemplos:

```
feat/login-usuarios
feat/sistema-de-votos
fix/orden-comentarios
style/pantalla-principal
docs/manual-de-usuario
```

No hay reglas estrictas en la descripción — solo que sea entendible para el resto del equipo.

---

## 4. Flujo de trabajo

```
main  ◄────────────────────────────────── develop (cuando hay versión estable)
                                              ▲
                                              │ Pull Request
                                    feat/login-usuarios
```

```bash
# 1. Actualizar develop antes de empezar
git checkout develop
git pull origin develop

# 2. Crear tu branch
git checkout -b feat/login-usuarios

# 3. Trabajar y commitear
git add .
git commit -m "agrega pantalla de login"

# 4. Subir la branch
git push origin feat/login-usuarios

# 5. Abrir un Pull Request hacia develop
# 6. Un compañero revisa y aprueba
# 7. Merge a develop — listo
```

---

## 5. Antes de la defensa

Cuando todo esté listo en `develop`, se hace un último Pull Request de `develop` → `main` y se le pone un tag:

```bash
git tag -a v1.0 -m "Versión final para defensa"
git push origin main --tags
```

---

## 6. .gitignore

```gitignore
# Dependencias
node_modules/
**/node_modules/

# Variables de entorno (NUNCA subir esto)
.env
.env.local
**/.env
**/.env.local

# Builds
dist/
build/

# Logs
*.log

# Sistema operativo
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```
