import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarStage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await api.get('tournaments/');
        setTournaments(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTournaments();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('stages/', data);
      navigate('/stages-admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registrar Nueva Etapa</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input {...register('name', { required: 'Este campo es obligatorio' })} />
        </div>
        <div>
          <label>Orden</label>
          <input type="number" {...register('order', { required: 'Este campo es obligatorio' })} />
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistrarStage;
