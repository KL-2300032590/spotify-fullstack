import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Offline = () => {
  const [offlineMode, setOfflineMode] = useState(false);
  const [downloads, setDownloads] = useState([]);

  const toggleOfflineMode = () => setOfflineMode(!offlineMode);

  const fetchDownloads = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://antara-b.onrender.com/api/offline/list', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.downloads)
        ? res.data.downloads
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setDownloads(data);
    } catch (err) {
      console.error("Error fetching offline songs", err);
      setDownloads([]);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 text-white bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-red-500">Offline Listening</h2>

      <div className="flex items-center justify-between mb-6">
        <p className="text-lg">Offline Mode</p>
        <button
          onClick={toggleOfflineMode}
          className={`px-4 py-2 rounded-full font-semibold ${offlineMode ? 'bg-green-600' : 'bg-gray-700'}`}
        >
          {offlineMode ? 'Enabled' : 'Disabled'}
        </button>
        <Link to="/download-library" className="text-white hover:text-red-400">
      Download Songs
    </Link>
      </div>

      {downloads.length === 0 ? (
        <p className="text-gray-400">No songs downloaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {downloads.map((song) => (
            <div key={song._id} className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
              <img
                src={song.songData?.image}
                alt={song.songData?.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold text-white">{song.songData?.name}</h3>
              <p className="text-sm text-gray-400">{song.songData?.desc || 'Unknown Artist'}</p>
              <div className="text-sm text-gray-500 mt-2">
                <p>Album: {song.songData?.album || 'N/A'}</p>
                <p>Duration: {song.songData?.duration || 'N/A'}</p>
                <p>Downloaded: {new Date(song.savedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={fetchDownloads}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold"
        >
          Refresh Downloads
        </button>
      </div>
    </div>
  );
};

export default Offline;
