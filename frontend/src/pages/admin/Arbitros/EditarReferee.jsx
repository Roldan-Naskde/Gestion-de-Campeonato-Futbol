import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarReferee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get(`referees/${id}/`).then(res => reset(res.data));
  }, [id, reset]);

  const onSubmit = async (data) => {
    await api.put(`referees/${id}/`, data);
    navigate('/referees-admin');
  };

  return (
    <div>
      <h2>Editar Árbitro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input {...register('first_name', { required: true })} />
        </div>
        <div>
          <label>Apellido</label>
          <input {...register('last_name', { required: true })} />
        </div>
        <div>
          <label>Categoría</label>
          <input {...register('category', { required: true })} />
        </div>
        <button type="submit">Actualizar Árbitro</button>
      </form>
    </div>
  );
}

export default EditarReferee;
