# ⚽ Campeonato de Fulbito

Sistema de gestión de campeonatos de fulbito, desarrollado con Django REST Framework y React (Vite).

## 🚀 Funcionalidades principales:

- Gestión de Torneos, Etapas, Grupos, Equipos y Jugadores.
- Registro y edición de Partidos, Eventos y Tabla de posiciones.
- CRUD completo con frontend y backend conectados.
- Diseño web simple y funcional.

## 🛠️ Tecnologías utilizadas:

- **Backend:** Django + Django REST Framework
- **Frontend:** React + Vite + React Hook Form + Axios
- **Base de Datos:** SQLite (modo desarrollo)

## 📂 Estructura del proyecto:

backend/ # Django Backend API
frontend/ # React Frontend (Vite)


## ⚙️ Instalación y ejecución:
### Backend (Django):
cd backend
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend (React + Vite):
cd frontend
npm install
npm run dev


✅ ¡Listo! Tu aplicación estará corriendo en:

Backend: http://localhost:8000

Frontend: http://localhost:5173 (o el puerto que asigne Vite)


📃 Licencia
Este proyecto es de uso libre para fines educativos o personales.