import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';

function EquiposPublic() {
  const { torneoId } = useParams();
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    api.get(`public/teams/?tournament_id=${torneoId}`).then((res) => {
      setEquipos(res.data);
    });
  }, [torneoId]);

  return (
    <div>
      <h3>Equipos Participantes</h3>
      <p>Estos son los equipos que participan en el torneo.</p>
      <table>
        <thead>
          <tr>
            <th>Nombre del Equipo</th>
            <th>Grupo</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.id}>
              <td>{equipo.name}</td>
              <td>{equipo.group_name}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}

export default EquiposPublic;
