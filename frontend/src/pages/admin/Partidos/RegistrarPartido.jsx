
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarPartido() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [equipos, setEquipos] = useState([]);
  const [estadios, setEstadios] = useState([]);
  const [arbitros, setArbitros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equiposRes, estadiosRes, arbitrosRes] = await Promise.all([
          api.get('teams/'),
          api.get('venues/'),
          api.get('referees/'),
        ]);
        setEquipos(equiposRes.data);
        setEstadios(estadiosRes.data);
        setArbitros(arbitrosRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('matches/', data);
      navigate('/partidos-admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registrar Partido</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Fecha y Hora</label>
          <input type="datetime-local" {...register('datetime', { required: true })} />
        </div>

        <div>
          <label>Equipo Local</label>
          <select {...register('team_home', { required: true })}>
            <option value="">Seleccione un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Equipo Visitante</label>
          <select {...register('team_away', { required: true })}>
            <option value="">Seleccione un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Estadio</label>
          <select {...register('venue', { required: true })}>
            <option value="">Seleccione un estadio</option>
            {estadios.map((estadio) => (
              <option key={estadio.id} value={estadio.id}>
                {estadio.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Árbitro (opcional)</label>
          <select {...register('referee')}>
            <option value="">Sin árbitro</option>
            {arbitros.map((arbitro) => (
              <option key={arbitro.id} value={arbitro.id}>
                {arbitro.first_name} {arbitro.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Marcador Local</label>
          <input type="number" {...register('home_score', { required: true })} min="0" />
        </div>

        <div>
          <label>Marcador Visitante</label>
          <input type="number" {...register('away_score', { required: true })} min="0" />
        </div>

        <button type="submit">Registrar Partido</button>
      </form>
    </div>
  );
}

export default RegistrarPartido;
