import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';
import './../../../../styles/quiposadmin.css';

function Equipos() {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const res = await api.get('teams/');
        setEquipos(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEquipos();
  }, []);

  const eliminarEquipo = async (id) => {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
      try {
        await api.delete(`teams/${id}/`);
        setEquipos(equipos.filter((equipo) => equipo.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Listado de Equipos</h2>
      <Link to="/equipos-admin/registrar">Registrar Nuevo Equipo</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Entrenador</th>
            <th>Fundación</th>
            <th>Grupo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.id}>
              <td>{equipo.id}</td>
              <td>{equipo.name}</td>
              <td>{equipo.coach_name}</td>
              <td>{equipo.founded}</td>
              <td>{equipo.group_name}</td>
              <td>
                <Link to={`/equipos-admin/editar/${equipo.id}`}>Editar</Link>
                <button onClick={() => eliminarEquipo(equipo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Equipos;
