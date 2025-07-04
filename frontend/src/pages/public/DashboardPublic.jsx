import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaFutbol, FaChartBar, FaClock, FaListUl, FaCalendarAlt } from 'react-icons/fa';
import '../../../styles/DashboardPublic.css';

function DashboardPublic() {
  const [torneo, setTorneo] = useState(null);
  const [partidoEnVivo, setPartidoEnVivo] = useState(null);
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
        const partidos = partidosRes.data;
        const now = new Date();

        const proximo = partidos.find(
          (p) => new Date(p.datetime) > now
        );
        setPartidoEnVivo(proximo || partidos[0] || null);

        if (torneoActual) {
          const tablaRes = await api.get(`public/standings/${torneoActual.id}/`);
          setTabla(tablaRes.data.slice(0, 3));
        }

        setProximos(partidos.filter((p) => new Date(p.datetime) > now).slice(0, 3));
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

  return (
    <div className="dashboard-public">
      {torneo && (
        <div>
          <h2><FaFutbol /> {torneo.name} ({new Date().getFullYear()})</h2>
        </div>
      )}

      <section>
        <h3><FaClock /> Partido en Vivo / Próximo Partido</h3>
        {partidoEnVivo ? (
          <div>
            <p>{partidoEnVivo.team_home_name} vs {partidoEnVivo.team_away_name}</p>
            <p>{new Date(partidoEnVivo.datetime).toLocaleString()}</p>
          </div>
        ) : (
          <p>No hay partidos en curso o próximos.</p>
        )}
      </section>

      <section>
        <h4><FaListUl /> Últimos Eventos del Partido</h4>
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

      <section>
        <h4><FaCalendarAlt /> Próximos Partidos</h4>
        <ul>
          {proximos.map((p) => (
            <li key={p.id}>
              {p.team_home_name} vs {p.team_away_name} -{' '}
              {new Date(p.datetime).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default DashboardPublic;
