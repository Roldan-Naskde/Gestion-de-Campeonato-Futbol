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

  const posicionesTraducidas = {
    GK: 'Arquero',
    DEF: 'Defensa',
    MID: 'Mediocampista',
    FW: 'Delantero',
  };

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  return (
    <div>
      <h2>Listado de Jugadores</h2>
      <Link to="/jugadores-admin/registrar">Registrar Nuevo Jugador</Link>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>{/* En vez de ID */}
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Posición</th>
            <th>Equipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((j, index) => (
            <tr key={j.id}>
              <td>{index + 1}</td>{/* Número de orden, empieza desde 1 */}
              <td>{j.first_name}</td>
              <td>{j.last_name}</td>
              <td>{calcularEdad(j.birth_date)} años</td>
              <td>{posicionesTraducidas[j.position] || j.position}</td>
              <td>{j.team_name}</td>
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
