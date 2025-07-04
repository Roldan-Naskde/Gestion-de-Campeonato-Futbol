import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [partidos, setPartidos] = useState([]);
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [eventoRes, matchesRes, playersRes] = await Promise.all([
        api.get(`match-events/${id}/`),
        api.get('matches/'),
        api.get('players/')
      ]);
      reset(eventoRes.data);
      setPartidos(matchesRes.data);
      setJugadores(playersRes.data);
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`match-events/${id}/`, data);
      navigate('/eventos-partido');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Editar Evento del Partido</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Minuto</label>
          <input type="number" {...register('minute', { required: true })} />
        </div>
        <div>
          <label>Tipo de Evento</label>
          <input {...register('event_type', { required: true })} />
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
              <option key={p.id} value={p.id}>{p.id}</option>
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
        <button type="submit">Actualizar Evento</button>
      </form>
    </div>
  );
}

export default EditarEvento;
