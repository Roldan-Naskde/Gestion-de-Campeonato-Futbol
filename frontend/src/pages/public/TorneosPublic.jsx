import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';  // Asegúrate que esta ruta esté bien en tu proyecto

function TorneosPublic() {
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    api.get('public/tournaments/')
      .then((res) => {
        console.log('Torneos cargados:', res.data);  // 👈 Debug aquí
        setTorneos(res.data);
      })
      .catch((err) => {
        console.error('Error al cargar torneos:', err);
      });
  }, []);


  return (
    <div>
      <h2>Torneos Disponibles</h2>
      <ul>
  {torneos.map((torneo) => (
    <li key={torneo.id}>
      <Link to={`/torneos/${torneo.id}/tabla-posiciones`}>
        {torneo.name} {/* Asegúrate de usar la propiedad correcta */}
      </Link>
    </li>
  ))}
</ul>

    </div>
  );
}

export default TorneosPublic;