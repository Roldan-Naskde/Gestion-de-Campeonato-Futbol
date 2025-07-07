
import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    api.get('players/').then(res => setJugadores(res.data));
  }, []);

  const eliminarJugador = async (id) => {
    if (confirm('¿Eliminar este jugador?')) {
      await api.delete(`players/${id}/`);
      setJugadores(jugadores.filter(j => j.id !== id));
    }
  };

  return (
    <div>
      <h2>Listado de Jugadores</h2>
      <Link to="/jugadores-admin/registrar">Registrar Nuevo Jugador</Link>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Nac.</th>
            <th>Posición</th>
            <th>Equipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((j) => (
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.first_name}</td>
              <td>{j.last_name}</td>
              <td>{j.birth_date}</td>
              <td>{j.position}</td>
              <td>{j.team}</td>
              <td>
                <Link to={`/jugadores-admin/editar/${j.id}`}>Editar</Link>
                {' | '}
                <button onClick={() => eliminarJugador(j.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Jugadores;
