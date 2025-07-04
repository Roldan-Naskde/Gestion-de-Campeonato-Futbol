import { useForm } from 'react-hook-form';
import api from '../../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
          <input {...register('name', { required: true })} />
        </div>

        <div>
          <label>Nombre del Entrenador</label>
          <input {...register('coach_name', { required: true })} />
        </div>

        <div>
          <label>Fecha de Fundación</label>
          <input type="date" {...register('founded', { required: true })} />
        </div>

        <div>
          <label>Grupo</label>
          <select {...register('group', { required: true })}>
            <option value="">Seleccione un grupo</option>
            {grupos.map((grupo) => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.name}
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
