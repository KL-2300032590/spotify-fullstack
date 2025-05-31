import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import App from '../App';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Premium from '../pages/Premium';
import UserProfile from '../pages/UserProfile';
import Offline from '../premium/Offline';
import Visualizer from '../premium/Visualizer';
import LLMPlaylists from '../premium/LLMPlaylists';
import VideoVault from '../premium/VideoVault';
import BetaZone from '../premium/BetaZone';
import Themes from '../premium/Themes';
import DownloadLibrary from '../premium/DownloadLibrary';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      <Route path="/premium/offline" element={<Offline />} />
      <Route path="/premium/visualizer" element={<Visualizer />} />
      <Route path="/premium/llm-playlists" element={<LLMPlaylists />} />
      <Route path="/premium/video-vault" element={<VideoVault />} />
      <Route path="/premium/beta-zone" element={<BetaZone />} />
      <Route path="/premium/themes" element={<Themes />} />
      <Route path="/download-library" element={<DownloadLibrary />} />




      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
