import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import './../../../../styles/quiposadmin.css';

function EditarEquipo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equipoRes, gruposRes] = await Promise.all([
          api.get(`teams/${id}/`),
          api.get('groups/'),
        ]);
        reset(equipoRes.data);
        setGrupos(gruposRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`teams/${id}/`, data);
      navigate('/equipos-admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Editar Equipo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre del Equipo</label>
          <input {...register('name',
            { required: 'Campo Obligatorio',
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: 'El nombre solo puede contener letras y espacios',
              },
            })} />
        </div>

        <div>
          <label>Nombre del Entrenador</label>
          <input {...register('coach_name',
            { required: 'Campo Obligatorio',
              pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: 'El nombre solo puede contener letras y espacios',
              },
            })} />
        </div>

        <div>
          <label>Año de Fundación</label>
          <input
            type="number"
            min="1800"
            max="2100"
            {...register('founded', { required: 'Este campo es obligatorio' })}
          />
        </div>

        <div>
          <label>Grupo</label>
          <select {...register('group', { required: true })}>
            <option value="">Seleccione un grupo</option>
            {grupos.map((grupo) => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.name} - {grupo.stage_name}
              </option>
            ))}
          </select>
        </div>

        {/* Logo opcional */}
        <div>
          <label>Logo (opcional)</label>
          <input {...register('logo')} placeholder="URL del logo o vacío" />
        </div>

        <button type="submit">Actualizar Equipo</button>
      </form>
    </div>
  );
}

export default EditarEquipo;
