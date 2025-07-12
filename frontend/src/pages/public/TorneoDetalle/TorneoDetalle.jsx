import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import './../../../../styles/TorneoDetalle.css';
import api from '../../../../api/axios';

function TorneoDetalle() {
  const { torneoId } = useParams();
  const [torneo, setTorneo] = useState(null);

  useEffect(() => {
    api.get(`public/tournaments/${torneoId}/`)
      .then((res) => setTorneo(res.data))
      .catch((err) => console.error('Error al obtener el torneo:', err));
  }, [torneoId]);

  return (
    <div className="torneo-detalle-container">
      <aside className="sidebar">
        <h3>🏆 {torneo ? torneo.name : 'Cargando torneo...'}</h3>
        <ul>
          <li><Link to="tabla-posiciones">📊 Tabla de Posiciones</Link></li>
          <li><Link to="equipos">👥 Equipos</Link></li>
          <li><Link to="etapas">🎯 Etapas</Link></li>
          <li><Link to="grupos">🧩 Grupos</Link></li>
          <li><Link to="jugadores">⚽ Jugadores</Link></li>
          <li><Link to="sedes">📍 Sedes</Link></li>
          <li><Link to="partidos">📅 Partidos</Link></li>
          <li><Link to="calendario">🗓️ Calendario</Link></li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default TorneoDetalle;
