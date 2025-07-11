import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import './../../../../styles/TablaPosicionesAdmin.css';

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

  const posicionesOrdenadas = [...posiciones].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.gd - a.gd;
  });

  return (
    <div className="tabla-posiciones-container">
      <h2>🏆 Tabla de Posiciones</h2>
      <div className="tabla-scroll">
        <table className="tabla-posiciones">
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>J</th>
              <th>G</th>
              <th>E</th>
              <th>P</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {posicionesOrdenadas.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-datos">No hay datos en la tabla de posiciones.</td>
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
    </div>
  );
}

export default TabladePosicionesAdmin;
