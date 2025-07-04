import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarTorneo() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post('tournaments/', data);
      reset();
      navigate('/torneos-admin');
    } catch (error) {
      console.error(error);
      alert('Error al registrar el torneo');
    }
  };

  return (
    <div>
      <h2>Registrar Nuevo Torneo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre del Torneo</label>
          <input
            {...register('name', { required: 'Este campo es obligatorio' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label>Año de la Temporada</label>
          <input
            type="number"
            {...register('season_year', { required: 'Este campo es obligatorio', min: 1900 })}
          />
          {errors.season_year && <span>{errors.season_year.message}</span>}
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            {...register('description')}
          />
        </div>

        <div>
          <label>Fecha de Inicio</label>
          <input
            type="date"
            {...register('start_date', { required: 'Este campo es obligatorio' })}
          />
          {errors.start_date && <span>{errors.start_date.message}</span>}
        </div>

        <div>
          <label>Fecha de Fin</label>
          <input
            type="date"
            {...register('end_date', { required: 'Este campo es obligatorio' })}
          />
          {errors.end_date && <span>{errors.end_date.message}</span>}
        </div>

        <button type="submit">Registrar Torneo</button>
      </form>
    </div>
  );
}

export default RegistrarTorneo;