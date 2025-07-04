import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function EditarTorneo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const res = await api.get(`tournaments/${id}/`);
        reset(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTorneo();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`tournaments/${id}/`, data);
      navigate('/torneos-admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Editar Torneo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre del Torneo</label>
          <input {...register('name', { required: 'Este campo es obligatorio' })} />
        </div>

        <div>
          <label>Año de la Temporada</label>
          <input
            type="number"
            {...register('season_year', { required: 'Este campo es obligatorio' })}
          />
        </div>

        <div>
          <label>Descripción</label>
          <textarea {...register('description')} />
        </div>

        <div>
          <label>Fecha de Inicio</label>
          <input type="date" {...register('start_date', { required: 'Este campo es obligatorio' })} />
        </div>

        <div>
          <label>Fecha de Fin</label>
          <input type="date" {...register('end_date', { required: 'Este campo es obligatorio' })} />
        </div>

        <button type="submit">Actualizar Torneo</button>
      </form>
    </div>
  );
}

export default EditarTorneo;
