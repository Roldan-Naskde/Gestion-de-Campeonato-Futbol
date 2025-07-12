import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';
import './../../../../styles/GruposPublic.css'; // 👈 Estilos externos

function GruposPublic() {
  const { torneoId } = useParams();
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    api.get(`public/groups/?tournament_id=${torneoId}`).then((res) => {
      setGrupos(res.data);
    });
  }, [torneoId]);

  return (
    <div className="grupos-container">
      <h3 className="grupos-title">📂 Grupos del Torneo</h3>
      <div className="grupos-grid">
        {grupos.map((group) => (
          <div key={group.id} className="grupo-card">
            <h4 className="grupo-name">🧩 {group.name}</h4>
            <p className="grupo-etapa">🏁 Etapa: <strong>{group.stage_name}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GruposPublic;
