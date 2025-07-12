import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';
import './../../../../styles/TablaPosiciones.css'; // Asegúrate de importar tu CSS

function TabladePosicionesPublic() {
  const { torneoId } = useParams();
  const [posiciones, setPosiciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`public/standings/${torneoId}/`);
        setPosiciones(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [torneoId]);

  return (
    <div className="tabla-container">
      <h2 className="tabla-titulo">🏆 Tabla de Posiciones</h2>
      <div className="tabla-wrapper">
        <table className="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>PJ</th>
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
            {posiciones.length === 0 ? (
              <tr>
                <td colSpan="10">No hay datos disponibles.</td>
              </tr>
            ) : (
              posiciones.map((p, index) => (
                <tr key={index} className="fila-posicion">
                  <td>{index + 1}</td>
                  <td className="equipo-nombre">{p.team_name}</td>
                  <td>{p.played}</td>
                  <td>{p.won}</td>
                  <td>{p.drawn}</td>
                  <td>{p.lost}</td>
                  <td>{p.gf}</td>
                  <td>{p.ga}</td>
                  <td>{p.gd}</td>
                  <td className="puntos">{p.points}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabladePosicionesPublic;
