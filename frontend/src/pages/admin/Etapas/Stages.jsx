import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';

function Stages() {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const res = await api.get('stages/');
        setStages(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`stages/${id}/`);
      setStages(stages.filter(stage => stage.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Listado de Etapas</h2>
      <Link to="/stages-admin/registrar">Registrar Nueva Etapa</Link>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Orden</th>
            <th>Torneo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((stage, index) => (
            <tr key={stage.id}>
              <td>{index + 1}</td>{/* Display the index + 1 for numbering */}
              <td>{stage.name}</td>
              <td>{stage.order}</td>
              <td>{stage.tournament_name}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/stages-admin/editar/${stage.id}`}>Editar</Link>
                  <button onClick={() => handleDelete(stage.id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stages;
