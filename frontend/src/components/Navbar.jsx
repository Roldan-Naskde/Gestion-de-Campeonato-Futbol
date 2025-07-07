
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">⚽ Campeonato de Fútbol</h1>
        <div className="nav-links">
          {/* Menú Público */}
          <Link to="/">Inicio</Link>
          <Link to="/dashboard-public">Pagina</Link>
          <Link to="/login">Admin</Link>

          {/* Menú Privado */}
          {token && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/torneos-admin">Gestionar Torneos</Link>
              <Link to="/equipos-admin">Gestionar Equipos</Link>
              <Link to="/jugadores-admin">Gestionar Jugadores</Link>
              <Link to="/partidos-admin">Gestionar Partidos</Link>
              <Link to="/stages-admin">Gestionar Etapas</Link>
              <Link to="/grupos-admin">Gestionar Grupos</Link>
              <Link to="/venues-admin">Gestionar Sedes</Link>
              <Link to="/referees-admin">Gestionar Árbitros</Link>
              <Link to="/tabla-posiciones-admin">Gestionar Tabla de Posiciones</Link>
              <Link to="/eventos-partido-admin">Gestionar Eventos de Partido</Link>
              <button onClick={handleLogout} className="logout-button">
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
