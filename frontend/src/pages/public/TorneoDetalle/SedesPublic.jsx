import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';
import './../../../../styles/SedesPublic.css'; // 👈 Crea este archivo CSS

function SedesPublic() {
  const { torneoId } = useParams();
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    api.get(`public/venues/?tournament_id=${torneoId}`).then((res) => {
      setSedes(res.data);
    });
  }, [torneoId]);

  return (
    <div className="sedes-container">
      <h3 className="sedes-title">📍 Sedes del Torneo</h3>
      <div className="sedes-grid">
        {sedes.map((venue) => (
          <div key={venue.id} className="sede-card">
            <h4 className="sede-nombre">🏟️ {venue.name}</h4>
            <p><strong>📌 Dirección:</strong> {venue.address}</p>
            <p><strong>🌆 Ciudad:</strong> {venue.city}</p>
            <p><strong>👥 Capacidad:</strong> {venue.capacity} personas</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SedesPublic;
