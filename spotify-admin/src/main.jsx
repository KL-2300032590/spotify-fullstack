<<<<<<< HEAD
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SongMetadataProvider } from './context/SongMetadataContext';
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
>>>>>>> 1333d4642bea10e67118ad2c7e55d822be6fde0a

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <SongMetadataProvider>
        <App />
      </SongMetadataProvider>
    </BrowserRouter>
  </StrictMode>
);
=======
       <App />
    </BrowserRouter>
  </StrictMode>,
)
>>>>>>> 1333d4642bea10e67118ad2c7e55d822be6fde0a
