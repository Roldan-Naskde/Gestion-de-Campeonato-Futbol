
import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';

function Partidos() {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    api.get('matches/').then(res => setPartidos(res.data));
  }, []);

  const eliminarPartido = async (id) => {
    if (confirm('¿Eliminar este partido?')) {
      await api.delete(`matches/${id}/`);
      setPartidos(partidos.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Listado de Partidos</h2>
      <Link to="/partidos-admin/registrar">Registrar Partido</Link>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha y hora</th>
            <th>Equipo Local</th>
            <th>Equipo Visita</th>
            <th>Sede</th>
            <th>Árbitro</th>
            <th>Goles Local</th>
            <th>Goles Visita</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{new Date(p.datetime).toLocaleString()}</td>
              <td>{p.team_home_name}</td>
              <td>{p.team_away_name}</td>
              <td>{p.venue_name}</td>
              <td>{p.referee_name || 'Sin árbitro'}</td>
              <td>{p.home_score}</td>
              <td>{p.away_score}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/partidos-admin/editar/${p.id}`}>Editar</Link>
                  <button onClick={() => eliminarPartido(p.id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Partidos;
