import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';

function Venues() {
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    api.get('venues/').then(res => setSedes(res.data));
  }, []);

  const eliminarSede = async (id) => {
    if (confirm('¿Eliminar esta sede?')) {
      await api.delete(`venues/${id}/`);
      setSedes(sedes.filter(sede => sede.id !== id));
    }
  };

  return (
    <div>
      <h2>Listado de Sedes</h2>
      <Link to="/venues-admin/registrar">Registrar Nueva Sede</Link>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sedes.map((sede) => (
            <tr key={sede.id}>
              <td>{sede.id}</td>
              <td>{sede.name}</td>
              <td>{sede.address}</td>
              <td>{sede.capacity}</td>
              <td>
                <Link to={`/venues-admin/editar/${sede.id}`}>Editar</Link>
                {' | '}
                <button onClick={() => eliminarSede(sede.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Venues;
