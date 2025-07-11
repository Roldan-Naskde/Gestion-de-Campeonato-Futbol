import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';
import './../../../../styles/RefereeList.css';

function Referees() {
  const [arbitros, setArbitros] = useState([]);

  useEffect(() => {
    api.get('referees/').then(res => setArbitros(res.data));
  }, []);

  const eliminarArbitro = async (id) => {
    if (confirm('¿Eliminar este árbitro?')) {
      await api.delete(`referees/${id}/`);
      setArbitros(arbitros.filter(a => a.id !== id));
    }
  };

  return (
    <div className="referee-list-container">
      <h2>Listado de Árbitros</h2>
      <Link to="/referees-admin/registrar" className="btn-registrar">Registrar Árbitro</Link>
      <table className="referee-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {arbitros.map((arbitro, index) => (
            <tr key={arbitro.id}>
              <td>{index + 1}</td>
              <td>{arbitro.first_name}</td>
              <td>{arbitro.last_name}</td>
              <td>{arbitro.category}</td>
              <td>
                <Link to={`/referees-admin/editar/${arbitro.id}`} className="btn-editar">Editar</Link>
                <button onClick={() => eliminarArbitro(arbitro.id)} className="btn-eliminar">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Referees;
