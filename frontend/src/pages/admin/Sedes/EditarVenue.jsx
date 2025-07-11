import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import './../../../../styles/VenuesForm.css';  // Importa tu CSS externo

function EditarVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    api.get(`venues/${id}/`).then(res => reset(res.data));
  }, [id, reset]);

  const onSubmit = async (data) => {
    await api.put(`venues/${id}/`, data);
    navigate('/venues-admin');
  };

  return (
    <div className="venues-form-container">
      <h2>Editar Sede</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="venues-form">
        <div className="form-group">
          <label>Nombre</label>
          <input
            {...register('name', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: 'El nombre solo puede contener letras y espacios'
              }
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input
            {...register('address', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d,.\-]+$/,
                message: 'La dirección solo puede contener letras, números y , . -'
              }
            })}
          />
          {errors.address && <span className="error">{errors.address.message}</span>}
        </div>

        <div className="form-group">
          <label>Ciudad</label>
          <input
            {...register('city', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: 'La ciudad solo puede contener letras y espacios'
              }
            })}
          />
          {errors.city && <span className="error">{errors.city.message}</span>}
        </div>

        <div className="form-group">
          <label>Capacidad</label>
          <input
            type="number"
            {...register('capacity', {
              required: 'Este campo es obligatorio',
              min: { value: 0, message: 'La capacidad debe ser un número positivo' }
            })}
          />
          {errors.capacity && <span className="error">{errors.capacity.message}</span>}
        </div>
        <button type="submit" className="btn-submit">Actualizar Sede</button>
      </form>
    </div>
  );
}

export default EditarVenue;
