import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';

const RecommendedSongs = ({ currentSongId }) => {
  const [recommended, setRecommended] = useState([]);
  const { playWithId } = useContext(PlayerContext);

  useEffect(() => {
    if (currentSongId) {
      axios
        .get(`http://localhost:4000/api/recommend/${currentSongId}`)
        .then(res => setRecommended(res.data))
        .catch(err => console.error('Recommendation error:', err));
    }
  }, [currentSongId]);

  const handlePlay = (songId) => {
    playWithId(songId);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
        Recommended Songs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recommended.map((song) => (
          <div
            key={song._id}
            onClick={() => handlePlay(song._id)}
            className="flex items-center gap-4 cursor-pointer bg-gray-800 rounded-lg p-4 hover:bg-green-600 transition duration-300"
            title={`Play ${song.name}`}
          >
            <img
              src={song.image}
              alt={song.name}
              className="w-20 h-20 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex flex-col overflow-hidden">
              <p className="text-white font-semibold text-lg truncate">{song.name}</p>
              <p className="text-gray-300 text-sm truncate">{song.album}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSongs;
