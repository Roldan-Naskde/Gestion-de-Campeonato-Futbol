import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import { useEffect, useState } from 'react';

function RegistrarJugador() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    api.get('teams/').then(res => setEquipos(res.data));
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('players/', data);
      alert('Jugador registrado');
      reset();
    } catch (error) {
      console.error(error);
      alert('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registrar Nuevo Jugador</h2>
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
          {equipos.map(equipo => (
            <option key={equipo.id} value={equipo.id}>{equipo.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Registrar Jugador</button>
    </form>
  );
}

export default RegistrarJugador;
