import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrarGrupo() {
  const { register, handleSubmit } = useForm();
  const [stages, setStages] = useState([]);
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    try {
      await api.post('groups/', data);
      navigate('/grupos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registrar Nuevo Grupo</h2>
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

        <button type="submit">Registrar Grupo</button>
      </form>
    </div>
  );
}

export default RegistrarGrupo;
