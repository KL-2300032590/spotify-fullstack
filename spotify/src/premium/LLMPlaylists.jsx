import React from 'react';

const LLMPlaylists = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 text-white bg-gradient-to-br from-purple-800 via-indigo-900 to-black rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-4 text-purple-300">AI-Generated Playlists</h2>
      <p className="text-lg mb-6">
        Enjoy custom-curated playlists generated using advanced language models. These playlists evolve with your taste and listening habits.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-purple-900 rounded shadow hover:bg-purple-800 transition">
          <h3 className="text-xl font-semibold mb-2">Focus Boost</h3>
          <p className="text-sm text-gray-300">Stay productive with curated focus music.</p>
        </div>
        <div className="p-4 bg-purple-900 rounded shadow hover:bg-purple-800 transition">
          <h3 className="text-xl font-semibold mb-2">Chill AI Mix</h3>
          <p className="text-sm text-gray-300">Relax with mood-aware chill vibes.</p>
        </div>
        <div className="p-4 bg-purple-900 rounded shadow hover:bg-purple-800 transition">
          <h3 className="text-xl font-semibold mb-2">Energize Me</h3>
          <p className="text-sm text-gray-300">Get pumped with high-energy tracks.</p>
        </div>
      </div>
    </main>
  );
};

export default LLMPlaylists;