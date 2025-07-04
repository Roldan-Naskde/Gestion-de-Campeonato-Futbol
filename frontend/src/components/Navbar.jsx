import { Link } from 'react-router-dom';
import './Navbar.css';  // Archivo de estilos

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Campeonato de Fulbito</h1>
        <div className="nav-links">
          <Link to="/">Inicio</Link>

          {/* Equipos y Jugadores */}
          <Link to="/equipos">Equipos</Link>
          <Link to="/equipos/registrar">Registrar Equipo</Link>
          <Link to="/jugadores">Jugadores</Link>
          <Link to="/jugadores/registrar">Registrar Jugador</Link>

          {/* Torneos, Etapas y Grupos */}
          <Link to="/torneos">Torneos</Link>
          <Link to="/torneos/registrar">Registrar Torneo</Link>
          <Link to="/stages">Etapas</Link>
          <Link to="/stages/registrar">Registrar Etapa</Link>
          <Link to="/grupos">Grupos</Link>
          <Link to="/grupos/registrar">Registrar Grupo</Link>

          {/* Partidos, Eventos, Árbitros y Escenarios */}
          <Link to="/partidos">Partidos</Link>
          <a href="/partidos/registrar">Registrar Partido</a>
          <Link to="/eventos-partido">Eventos de Partido</Link>
          <Link to="/referees">Árbitros</Link>
          <a href="/referee/registrar">Registrar Árbitro</a>
          <Link to="/venues">Escenarios</Link>
          <Link to="/venues/registrar">Registrar Escenario</Link>

          {/* Otros */}
          <Link to="/calendario">Calendario</Link>
          <Link to="/tabla-posiciones">Tabla de Posiciones</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
