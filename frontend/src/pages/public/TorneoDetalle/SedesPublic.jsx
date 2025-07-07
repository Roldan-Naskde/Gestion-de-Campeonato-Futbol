import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/axios';

function SedesPublic() {
  const { torneoId } = useParams();
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    api.get(`public/venues/?tournament_id=${torneoId}`).then((res) => {
      setSedes(res.data);
    });
  }, [torneoId]);

  return (
    <div>
      <h3>Sedes del Torneo</h3>
      <ul>
        {sedes.map((venue) => (
          <li key={venue.id}>
            <strong>{venue.name}</strong><br />
            Dirección: {venue.address}<br />
            Ciudad: {venue.city}<br />
            Capacidad: {venue.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SedesPublic;
