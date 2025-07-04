import { useEffect, useState } from 'react';
import api from '../api/axios';
import '../../styles/Calendario.css'; // CSS Reutilizado

function Calendario() {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    api.get('matches/').then((response) => {
      setPartidos(response.data);
    });
  }, []);

  return (
    <div className="section">
      <h2>Calendario de Partidos</h2>
      <ul className="list">
        {partidos.map((partido) => (
          <li key={partido.id} className="card">
            <strong>
              {partido.team_home} vs {partido.team_away}
            </strong>
            <br />
            Fecha y Hora: {new Date(partido.datetime).toLocaleString()} <br />
            Lugar: {partido.venue}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Calendario;
