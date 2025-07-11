import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarVenue() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post('venues/', data);
      navigate('/venues-admin');
    } catch (error) {
      console.error(error);
      alert('Error al registrar la sede');
    }
  };

  return (
    <div>
      <h2>Registrar Nueva Sede</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            {...register('name', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: 'Solo se permiten letras y espacios'
              }
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label>Dirección</label>
          <input
            {...register('address', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d,.\-]+$/,
                message: 'Solo se permiten letras, números y , . -'
              }
            })}
          />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <div>
          <label>Ciudad</label>
          <input
            {...register('city', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: 'Solo se permiten letras y espacios'
              }
            })}
          />
          {errors.city && <span>{errors.city.message}</span>}
        </div>

        <div>
          <label>Capacidad</label>
          <input
            type="number"
            {...register('capacity', {
              required: 'Este campo es obligatorio',
              min: { value: 0, message: 'Debe ser un número positivo' }
            })}
          />
          {errors.capacity && <span>{errors.capacity.message}</span>}
        </div>

        <button type="submit">Registrar Sede</button>
      </form>

      <style>
        {`
          span {
            color: red;
            font-size: 0.9rem;
          }

          input {
            display: block;
            margin-bottom: 10px;
            padding: 6px;
            width: 100%;
            max-width: 400px;
          }

          label {
            font-weight: bold;
          }

          button {
            padding: 8px 12px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #218838;
          }

          form {
            max-width: 500px;
            margin: auto;
          }
        `}
      </style>
    </div>
  );
}

export default RegistrarVenue;
