import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarReferee() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post('referees/', data);
    navigate('/referees-admin');
  };

  return (
    <div>
      <h2>Registrar Árbitro</h2>
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
          <label>Categoria</label>
          <input {...register('category', { required: true })} />
        </div>
        <button type="submit">Registrar Árbitro</button>
      </form>
    </div>
  );
}

export default RegistrarReferee;
