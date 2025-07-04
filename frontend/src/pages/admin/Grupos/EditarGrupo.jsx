import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarGrupo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [grupoRes, stagesRes] = await Promise.all([
          api.get(`groups/${id}/`),
          api.get('stages/'),
        ]);
        reset(grupoRes.data);
        setStages(stagesRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`groups/${id}/`, data);
      navigate('/grupos-admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Editar Grupo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre del Grupo</label>
          <input {...register('name', { required: true })} />
        </div>

        <div>
          <label>Etapa</label>
          <select {...register('stage', { required: true })}>
            <option value="">Seleccione una etapa</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Actualizar Grupo</button>
      </form>
    </div>
  );
}

export default EditarGrupo;
