import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarJugador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [jugadorRes, equiposRes] = await Promise.all([
        api.get(`players/${id}/`),
        api.get('teams/'),
      ]);
      reset(jugadorRes.data);
      setEquipos(equiposRes.data);
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    await api.put(`players/${id}/`, data);
    navigate('/jugadores');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Editar Jugador</h2>
      <div>
        <label>Nombre</label>
        <input {...register('first_name', { required: 'Campo obligatorio' })} />
      </div>
      <div>
        <label>Apellido</label>
        <input {...register('last_name', { required: 'Campo obligatorio' })} />
      </div>
      <div>
        <label>Fecha de Nacimiento</label>
        <input type="date" {...register('birth_date', { required: 'Campo obligatorio' })} />
      </div>
      <div>
        <label>Posición</label>
        <select {...register('position', { required: 'Campo obligatorio' })}>
          <option value="">Seleccione</option>
          <option value="FW">Delantero</option>
          <option value="MID">Centrocampista</option>
          <option value="DEF">Defensa</option>
          <option value="GK">Portero</option>
        </select>
      </div>
      <div>
        <label>Equipo</label>
        <select {...register('team', { required: 'Campo obligatorio' })}>
          <option value="">Seleccione</option>
          {equipos.map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Actualizar Jugador</button>
    </form>
  );
}

export default EditarJugador;
