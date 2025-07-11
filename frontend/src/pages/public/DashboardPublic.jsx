import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaFutbol, FaChartBar, FaClock, FaListUl, FaCalendarAlt } from 'react-icons/fa';
import '../../../styles/DashboardPublic.css';

function DashboardPublic() {
  const [torneo, setTorneo] = useState(null);
  const [partidos, setPartidos] = useState([]);
  const [tabla, setTabla] = useState([]);
  const [proximos, setProximos] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const torneosRes = await api.get('public/tournaments/');
        const torneoActual = torneosRes.data[0];
        setTorneo(torneoActual);

        const partidosRes = await api.get('matches/');
        setPartidos(partidosRes.data);

        if (torneoActual) {
          const tablaRes = await api.get(`public/standings/${torneoActual.id}/`);
          setTabla(tablaRes.data.slice(0, 3));
        }

        const now = new Date();
        setProximos(partidosRes.data.filter(p => new Date(p.datetime) > now).slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get('match-events/');
        setEventos(res.data.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Detecta partidos en curso
  const partidosEnCurso = partidos.filter(p => {
    const start = new Date(p.datetime);
    const now = new Date();
    const end = new Date(start.getTime() + 105 * 60000); // 90 min + tiempo extra
    return now >= start && now <= end;
  });

  // Calcula minuto actual
  const calcularMinuto = (match) => {
    const now = new Date();
    const start = new Date(match.datetime);
    const diff = Math.floor((now - start) / 60000);
    return diff >= 0 ? `${diff}'` : "0'";
  };

  return (
    <div className="dashboard-public">
      {torneo && (
        <div>
          <h2><FaFutbol /> {torneo.name} ({new Date().getFullYear()})</h2>
        </div>
      )}

      {/* ✅ Partidos en Vivo */}
      <section>
        <h3>Partidos en Vivo</h3>
        {partidosEnCurso.length > 0 ? (
          partidosEnCurso.map((match) => (
            <div key={match.id} className="barra-vivo">
              {match.team_home_name} {match.home_score} - {match.away_score} {match.team_away_name}<br />
              Minuto: {calcularMinuto(match)}
            </div>
          ))
        ) : (
          <p>No hay partidos en vivo actualmente.</p>
        )}
      </section>

      <section>
        <h3><FaClock /> Partido Próximo</h3>
        {proximos.length > 0 ? (
          proximos.map(p => (
            <div key={p.id}>
              <p>{p.team_home_name} vs {p.team_away_name}</p>
              <p>{new Date(p.datetime).toLocaleString()}</p>
            </div>
          ))
        ) : <p>No hay partidos próximos.</p>}
      </section>

      <section>
        <h4><FaListUl /> Últimos Eventos</h4>
        <ul>
          {eventos.map((e) => (
            <li key={e.id}>
              {e.description} - Min {e.minute}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4><FaChartBar /> Tabla de Posiciones (Top 3)</h4>
        <ul>
          {tabla.map((t, index) => (
            <li key={index}>
              {t.team_name}: {t.points} pts
            </li>
          ))}
        </ul>
        <Link to="/torneos">Ver tabla completa</Link>
      </section>
    </div>
  );
}

export default DashboardPublic;
