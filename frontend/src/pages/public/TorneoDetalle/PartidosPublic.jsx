import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';

function PartidosPublic() {
  const { torneoId } = useParams();
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    api.get(`public/matches/?tournament_id=${torneoId}`).then((res) => {
      setPartidos(res.data);
    });
  }, [torneoId]);

  return (
    <div>
      <h3>Todos los Partidos del Torneo</h3>
      <ul>
        {partidos.map((match) => (
          <li key={match.id}>
            {match.team_home_name} vs {match.team_away_name} - 
            {new Date(match.datetime).toLocaleString()} <br />
            Resultado: {match.home_score} - {match.away_score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PartidosPublic;
