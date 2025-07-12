import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';
import './../../../../styles/PartidosPublic.css'; // 👈 Asegúrate de crearlo

function PartidosPublic() {
  const { torneoId } = useParams();
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    api.get(`public/matches/?tournament_id=${torneoId}`).then((res) => {
      setPartidos(res.data);
    });
  }, [torneoId]);

  return (
    <div className="partidos-container">
      <h3 className="partidos-title">📅 Todos los Partidos del Torneo</h3>
      <div className="partidos-grid">
        {partidos.map((match) => (
          <div key={match.id} className="partido-card">
            <div className="equipos">
              <span className="equipo">{match.team_home_name}</span>
              <span className="versus">vs</span>
              <span className="equipo">{match.team_away_name}</span>
            </div>
            <div className="resultado">
              <strong>Resultado:</strong> {match.home_score} - {match.away_score}
            </div>
            <div className="fecha">
              🕒 {new Date(match.datetime).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartidosPublic;
