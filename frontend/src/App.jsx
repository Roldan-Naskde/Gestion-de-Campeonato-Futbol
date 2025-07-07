import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import LandingPage from './pages/public/LandingPage';

// Páginas públicas (solo tablas, visibles para todos)
import TorneoDetalle from './pages/public/TorneoDetalle/TorneoDetalle';
import TablaPosicionesPublic from './pages/Public/TorneoDetalle/TablaPosicionesPublic';
import EquiposPublic from './pages/Public/TorneoDetalle/EquiposPublic';
import EtapasPublic from './pages/Public/TorneoDetalle/EtapasPublic';
import GruposPublic from './pages/Public/TorneoDetalle/GruposPublic';
import JugadoresPublic from './pages/Public/TorneoDetalle/JugadoresPublic';
import SedesPublic from './pages/Public/TorneoDetalle/SedesPublic';
import PartidosPublic from './pages/Public/TorneoDetalle/PartidosPublic';
import Calendario from './pages/Public/TorneoDetalle/Calendario';
import TorneosPublic from './pages/Public/TorneosPublic';
import DashboardPublic from './pages/public/DashboardPublic';

// Admin (requiere login)
import Dashboard from './pages/admin/Dashboard';
import Referees from './pages/admin/Arbitros/Referees';
import RegistrarReferee from './pages/admin/Arbitros/RegistrarReferee';
import EditarReferee from './pages/admin/Arbitros/EditarReferee';
import Equipos from './pages/admin/Equipos/Equipos';
import RegistrarEquipo from './pages/admin/Equipos/RegistrarEquipo';
import EditarEquipo from './pages/admin/Equipos/EditarEquipo';
import Stages from './pages/admin/Etapas/Stages';
import RegistrarStage from './pages/admin/Etapas/RegistrarStage';
import EditarStage from './pages/admin/Etapas/EditarStage';
import EventosPartido from './pages/admin/EventosPartido/EventosPartido';
import RegistrarEvento from './pages/admin/EventosPartido/RegistrarEvento';
import EditarEvento from './pages/admin/EventosPartido/EditarEvento';
import Grupos from './pages/admin/Grupos/Grupos';
import RegistrarGrupo from './pages/admin/Grupos/RegistrarGrupo';
import EditarGrupo from './pages/admin/Grupos/EditarGrupo';
import Jugadores from './pages/admin/Jugadores/Jugadores';
import RegistrarJugador from './pages/admin/Jugadores/RegistrarJugador';
import EditarJugador from './pages/admin/Jugadores/EditarJugador';
import Partidos from './pages/admin/Partidos/Partidos';
import RegistrarPartido from './pages/admin/Partidos/RegistrarPartido';
import EditarPartido from './pages/admin/Partidos/EditarPartido';
import Venues from './pages/admin/Sedes/Venues';
import RegistrarVenue from './pages/admin/Sedes/RegistrarVenue';
import EditarVenue from './pages/admin/Sedes/EditarVenue';
import TablaPosiciones from './pages/admin/TablaPosiciones/TablaPosiciones';
import RegistrarPosicion from './pages/admin/TablaPosiciones/RegistrarPosicion';
import EditarPosicion from './pages/admin/TablaPosiciones/EditarPosicion';
import Torneo from './pages/admin/Torneos/Torneo';
import RegistarTorneo from './pages/admin/Torneos/RegistrarTorneo';
import EditTorneo from './pages/admin/Torneos/EditarTorneo';

