import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import './../../../../styles/RefereeForm.css';

function RegistrarReferee() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post('referees/', data);
    navigate('/referees-admin');
  };

  return (
    <div className="referee-form-container">
      <h2>Registrar Árbitro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="referee-form">
        <div className="form-group">
          <label>Nombre</label>
          <input {...register('first_name', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Solo se permiten letras y espacios'
            }
          })} />
          {errors.first_name && <span className="error">{errors.first_name.message}</span>}
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input {...register('last_name', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Solo se permiten letras y espacios'
            }
          })} />
          {errors.last_name && <span className="error">{errors.last_name.message}</span>}
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <input {...register('category', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Solo se permiten letras y espacios'
            }
          })} />
          {errors.category && <span className="error">{errors.category.message}</span>}
        </div>
        <button type="submit" className="btn-submit">Registrar Árbitro</button>
      </form>
    </div>
  );
}

export default RegistrarReferee;
