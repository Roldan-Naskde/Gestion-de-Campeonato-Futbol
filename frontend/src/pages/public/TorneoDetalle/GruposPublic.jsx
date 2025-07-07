import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';

function GruposPublic() {
  const { torneoId } = useParams();
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    api.get(`public/groups/?tournament_id=${torneoId}`).then((res) => {
      setGrupos(res.data);
    });
  }, [torneoId]);

  return (
    <div>
      <h3>Grupos del Torneo</h3>
      <ul>
        {grupos.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GruposPublic;
