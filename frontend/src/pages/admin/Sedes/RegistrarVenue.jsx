import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarVenue() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post('venues/', data);
    navigate('/venues-admin');
  };

  return (
    <div>
      <h2>Registrar Nueva Sede</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input {...register('name', { required: true })} />
        </div>
        <div>
          <label>Dirección</label>
          <input {...register('address', { required: true })} />
        </div>
        <div>
          <label>Capacidad</label>
          <input type="number" {...register('capacity', { required: true })} />
        </div>
        <button type="submit">Registrar Sede</button>
      </form>
    </div>
  );
}

export default RegistrarVenue;
