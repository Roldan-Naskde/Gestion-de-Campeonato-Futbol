
import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';

function Grupos() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const res = await api.get('groups/');
        setGrupos(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGrupos();
  }, []);

  const eliminarGrupo = async (id) => {
    if (confirm('¿Estás seguro de eliminar este grupo?')) {
      try {
        await api.delete(`groups/${id}/`);
        setGrupos(grupos.filter((grupo) => grupo.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Listado de Grupos</h2>
      <Link to="/grupos-admin/registrar">Registrar Nuevo Grupo</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Grupo</th>
            <th>Etapa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <tr key={grupo.id}>
              <td>{grupo.id}</td>
              <td>{grupo.name}</td>
              <td>{grupo.stage}</td>
              <td>
                <Link to={`/grupos-admin/editar/${grupo.id}`}>Editar</Link>
                <button onClick={() => eliminarGrupo(grupo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grupos;