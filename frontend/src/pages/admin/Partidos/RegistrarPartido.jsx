import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarPartido() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [venues, setVenues] = useState([]);
  const [referees, setReferees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [teamsRes, venuesRes, refereesRes] = await Promise.all([
        api.get('teams/'),
        api.get('venues/'),
        api.get('referees/')
      ]);
      setTeams(teamsRes.data);
      setVenues(venuesRes.data);
      setReferees(refereesRes.data);
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
          <label>Fecha y Hora:</label>
          <input type="datetime-local" {...register('datetime', { required: true })} />
        </div>
        <div>
          <label>Equipo Local:</label>
          <select {...register('team_home', { required: true })}>
            <option value="">Seleccione</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Equipo Visitante:</label>
          <select {...register('team_away', { required: true })}>
            <option value="">Seleccione</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Estadio:</label>
          <select {...register('venue', { required: true })}>
            <option value="">Seleccione</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Árbitro:</label>
          <select {...register('referee')}>
            <option value="">Seleccione (opcional)</option>
            {referees.map(ref => (
              <option key={ref.id} value={ref.id}>
                {ref.first_name} {ref.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Marcador Local:</label>
          <input type="number" {...register('home_score')} min={0} />
        </div>
        <div>
          <label>Marcador Visitante:</label>
          <input type="number" {...register('away_score')} min={0} />
        </div>
        <button type="submit">Registrar Partido</button>
      </form>
    </div>
  );
}

export default RegistrarPartido;
