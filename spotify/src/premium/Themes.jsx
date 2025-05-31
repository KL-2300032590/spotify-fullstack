import React, { useState } from 'react';

const themes = [
  { name: 'Dark Mode', bg: 'bg-gray-900', text: 'text-white' },
  { name: 'Sunset', bg: 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600', text: 'text-white' },
  { name: 'Ocean', bg: 'bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400', text: 'text-white' },
  { name: 'Forest', bg: 'bg-gradient-to-r from-green-700 via-green-600 to-green-400', text: 'text-white' },
];

const Themes = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    document.body.className = theme.bg; // Apply theme background to body
  };

  return (
    <main className={`min-h-screen p-8 ${selectedTheme.bg} ${selectedTheme.text} transition-colors duration-500`}>
      <h2 className="text-3xl font-bold mb-6">Customize Your Theme</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className={`cursor-pointer p-6 rounded shadow-lg flex items-center justify-center font-semibold ${
              selectedTheme.name === theme.name ? 'ring-4 ring-yellow-400' : ''
            }`}
            onClick={() => handleThemeChange(theme)}
          >
            {theme.name}
          </div>
        ))}
      </div>
      <p className="mt-8 text-gray-300">
        Select any theme above to instantly change your app's look and feel.
      </p>
    </main>
  );
};

export default Themes;
