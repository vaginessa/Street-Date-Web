import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'

//Providers
import { AOSProvider } from './States/AOS/AOS.tsx'
import { SessionProvider } from './States/Session/Session.tsx'
import { OnlineProvider } from './States/Online/Online.tsx'

//Other
import { ParticlesComponent } from './Components/ParticlesComponent/ParticlesComponent.tsx'

//Pages
import Register from './Pages/Register/Register.tsx'
import Login from './Pages/Login/Login.tsx'
import Try from './Pages/Try/Try.tsx'
import ProfileArea from './Components/ProfileArea/ProfileArea.tsx'
import Stats from './Pages/Stats/Stats.tsx'
import Games from './Pages/Stats/games/Games.tsx'

//Guards
import LoginGuardRoute from './Guards/LoginGuard/LoginGuard.tsx'
import ProtectedRoute from './Guards/ProtectedAreaGuard/ProtectedAreaGuard.tsx'
import Game from './Pages/Stats/games/Game/Game.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <OnlineProvider>

          <ParticlesComponent />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/versuchen' element={<LoginGuardRoute component={Try} />} />
            <Route path='/registrierung' element={<LoginGuardRoute component={Register} />} />
            <Route path='/anmelden' element={<LoginGuardRoute component={Login} />} />
            <Route path='/profilbereich' element={<ProtectedRoute component={ProfileArea} />} />
            <Route path='/statistiken/:publicId' element={<Stats />} />
            <Route path='/statistiken/:publicId/spiele/:page' element={<Games />} />
            <Route path='/statistiken/:publicId/spiele/:page/:game' element={<Game />} />
          </Routes>
        </OnlineProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
