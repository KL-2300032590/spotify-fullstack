import React from 'react';

const VideoVault = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 text-white bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-4 text-red-500">Exclusive Video Vault</h2>
      <p className="text-lg mb-6">
        Watch premium video content, behind-the-scenes footage, and exclusive artist interviews, all in one place.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/VY0r0WV0GAQ?si=bYeO_fUOxXqduHOV"
            title="Exclusive Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded shadow"
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default VideoVault;
