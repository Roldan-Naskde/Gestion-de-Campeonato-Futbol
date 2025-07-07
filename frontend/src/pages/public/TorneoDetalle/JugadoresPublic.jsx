import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';

function JugadoresPublic() {
  const { torneoId } = useParams();
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    api.get(`public/players/?tournament_id=${torneoId}`).then((res) => {
      setJugadores(res.data);
    });
  }, [torneoId]);

  return (
    <div>
      <h3>Jugadores Registrados</h3>
      <ul>
        {jugadores.map((player) => (
          <li key={player.id}>
            {player.first_name} {player.last_name} - {player.position} ({player.team_name})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JugadoresPublic;
