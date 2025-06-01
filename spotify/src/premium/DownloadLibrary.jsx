import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DownloadLibrary = () => {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    try {
      const res = await axios.get('https://antara-b.onrender.com/api/song/list'); // Adjust if your API path differs
      setSongs(res.data || []);
    } catch (err) {
      console.error('Error fetching songs', err);
    }
  };

  const handleDownload = async (songId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://antara-b.onrender.com/api/offline/save',
        { songId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Song downloaded successfully!');
    } catch (err) {
      console.error('Error downloading song', err);
      alert('Download failed.');
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 text-white">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Download Songs for Offline</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {songs.map((song) => (
          <div key={song._id} className="bg-gray-800 rounded p-4 shadow">
            <img src={song.image} alt={song.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{song.name}</h3>
            <p className="text-gray-400">{song.desc}</p>
            <button
              onClick={() => handleDownload(song._id)}
              className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadLibrary;
