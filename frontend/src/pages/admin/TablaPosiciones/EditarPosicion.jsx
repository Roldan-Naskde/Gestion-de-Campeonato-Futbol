import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarPosicion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [equipos, setEquipos] = useState([]);
  const [torneos, setTorneos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [posicionRes, teamsRes, tournamentsRes] = await Promise.all([
        api.get(`standings/${id}/`),
        api.get('teams/'),
        api.get('tournaments/')
      ]);
      reset(posicionRes.data);
      setEquipos(teamsRes.data);
      setTorneos(tournamentsRes.data);
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`standings/${id}/`, data);
      navigate('/tabla-posiciones-admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Editar Posición</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Equipo</label>
          <select {...register('team', { required: true })}>
            <option value="">Seleccione</option>
            {equipos.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Torneo</label>
          <select {...register('tournament', { required: true })}>
            <option value="">Seleccione</option>
            {torneos.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Jugados</label>
          <input type="number" {...register('played')} />
        </div>
        <div>
          <label>Ganados</label>
          <input type="number" {...register('won')} />
        </div>
        <div>
          <label>Empates</label>
          <input type="number" {...register('drawn')} />
        </div>
        <div>
          <label>Perdidos</label>
          <input type="number" {...register('lost')} />
        </div>
        <div>
          <label>Goles a Favor</label>
          <input type="number" {...register('gf')} />
        </div>
        <div>
          <label>Goles en Contra</label>
          <input type="number" {...register('ga')} />
        </div>
        <div>
          <label>Diferencia</label>
          <input type="number" {...register('gd')} />
        </div>
        <div>
          <label>Puntos</label>
          <input type="number" {...register('points')} />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default EditarPosicion;
