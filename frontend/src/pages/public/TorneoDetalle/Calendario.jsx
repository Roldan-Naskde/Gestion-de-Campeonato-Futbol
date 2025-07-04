import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';

function Calendario() {
  const { torneoId } = useParams();
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    api.get(`public/matches/?tournament_id=${torneoId}`).then((res) => {
      setPartidos(res.data);
    });
  }, [torneoId]);

  const partidosFuturos = partidos.filter(
    (match) => new Date(match.datetime) > new Date()
  );

  return (
    <div>
      <h3>Calendario de Partidos (Próximos)</h3>
      {partidosFuturos.length === 0 ? (
        <p>No hay partidos programados.</p>
      ) : (
        <ul>
          {partidosFuturos.map((match) => (
            <li key={match.id}>
              {match.team_home_name} vs {match.team_away_name} -{' '}
              {new Date(match.datetime).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Calendario;