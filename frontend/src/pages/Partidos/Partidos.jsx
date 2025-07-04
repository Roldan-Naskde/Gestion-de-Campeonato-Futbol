import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

function Partidos() {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    api.get('matches/').then(res => setPartidos(res.data));
  }, []);

  const eliminarPartido = async (id) => {
    if (confirm('¿Eliminar este partido?')) {
      await api.delete(`matches/${id}/`);
      setPartidos(partidos.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Listado de Partidos</h2>
      <Link to="/partidos/registrar">Registrar Partido</Link>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha y hora</th>
            <th>Equipo Local</th>
            <th>Equipo Visita</th>
            <th>Sede</th>
            <th>Arbitro</th>
            <th>Goles Local</th>
            <th>Goles Visita</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.datetime}</td>
              <td>{p.team_home}</td>
              <td>{p.team_away}</td>
              <td>{p.venue}</td>
              <td>{p.referee}</td>
              <td>{p.home_score}</td>
              <td>{p.away_score}</td>
              <td>
                <Link to={`/partidos/editar/${p.id}`}>Editar</Link>
                {' | '}
                <button onClick={() => eliminarPartido(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Partidos;
