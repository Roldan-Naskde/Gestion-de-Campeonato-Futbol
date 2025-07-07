
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditarVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get(`venues/${id}/`).then(res => reset(res.data));
  }, [id, reset]);

  const onSubmit = async (data) => {
    await api.put(`venues/${id}/`, data);
    navigate('/venues-admin');
  };

  return (
    <div>
      <h2>Editar Sede</h2>
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
          <label>Ciudad</label>
          <input {...register('city', { required: true })} />
        </div>
        <div>
          <label>Capacidad</label>
          <input type="number" {...register('capacity', { required: true, min: 0 })} />
        </div>
        <button type="submit">Actualizar Sede</button>
      </form>
    </div>
  );
}

export default EditarVenue;
