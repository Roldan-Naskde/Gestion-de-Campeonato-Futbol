import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

function Torneos() {
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const res = await api.get('tournaments/');
        setTorneos(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTorneos();
  }, []);

  const eliminarTorneo = async (id) => {
    if (confirm('¿Estás seguro de eliminar este torneo?')) {
      try {
        await api.delete(`tournaments/${id}/`);
        setTorneos(torneos.filter((torneo) => torneo.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Listado de Torneos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Año</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {torneos.map((torneo) => (
            <tr key={torneo.id}>
              <td>{torneo.id}</td>
              <td>{torneo.name}</td>
              <td>{torneo.season_year}</td>
              <td>{torneo.start_date}</td>
              <td>{torneo.end_date}</td>
              <td>
                <Link to={`/torneos/editar/${torneo.id}`}>Editar</Link>
                {' | '}
                <button onClick={() => eliminarTorneo(torneo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/torneos/registrar">Registrar Nuevo Torneo</Link>
    </div>
  );
}

export default Torneos;