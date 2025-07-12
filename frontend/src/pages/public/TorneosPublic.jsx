import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import './../../../styles/TorneosPublic.css'; // 👈 Estilos externos

function TorneosPublic() {
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    api.get('public/tournaments/')
      .then((res) => {
        setTorneos(res.data);
      })
      .catch((err) => {
        console.error('Error al cargar torneos:', err);
      });
  }, []);

  return (
    <div className="torneos-container">
      <h2 className="torneos-title">🏆 Torneos Disponibles</h2>
      <div className="torneos-grid">
        {torneos.map((torneo) => (
          <Link
            to={`/torneos/${torneo.id}/tabla-posiciones`}
            key={torneo.id}
            className="torneo-card"
          >
            <h3 className="torneo-name">⚽ {torneo.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TorneosPublic;
