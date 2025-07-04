# ⚽ Campeonato de Fulbito

Sistema de gestión de campeonatos de fulbito, desarrollado con Django REST Framework y React (Vite).

## 🚀 Funcionalidades principales:

- Gestión de Torneos, Etapas, Grupos, Equipos y Jugadores.
- Registro y edición de Partidos, Eventos y Tabla de posiciones.
- CRUD completo con frontend y backend conectados.
- Diseño web simple y funcional.

## 🛠️ Tecnologías:

- Backend: Django + Django REST Framework
- Frontend: React + Vite + React Hook Form + Axios
- Base de Datos: SQLite (modo desarrollo)

## 📂 Estructura del proyecto:

backend/ # Django Backend API
frontend/ # React Frontend (Vite)


## ⚙️ Instalación:

### Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend
npm install
npm run dev


