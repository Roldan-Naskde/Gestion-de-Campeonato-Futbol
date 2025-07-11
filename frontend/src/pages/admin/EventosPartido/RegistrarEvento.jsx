import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarEvento() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [partidos, setPartidos] = useState([]);
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [matchesRes, playersRes] = await Promise.all([
        api.get('matches/'),
        api.get('players/')
      ]);
      setPartidos(matchesRes.data);
      setJugadores(playersRes.data);
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('match-events/', data);
      navigate('/eventos-partido-admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registrar Evento del Partido</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Minuto</label>
          <input type="number" 
          min="1" 
          max="150"
          {...register('minute', 
          { required: true, min: 1, max: 150 })} />
        </div>
        <div>
          <label>Tipo de Evento</label>
          <select {...register('event_type', { required: true })}>
            <option value="">Seleccione</option>
            <option value="GOAL">Gol</option>
            <option value="YELLOW">Tarjeta Amarilla</option>
            <option value="RED">Tarjeta Roja</option>
            <option value="FOUL">Falta</option>
            <option value="SUB">Sustitución</option>
            <option value="PEN">Penal</option>
            <option value="OFFSIDE">Fuera de Juego</option>
            <option value="CORNER">Tiro de Esquina</option>
            <option value="FREEKICK">Tiro Libre</option>
          </select>
        </div>
        <div>
          <label>Descripción</label>
          <input {...register('description')} />
        </div>
        <div>
          <label>Partido</label>
          <select {...register('match', { required: true })}>
            <option value="">Seleccione</option>
            {partidos.map((p) => (
              <option key={p.id} value={p.id}
              >{p.team_home_name} vs {p.team_away_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Jugador</label>
          <select {...register('player', { required: true })}>
            <option value="">Seleccione</option>
            {jugadores.map((j) => (
              <option key={j.id} value={j.id}>
                {j.first_name} {j.last_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistrarEvento;
