# ⚽ Campeonato de Fulbito - Sistema de Gestión

Proyecto integrador: Aplicación web para gestionar campeonatos de fulbito (fútbol 6), inspirada en Google Deportes.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Despliegue](#despliegue)
- [Endpoints principales](#endpoints-principales)
- [Vistas Frontend](#vistas-frontend)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## Descripción

Sistema web para la gestión integral de campeonatos de fulbito, permitiendo administración de torneos, equipos, jugadores, partidos, eventos y tabla de posiciones en tiempo real.

---

## Tecnologías

- **Backend:** Django, Django REST Framework, SimpleJWT, PostgreSQL
- **Frontend:** Vite, React, React Router, React Hook Form, Axios, SWR/React Query
- **Despliegue:** Render/Railway (backend), Vercel/Netlify (frontend)
- **CI/CD:** GitHub Actions

---

## Arquitectura

```
root/
│
├── backend/           # Django + DRF
│   ├── fulbito/       # App principal
│   └── ...
├── frontend/          # Vite + React
│   └── src/
│       └── components/
│           └── Navbar.jsx
│       └── ...
├── .github/workflows/ # CI/CD
└── README.md
```

---

## Instalación y Ejecución

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # En Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Despliegue

- **Backend:** [URL pública de Render/Railway](https://gestion-de-campeonato-futbol.onrender.com)
- **Frontend:** [URL pública de Vercel/Netlify](https://frontend-ejemplo.vercel.app)

---

## Endpoints principales

- `POST /api/token/` - Login JWT
- `GET /api/public/standings/<tournament_id>/` - Tabla de posiciones pública
- `GET /api/public/schedule/<stage_id>/` - Calendario y eventos de partidos
- CRUD completo para Torneos, Equipos, Jugadores, Partidos, etc. (requiere autenticación)

---

## Vistas Frontend

- **Dashboard:** Resumen general del campeonato
- **Equipos:** Listado y gestión de equipos
- **Jugadores:** Listado y gestión de jugadores
- **Calendario:** Partidos y eventos
- **Tabla de posiciones:** Actualizada en tiempo real

---

## Capturas de Pantalla

_Agrega aquí imágenes de las principales vistas y del DER_

---

## Contribución

1. Haz un fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

MIT

---

> Proyecto realizado para Práctica Profesional I - 2025