import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Premium = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const features = [
    {
      title: 'Offline Listening',
      description: 'Download and listen without internet.',
      route: '/premium/offline',
      color: 'bg-yellow-500',
    },
    {
      title: 'Visualizer Themes',
      description: 'Dynamic visualizations for songs.',
      route: '/premium/visualizer',
      color: 'bg-purple-500',
    },
    {
      title: 'LLM Playlists',
      description: 'AI-curated playlists based on your vibe.',
      route: '/premium/llm-playlists',
      color: 'bg-pink-600',
    },
    {
      title: 'Video Vault',
      description: 'Exclusive podcast and video content.',
      route: '/premium/video-vault',
      color: 'bg-blue-500',
    },
    {
      title: 'Beta Preview Zone',
      description: 'Get early access to upcoming features.',
      route: '/premium/beta-zone',
      color: 'bg-green-500',
    },
    {
      title: 'Premium UI Themes',
      description: 'Unlock exclusive app themes.',
      route: '/premium/themes',
      color: 'bg-red-500',
    },
  ];

  return (
    <main className="max-w-6xl mx-auto p-8 text-white bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-lg shadow-lg mt-6">
      <h1 className="text-4xl font-extrabold mb-6 text-red-600">Welcome to Premium</h1>
      <p className="text-lg leading-relaxed mb-4">
        Unlock exclusive features, ad-free content, and next-gen tools to elevate your listening experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-lg shadow-md hover:scale-105 transition cursor-pointer ${feature.color}`}
            onClick={() => navigate(feature.route)}
          >
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Premium;
