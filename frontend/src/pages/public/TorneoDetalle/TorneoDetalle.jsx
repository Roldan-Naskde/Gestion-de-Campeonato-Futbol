import { Link, Outlet, useParams } from 'react-router-dom';
import './../../../../styles/TorneoDetalle.css';

function TorneoDetalle() {
  const { torneoId } = useParams();

  return (
    <div className="torneo-detalle-container">
      <aside className="sidebar">
        <h3>Menú del Torneo {torneoId}</h3>
        <ul>
          <li><Link to="tabla-posiciones">Tabla de Posiciones</Link></li>
          <li><Link to="equipos">Equipos</Link></li>
          <li><Link to="etapas">Etapas</Link></li>
          <li><Link to="grupos">Grupos</Link></li>
          <li><Link to="jugadores">Jugadores</Link></li>
          <li><Link to="sedes">Sedes</Link></li>
          <li><Link to="partidos">Partidos</Link></li>
          <li><Link to="calendario">Calendario</Link></li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default TorneoDetalle;
