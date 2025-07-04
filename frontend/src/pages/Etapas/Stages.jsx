import { useEffect, useState } from 'react';
import api from '../../api/axios';
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
      <Link to="/stages/registrar">Registrar Nueva Etapa</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Orden</th>
            <th>Torneo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((stage) => (
            <tr key={stage.id}>
              <td>{stage.id}</td>
              <td>{stage.name}</td>
              <td>{stage.order}</td>
              <td>{stage.tournament}</td>
              <td>
                <Link to={`/stages/editar/${stage.id}`}>Editar</Link>
                <button onClick={() => handleDelete(stage.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stages;
