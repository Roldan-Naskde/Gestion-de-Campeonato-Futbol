import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import './../../../../styles/RefereeForm.css';

function EditarReferee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    api.get(`referees/${id}/`).then(res => reset(res.data));
  }, [id, reset]);

  const onSubmit = async (data) => {
    await api.put(`referees/${id}/`, data);
    navigate('/referees-admin');
  };

  return (
    <div className="referee-form-container">
      <h2>Editar Árbitro</h2>
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
        <button type="submit" className="btn-submit">Actualizar Árbitro</button>
      </form>
    </div>
  );
}

export default EditarReferee;
