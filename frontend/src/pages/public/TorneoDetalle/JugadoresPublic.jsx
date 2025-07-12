import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';
import './../../../../styles/JugadoresPublic.css'; // 👈 Asegúrate de crear este archivo CSS

function JugadoresPublic() {
  const { torneoId } = useParams();
  const [jugadores, setJugadores] = useState([]);

  const posicionesTraducidas = {
    GK: '🧤 Arquero',
    DEF: '🛡️ Defensa',
    MID: '🎯 Mediocampista',
    FW: '⚽ Delantero',
  };

  useEffect(() => {
    api.get(`public/players/?tournament_id=${torneoId}`).then((res) => {
      setJugadores(res.data);
    });
  }, [torneoId]);

  return (
    <div className="jugadores-container">
      <h3 className="jugadores-title">👥 Jugadores Registrados</h3>
      <div className="jugadores-grid">
        {jugadores.map((player) => (
          <div key={player.id} className="jugador-card">
            <h4 className="jugador-nombre">{player.first_name} {player.last_name}</h4>
            <p className="jugador-posicion">{posicionesTraducidas[player.position]}</p>
            <p className="jugador-equipo">🏟️ {player.team_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JugadoresPublic;
