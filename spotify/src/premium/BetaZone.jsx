import React from 'react';

const BetaZone = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 text-white bg-gradient-to-br from-blue-900 via-indigo-900 to-black rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-400">Beta Zone</h2>
      <p className="text-lg mb-6">
        Try out new and experimental features before they go live. Your feedback shapes the future of the app!
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Next-gen AI recommendations (coming soon)</li>
        <li>Customizable visualizers (beta)</li>
        <li>Early access to UI updates</li>
        <li>Exclusive invite-only community chat(building)</li>
      </ul>
      <button
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition"
        onClick={() => alert('Stay tuned for beta releases!')}
      >
        Explore Beta Features
      </button>
    </main>
  );
};

export default BetaZone;
