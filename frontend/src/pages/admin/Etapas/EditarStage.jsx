import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarStage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stageRes, tournamentsRes] = await Promise.all([
          api.get(`stages/${id}/`),
          api.get('tournaments/')
        ]);
        reset(stageRes.data);
        setTournaments(tournamentsRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`stages/${id}/`, data);
      navigate('/stages-admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Editar Etapa</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input {...register('name', { required: 'Este campo es obligatorio' })} />
        </div>
        <div>
          <label>Orden</label>
          <input type="number" {...register('order', { required: 'Este campo es obligatorio',
            min: { value: 1, message: 'El orden debe ser mayor a 0' }
          })} />
        </div>
        <div>
          <label>Torneo</label>
          <select {...register('tournament', { required: 'Seleccione un torneo' })}>
            <option value="">Seleccione</option>
            {tournaments.map((torneo) => (
              <option key={torneo.id} value={torneo.id}>
                {torneo.name} ({torneo.season_year})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default EditarStage;
