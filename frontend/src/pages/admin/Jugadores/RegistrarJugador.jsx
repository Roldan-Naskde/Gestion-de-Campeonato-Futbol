import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

function RegistrarJugador() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resEquipos = await api.get('teams/');
        const resJugadores = await api.get('players/');
        setEquipos(resEquipos.data);
        setJugadores(resJugadores.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDatos();
  }, []);

  const onSubmit = async (data) => {
    const nombreCompleto = `${data.first_name.trim().toLowerCase()} ${data.last_name.trim().toLowerCase()}`;
    const equipoId = data.team;

    const jugadorExiste = jugadores.some(j =>
      `${j.first_name.trim().toLowerCase()} ${j.last_name.trim().toLowerCase()}` === nombreCompleto &&
      String(j.team) === String(equipoId)
    );

    if (jugadorExiste) {
      alert('Este jugador ya está registrado en este equipo.');
      return;
    }

    try {
      await api.post('players/', data);
      alert('Jugador registrado correctamente');
      reset();
      navigate('/jugadores-admin');
    } catch (error) {
      console.error(error);
      alert('Error al registrar jugador');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registrar Nuevo Jugador</h2>
      <div>
        <label>Nombre</label>
        <input
          {...register('first_name', {
            required: 'Campo obligatorio',
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Solo se permiten letras y espacios',
            },
          })}
        />
        {errors.first_name && <span>{errors.first_name.message}</span>}
      </div>
      <div>
        <label>Apellido</label>
        <input
          {...register('last_name', {
            required: 'Campo obligatorio',
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Solo se permiten letras y espacios',
            },
          })}
        />
        {errors.last_name && <span>{errors.last_name.message}</span>}
      </div>
      <div>
        <label>Fecha de Nacimiento</label>
        <input type="number" {...register('birth_date', { required: 'Campo obligatorio' })} />
        {errors.birth_date && <span>{errors.birth_date.message}</span>}
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
        {errors.position && <span>{errors.position.message}</span>}
      </div>
      <div>
        <label>Equipo</label>
        <select {...register('team', { required: 'Campo obligatorio' })}>
          <option value="">Seleccione</option>
          {equipos.map(equipo => (
            <option key={equipo.id} value={equipo.id}>{equipo.name}</option>
          ))}
        </select>
        {errors.team && <span>{errors.team.message}</span>}
      </div>
      <button type="submit">Registrar Jugador</button>
    </form>
  );
}

export default RegistrarJugador;
