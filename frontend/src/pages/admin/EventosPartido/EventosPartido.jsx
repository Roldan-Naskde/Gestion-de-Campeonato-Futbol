import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';

function EventosPartido() {
  const [matches, setMatches] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesRes, eventsRes] = await Promise.all([
          api.get('matches/'),
          api.get('match-events/')
        ]);
        setMatches(matchesRes.data);
        setEvents(eventsRes.data);
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
        setEvents(events.filter((e) => e.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatMinute = (minute) => {
    if (minute <= 45) {
      return `${minute}'`;
    } else if (minute <= 90) {
      return `${minute}'`;
    } else {
      return `90 + ${minute - 90}'`;
    }
  };



  return (
    <div>
      <h2>Eventos de los Torneos</h2>
      <Link to="/eventos-partido-admin/registrar">Registrar Evento</Link>

      {Array.from(new Set(matches.map(m => m.tournament_name))).map((torneo) => (
        <div key={torneo} style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
          <h3>{torneo}</h3>
          {Array.from(new Set(matches.filter(m => m.tournament_name === torneo).map(m => m.stage_name))).map((etapa) => (
            <div key={etapa} style={{ marginLeft: '20px' }}>
              <h4>Etapa: {etapa}</h4>
              {Array.from(new Set(matches.filter(m => m.tournament_name === torneo && m.stage_name === etapa).map(m => m.group_name))).map((grupo) => (
                <div key={grupo} style={{ marginLeft: '20px' }}>
                  <h5>Grupo: {grupo}</h5>
                  {matches
                    .filter(m => m.tournament_name === torneo && m.stage_name === etapa && m.group_name === grupo)
                    .map((match) => (
                      <div key={match.id} style={{ marginLeft: '20px', marginBottom: '10px' }}>
                        <strong>{match.team_home_name} vs {match.team_away_name}</strong> <br />
                        <span>Fecha: {new Date(match.datetime).toLocaleString()}</span>
                        <table border={1} style={{ width: '100%', marginTop: '5px' }}>
                          <thead>
                            <tr>
                              <th>Minuto</th>
                              <th>Tipo</th>
                              <th>Descripción</th>
                              <th>Jugador</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {events.filter(ev => ev.match === match.id).map(ev => (
                              <tr key={ev.id}>
                                <td>{formatMinute(ev.minute)}</td>
                                <td>{ev.event_type}</td>
                                <td>{ev.description}</td>
                                <td>{ev.player_name}</td>
                                <td>
                                  <Link to={`/eventos-partido-admin/editar/${ev.id}`}>Editar</Link>{' '}
                                  | <button onClick={() => eliminarEvento(ev.id)}>Eliminar</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default EventosPartido;
