import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarTorneo() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
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

  // Para validar fechas (comparación)
  const startDate = watch('start_date');

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
            {...register('season_year', {
              required: 'Este campo es obligatorio',
              min: { value: 1950, message: 'El año debe ser como mínimo 1950' },
              max: { value: 2030, message: 'El año debe ser como máximo 2030' }
            })}
          />
          {errors.season_year && <span>{errors.season_year.message}</span>}
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            {...register('description', { required: 'Este campo es obligatorio' })}
          />
          {errors.description && <span>{errors.description.message}</span>}
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
            {...register('end_date', {
              required: 'Este campo es obligatorio',
              validate: (value) =>
                !startDate || value >= startDate || 'La fecha de fin debe ser posterior o igual a la fecha de inicio'
            })}
          />
          {errors.end_date && <span>{errors.end_date.message}</span>}
        </div>

        <button type="submit">Registrar Torneo</button>
      </form>
    </div>
  );
}

export default RegistrarTorneo;
