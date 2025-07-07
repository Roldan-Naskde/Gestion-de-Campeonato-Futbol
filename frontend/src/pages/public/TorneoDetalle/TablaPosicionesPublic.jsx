import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';

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
    <div>
      <h2>Tabla de Posiciones</h2>
      <table>
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
          {posiciones.length === 0 ? (
            <tr>
              <td colSpan="10">No hay datos de la tabla de posiciones.</td>
            </tr>
          ) : (
            posiciones.map((p, index) => (
              <tr key={index}>
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

export default TabladePosicionesPublic;
