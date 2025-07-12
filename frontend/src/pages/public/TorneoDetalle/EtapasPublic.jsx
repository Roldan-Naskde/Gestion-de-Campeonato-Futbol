import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';
import './../../../../styles/EtapasPublic.css'; // 👈 Asegúrate de crear este archivo

function EtapasPublic() {
  const { torneoId } = useParams();
  const [etapas, setEtapas] = useState([]);

  useEffect(() => {
    api.get(`public/stages/?tournament_id=${torneoId}`).then((res) => {
      setEtapas(res.data);
    });
  }, [torneoId]);

  return (
    <div className="etapas-container">
      <h3 className="etapas-title">📌 Etapas del Torneo</h3>
      <div className="etapas-grid">
        {etapas.map((stage) => (
          <div key={stage.id} className="etapa-card">
            <h4 className="etapa-name">🗂️ {stage.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EtapasPublic;
