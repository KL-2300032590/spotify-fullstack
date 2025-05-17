import React, { useState } from 'react';
import axios from 'axios';

const FetchFromAPI = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFromiTunes = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`);
      setResults(response.data.results);
    } catch (error) {
      console.error('API Fetch Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-md w-[90%] max-w-xl mx-auto text-gray-800">
      <h2 className="text-xl font-semibold mb-4">Fetch Song Metadata</h2>
      <input
        type="text"
        value={query}
        placeholder="Enter song or artist name"
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border mb-2"
      />
      <button
        onClick={fetchFromiTunes}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Fetch
      </button>

      {loading ? <p className="mt-4">Loading...</p> : null}

      <div className="mt-4">
        {results.map((item) => (
          <div key={item.trackId} className="mb-4 border-b pb-2">
            <img src={item.artworkUrl100} alt="cover" className="w-20 h-20 object-cover" />
            <p className="font-bold">{item.trackName}</p>
            <p>{item.artistName}</p>
            <p className="text-sm text-gray-500">Album: {item.collectionName}</p>
            <audio controls className="mt-2">
              <source src={item.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchFromAPI;
