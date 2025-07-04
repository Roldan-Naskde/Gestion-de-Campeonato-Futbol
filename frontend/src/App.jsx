import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
//tornament pages
import Torneo from './pages/Torneos/Torneo';
import RegistarTorneo from './pages/Torneos/RegistrarTorneo';
import EditTorneo from './pages/Torneos/EditarTorneo';
//equipo pages
import Equipos from './pages/Equipos/Equipos';
import EditarEquipo from './pages/Equipos/EditarEquipo';
import RegistrarEquipo from './pages/Equipos/RegistrarEquipo';
//jugador pages
import Jugadores from './pages/Jugadores/Jugadores';
import RegistrarJugador from './pages/Jugadores/RegistrarJugador';
import EditarJugador from './pages/Jugadores/EditarJugador';
//partido pages
import Partidos from './pages/Partidos/Partidos';
import RegistrarPartido from './pages/Partidos/RegistrarPartido';
import EditarPartido from './pages/Partidos/EditarPartido';
//stage pages
import Stages from './pages/Etapas/Stages';
import RegistrarStage from './pages/Etapas/RegistrarStage';
import EditarStage from './pages/Etapas/EditarStage';
//grupos pages
import Grupos from './pages/Grupos/Grupos';
import RegistrarGrupo from './pages/Grupos/RegistrarGrupo';
import EditarGrupo from './pages/Grupos/EditarGrupo';
//sedes pages
import Venues from './pages/Sedes/Venues';
import RegistrarVenue from './pages/Sedes/RegistrarVenue';
import EditarVenue from './pages/Sedes/EditarVenue';
//arbitros pages
import Referees from './pages/Arbitros/Referees';
import RegistrarReferee from './pages/Arbitros/RegistrarReferee';
import EditarReferee from './pages/Arbitros/EditarReferee';
//eventos partido pages
import EventosPartido from './pages/EventosPartido/EventosPartido';
import RegistrarEvento from './pages/EventosPartido/RegistrarEvento';
import EditarEvento from './pages/EventosPartido/EditarEvento';
//tabla posiciones pages
import TablaPosiciones from './pages/TablaPosiciones/TablaPosiciones';
import RegistrarPosicion from './pages/TablaPosiciones/RegistrarPosicion';
import EditarPosicion from './pages/TablaPosiciones/EditarPosicion';


import Calendario from './pages/Calendario';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/calendario" element={<Calendario />} />

          <Route path="/login" element={<Login />} />



          <Route path="/tabla-posiciones" element={<TablaPosiciones />} />
          <Route path="/tabla-posiciones/registrar" element={<RegistrarPosicion />} />
          <Route path="/tabla-posiciones/editar/:id" element={<EditarPosicion />} />

          <Route path="/eventos-partido" element={<EventosPartido />} />
          <Route path="/eventos-partido/registrar" element={<RegistrarEvento />} />
          <Route path="/eventos-partido/editar/:id" element={<EditarEvento />} />

          <Route path="/torneos" element={<Torneo />} />
          <Route path="/torneos/editar/:id" element={<EditTorneo />} />
          <Route path="/torneos/registrar" element={<RegistarTorneo />} />

          <Route path="/equipos" element={<Equipos />} />
          <Route path="/equipos/registrar" element={<RegistrarEquipo />} />
          <Route path="/equipos/editar/:id" element={<EditarEquipo />} />

          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/jugadores/registrar" element={<RegistrarJugador />} />
          <Route path="/jugadores/editar/:id" element={<EditarJugador />} />

          <Route path="/partidos" element={<Partidos />} />
          <Route path="/partidos/registrar" element={<RegistrarPartido />} />
          <Route path="/partidos/editar/:id" element={<EditarPartido />} />

          <Route path="/stages" element={<Stages />} />
          <Route path="/stages/registrar" element={<RegistrarStage />} />
          <Route path="/stages/editar/:id" element={<EditarStage />} />

          <Route path="/grupos" element={<Grupos />} />
          <Route path="/grupos/registrar" element={<RegistrarGrupo />} />
          <Route path="/grupos/editar/:id" element={<EditarGrupo />} />

          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/registrar" element={<RegistrarVenue />} />
          <Route path="/venues/editar/:id" element={<EditarVenue />} />

          <Route path="/referees" element={<Referees />} />
          <Route path="/referees/registrar" element={<RegistrarReferee />} />
          <Route path="/referees/editar/:id" element={<EditarReferee />} />




        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;