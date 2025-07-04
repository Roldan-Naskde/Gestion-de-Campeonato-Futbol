import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

function EventosPartido() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('match-events/');
        setEventos(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const eliminarEvento = async (id) => {
    if (confirm('¿Eliminar evento?')) {
      try {
        await api.delete(`match-events/${id}/`);
        setEventos(eventos.filter((e) => e.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Listado de Eventos de Partido</h2>
      <Link to="/eventos-partido/registrar">Registrar Evento</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Minuto</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Partido</th>
            <th>Jugador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.id}</td>
              <td>{evento.minute}</td>
              <td>{evento.event_type}</td>
              <td>{evento.description}</td>
              <td>{evento.match}</td>
              <td>{evento.player}</td>
              <td>
                <Link to={`/eventos-partido/editar/${evento.id}`}>Editar</Link> |{' '}
                <button onClick={() => eliminarEvento(evento.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventosPartido;
