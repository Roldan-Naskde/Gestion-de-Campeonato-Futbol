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
      <ul>
        {equipos.map((equipo) => (
          <li key={equipo.id}>
            {equipo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EquiposPublic;
