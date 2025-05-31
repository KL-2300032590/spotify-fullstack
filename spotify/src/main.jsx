import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import PlayerContextProvider from './context/PlayerContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx'; // ✅ use routes instead of direct App
import { AuthProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <PlayerContextProvider>
        <AppRoutes /> {/* ✅ handles routing, auth, premium */}
      </PlayerContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
