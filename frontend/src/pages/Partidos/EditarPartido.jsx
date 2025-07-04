import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarPartido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const [equipos, setEquipos] = useState([]);
  const [estadios, setEstadios] = useState([]);
  const [arbitros, setArbitros] = useState([]);

useEffect(() => {
  Promise.all([
    api.get(`matches/${id}/`),
    api.get('teams/'),
    api.get('venues/'),
    api.get('referees/')
  ]).then(([matchRes, teamsRes, venuesRes, refereesRes]) => {
    const partido = matchRes.data;
    // Convertir la fecha correctamente para datetime-local
    const fecha = new Date(partido.datetime);
    const fechaLocal = fecha.toISOString().slice(0, 16);  // yyyy-MM-ddTHH:mm
    partido.datetime = fechaLocal;

    reset(partido);
    setEquipos(teamsRes.data);
    setEstadios(venuesRes.data);
    setArbitros(refereesRes.data);
  });
}, [id, reset]);


  const onSubmit = async (data) => {
    await api.put(`matches/${id}/`, data);
    navigate('/partidos');
  };

  return (
    <div>
      <h2>Editar Partido</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Fecha y Hora</label>
          <input type="datetime-local" {...register('datetime', { required: true })} />
        </div>
        <div>
          <label>Equipo Local</label>
          <select {...register('team_home', { required: true })}>
            <option value="">Seleccione</option>
            {equipos.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>
        <div>
          <label>Equipo Visitante</label>
          <select {...register('team_away', { required: true })}>
            <option value="">Seleccione</option>
            {equipos.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>
        <div>
          <label>Estadio</label>
          <select {...register('venue', { required: true })}>
            <option value="">Seleccione</option>
            {estadios.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </div>
        <div>
          <label>Árbitro (opcional)</label>
          <select {...register('referee')}>
            <option value="">Sin árbitro</option>
            {arbitros.map(a => <option key={a.id} value={a.id}>{a.first_name} {a.last_name}</option>)}
          </select>
        </div>
        <div>
          <label>Marcador Local</label>
          <input type="number" {...register('home_score', { required: true })} />
        </div>
        <div>
          <label>Marcador Visitante</label>
          <input type="number" {...register('away_score', { required: true })} />
        </div>
        <button type="submit">Actualizar Partido</button>
      </form>
    </div>
  );
}

export default EditarPartido;
