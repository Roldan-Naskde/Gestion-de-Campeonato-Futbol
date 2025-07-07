import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';

function EtapasPublic() {
  const { torneoId } = useParams();  // ✅ corregido aquí
  const [etapas, setEtapas] = useState([]);

  useEffect(() => {
    api.get(`public/stages/?tournament_id=${torneoId}`).then((res) => {
      setEtapas(res.data);
    });
  }, [torneoId]);

  return (
    <div>
      <h3>Etapas del Torneo</h3>
      <ul>
        {etapas.map((stage) => (
          <li key={stage.id}>{stage.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EtapasPublic;
