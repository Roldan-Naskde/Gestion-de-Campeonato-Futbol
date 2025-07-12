import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';
import './../../../../styles/Equipospublic.css';

function EquiposPublic() {
  const { torneoId } = useParams();
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    api.get(`public/teams/?tournament_id=${torneoId}`).then((res) => {
      setEquipos(res.data);
    });
  }, [torneoId]);

  return (
    <div className="equipos-container">
      <h3 className="equipos-titulo">⚽ Equipos Participantes</h3>
      <p className="equipos-subtitulo">Estos son los equipos que compiten en este torneo.</p>
      <div className="tabla-wrapper">
        <table className="tabla-equipos">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Grupo</th>
            </tr>
          </thead>
          <tbody>
            {equipos.length === 0 ? (
              <tr>
                <td colSpan="2">No hay equipos registrados aún.</td>
              </tr>
            ) : (
              equipos.map((equipo) => (
                <tr key={equipo.id}>
                  <td className="equipo-nombre">{equipo.name}</td>
                  <td>{equipo.group_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EquiposPublic;
