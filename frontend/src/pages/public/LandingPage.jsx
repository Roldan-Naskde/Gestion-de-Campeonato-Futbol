import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { FaFutbol } from 'react-icons/fa';
import '../../../styles/LandingPage.css';

function LandingPage() {
  const [torneo, setTorneo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const res = await api.get('public/tournaments/');
        setTorneo(res.data[0]);  // Primer torneo (puedes cambiar si quieres otro)
      } catch (error) {
        console.error(error);
      }
    };
    fetchTorneo();
  }, []);

  const handleRedirect = () => {
    const token = localStorage.getItem('access');
    console.log('TOKEN:', token);
    if (token) {
      navigate('/dashboard');  // Admin
    } else {
      navigate('/dashboard-Public');  // Torneos Públicos (para evitar que se quede en la misma página)
    }
  };

  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="landing-content">
          <h1><FaFutbol /> Campeonato de Fulbito</h1>
          {torneo && <h2>{torneo.name}</h2>}
          <p>¡Bienvenido al campeonato oficial de fulbito!</p>
          <button className="btn" onClick={handleRedirect}>
            Ingresar al Sistema
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