function App() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          {/* Página de inicio */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/torneos" element={<TorneosPublic />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/dashboard-public" element={<DashboardPublic />} />


          {/* Rutas anidadas por torneo */}
          <Route path="/torneos/:torneoId" element={<TorneoDetalle />}>
            <Route path="tabla-posiciones" element={<TablaPosicionesPublic />} />
            <Route path="equipos" element={<EquiposPublic />} />
            <Route path="etapas" element={<EtapasPublic />} />
            <Route path="grupos" element={<GruposPublic />} />
            <Route path="jugadores" element={<JugadoresPublic />} />
            <Route path="sedes" element={<SedesPublic />} />
            <Route path="partidos" element={<PartidosPublic />} />
            <Route path="calendario" element={<Calendario />} />
          </Route>


          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas privadas - requiere autenticación */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/torneos-admin" element={<PrivateRoute><Torneo /></PrivateRoute>} />
          <Route path="/torneos-admin/editar/:id" element={<PrivateRoute><EditTorneo /></PrivateRoute>} />
          <Route path="/torneos-admin/registrar" element={<PrivateRoute><RegistarTorneo /></PrivateRoute>} />

          <Route path="/equipos-admin" element={<PrivateRoute><Equipos /></PrivateRoute>} />
          <Route path="/equipos-admin/registrar" element={<PrivateRoute><RegistrarEquipo /></PrivateRoute>} />
          <Route path="/equipos-admin/editar/:id" element={<PrivateRoute><EditarEquipo /></PrivateRoute>} />

          <Route path="/jugadores-admin" element={<PrivateRoute><Jugadores /></PrivateRoute>} />
          <Route path="/jugadores-admin/registrar" element={<PrivateRoute><RegistrarJugador /></PrivateRoute>} />
          <Route path="/jugadores-admin/editar/:id" element={<PrivateRoute><EditarJugador /></PrivateRoute>} />

          <Route path="/partidos-admin" element={<PrivateRoute><Partidos /></PrivateRoute>} />
          <Route path="/partidos-admin/registrar" element={<PrivateRoute><RegistrarPartido /></PrivateRoute>} />
          <Route path="/partidos-admin/editar/:id" element={<PrivateRoute><EditarPartido /></PrivateRoute>} />

          <Route path="/stages-admin" element={<PrivateRoute><Stages /></PrivateRoute>} />
          <Route path="/stages-admin/registrar" element={<PrivateRoute><RegistrarStage /></PrivateRoute>} />
          <Route path="/stages-admin/editar/:id" element={<PrivateRoute><EditarStage /></PrivateRoute>} />

          <Route path="/grupos-admin" element={<PrivateRoute><Grupos /></PrivateRoute>} />
          <Route path="/grupos-admin/registrar" element={<PrivateRoute><RegistrarGrupo /></PrivateRoute>} />
          <Route path="/grupos-admin/editar/:id" element={<PrivateRoute><EditarGrupo /></PrivateRoute>} />

          <Route path="/venues-admin" element={<PrivateRoute><Venues /></PrivateRoute>} />
          <Route path="/venues-admin/registrar" element={<PrivateRoute><RegistrarVenue /></PrivateRoute>} />
          <Route path="/venues-admin/editar/:id" element={<PrivateRoute><EditarVenue /></PrivateRoute>} />

          <Route path="/referees-admin" element={<PrivateRoute><Referees /></PrivateRoute>} />
          <Route path="/referees-admin/registrar" element={<PrivateRoute><RegistrarReferee /></PrivateRoute>} />
          <Route path="/referees-admin/editar/:id" element={<PrivateRoute><EditarReferee /></PrivateRoute>} />

          <Route path="/tabla-posiciones-admin" element={<PrivateRoute><TablaPosiciones /></PrivateRoute>} />
          <Route path="/tabla-posiciones-admin/registrar" element={<PrivateRoute><RegistrarPosicion /></PrivateRoute>} />
          <Route path="/tabla-posiciones-admin/editar/:id" element={<PrivateRoute><EditarPosicion /></PrivateRoute>} />

          <Route path="/eventos-partido-admin" element={<PrivateRoute><EventosPartido /></PrivateRoute>} />
          <Route path="/eventos-partido-admin/registrar" element={<PrivateRoute><RegistrarEvento /></PrivateRoute>} />
          <Route path="/eventos-partido-admin/editar/:id" element={<PrivateRoute><EditarEvento /></PrivateRoute>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
