import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Listado de Árbitros</h2>
      <Link to="/referees/registrar">Registrar Árbitro</Link>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {arbitros.map((arbitro) => (
            <tr key={arbitro.id}>
              <td>{arbitro.id}</td>
              <td>{arbitro.first_name}</td>
              <td>{arbitro.last_name}</td>
              <td>{arbitro.category}</td>
              <td>
                <Link to={`/referees/editar/${arbitro.id}`}>Editar</Link>
                {' | '}
                <button onClick={() => eliminarArbitro(arbitro.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Referees;
