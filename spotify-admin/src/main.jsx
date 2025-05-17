import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SongMetadataProvider } from './context/SongMetadataContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SongMetadataProvider>
        <App />
      </SongMetadataProvider>
    </BrowserRouter>
  </StrictMode>
);
