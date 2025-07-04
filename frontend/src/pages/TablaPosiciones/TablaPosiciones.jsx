import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

function TablaPosiciones() {
  const [posiciones, setPosiciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('standings/');
        setPosiciones(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const eliminarPosicion = async (id) => {
    if (confirm('¿Eliminar posición?')) {
      try {
        await api.delete(`standings/${id}/`);
        setPosiciones(posiciones.filter((p) => p.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Tabla de Posiciones</h2>
      <Link to="/tabla-posiciones/registrar">Registrar Posición</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Torneo</th>
            <th>Equipo</th>
            <th>Jugados</th>
            <th>Ganados</th>
            <th>Empates</th>
            <th>Perdidos</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Puntos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posiciones.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.toournament}</td>
              <td>{p.team}</td>
              <td>{p.played}</td>
              <td>{p.won}</td>
              <td>{p.drawn}</td>
              <td>{p.lost}</td>
              <td>{p.gf}</td>
              <td>{p.ga}</td>
              <td>{p.gd}</td>
              <td>{p.points}</td>
              <td>
                <Link to={`/tabla-posiciones/editar/${p.id}`}>Editar</Link> |{' '}
                <button onClick={() => eliminarPosicion(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPosiciones;
