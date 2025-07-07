import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';

function TabladePosicionesAdmin() {
  const [posiciones, setPosiciones] = useState([]);
  const navigate = useNavigate();

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
    if (confirm('¿Estás seguro de eliminar esta posición?')) {
      try {
        await api.delete(`standings/${id}/`);
        setPosiciones(posiciones.filter((p) => p.id !== id));
      } catch (error) {
        console.error(error);
        alert('Error al eliminar la posición');
      }
    }
  };

  const editarPosicion = (id) => {
    navigate(`/tabla-posiciones-admin/editar/${id}`);
  };

  return (
    <div>
      <h2>Tabla de Posiciones (Admin)</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>Torneo</th>
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
          {posiciones.length === 0 ? (
            <tr>
              <td colSpan="12">No hay datos en la tabla de posiciones.</td>
            </tr>
          ) : (
            posiciones.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.team_name}</td>
                <td>{p.tournament_name}</td>
                <td>{p.played}</td>
                <td>{p.won}</td>
                <td>{p.drawn}</td>
                <td>{p.lost}</td>
                <td>{p.gf}</td>
                <td>{p.ga}</td>
                <td>{p.gd}</td>
                <td>{p.points}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => editarPosicion(p.id)}>Editar</button>
                    <button onClick={() => eliminarPosicion(p.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabladePosicionesAdmin;
