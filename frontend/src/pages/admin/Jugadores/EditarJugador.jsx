
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

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
      const jugador = jugadorRes.data;
      jugador.birth_date = new Date(jugador.birth_date).getFullYear(); // Convertir fecha a año
      reset(jugadorRes.data);
      setEquipos(equiposRes.data);
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    data.birth_date = `${data.birth_date}-01-01`;
    await api.put(`players/${id}/`, data);
    navigate('/jugadores-admin');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Editar Jugador</h2>
      <div>
        <label>Nombre</label>
        <input {...register('first_name', 
          { required: 'Campo obligatorio',
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Solo se permiten letras y espacios'
            }
           })} />
      </div>
      <div>
        <label>Apellido</label>
        <input {...register('last_name', 
          { required: 'Campo obligatorio',
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: 'Solo se permiten letras y espacios'
            }
           })} />
      </div>
      <div>
        <label>Fecha de Nacimiento</label>
        <input 
        type="number"
        min= "1950"
        max= "2100"
        {...register('birth_date', 
        { required: 'Campo obligatorio',
          min: { value: 1950, message: 'El año debe ser como mínimo 1950'},
          max: { value: 2100, message: 'El año debe ser como máximo 2100'}
         })} />
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
