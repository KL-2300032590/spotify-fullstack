import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';

const RecommendedSongs = ({ currentSongId }) => {
  const [recommended, setRecommended] = useState([]);
  const { playWithId } = useContext(PlayerContext);

  useEffect(() => {
    if (currentSongId) {
      axios
        .get(`https://spotify-backend1.onrender.com/api/recommend/${currentSongId}`)
        .then(res => setRecommended(res.data))
        .catch(err => console.error('Recommendation error:', err));
    }
  }, [currentSongId]);

  const handlePlay = (songId) => {
    playWithId(songId);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Recommended Songs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {recommended.map((song) => (
          <div
            key={song._id}
            className="cursor-pointer hover:bg-gray-800 p-2 rounded"
            onClick={() => handlePlay(song._id)}
          >
            <img
              src={song.image}
              alt={song.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <p className="text-white font-semibold text-sm truncate">{song.name}</p>
            <p className="text-gray-400 text-xs truncate">{song.album}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSongs;
