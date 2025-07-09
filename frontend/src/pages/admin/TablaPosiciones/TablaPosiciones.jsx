import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';

function TabladePosicionesAdmin() {
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

  // Ordenar por puntos (descendente) y GD (descendente)
  const posicionesOrdenadas = [...posiciones].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.gd - a.gd;
  });

  return (
    <div>
      <h2>Tabla de Posiciones (Admin)</h2>
      <table border={1} style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>Jugados</th>
            <th>Ganados</th>
            <th>Empates</th>
            <th>Perdidos</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {posicionesOrdenadas.length === 0 ? (
            <tr>
              <td colSpan="10">No hay datos en la tabla de posiciones.</td>
            </tr>
          ) : (
            posicionesOrdenadas.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.team_name}</td>
                <td>{p.played}</td>
                <td>{p.won}</td>
                <td>{p.drawn}</td>
                <td>{p.lost}</td>
                <td>{p.gf}</td>
                <td>{p.ga}</td>
                <td>{p.gd}</td>
                <td>{p.points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabladePosicionesAdmin;
