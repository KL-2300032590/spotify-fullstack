// src/components/PodcastGallery.jsx

import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const dummyPodcasts = [
  {
    _id: 'p1',
    title: 'Tech Talks: AI Trends',
    speakers: 'Alice & Bob',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    _id: 'p2',
    title: 'The Future of Web3',
    speakers: 'Satoshi & Vitalik',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    _id: 'p3',
    title: 'Startup Stories',
    speakers: 'Elon & Tony',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    _id: 'p4',
    title: 'Mental Health & Tech',
    speakers: 'Sam & Lisa',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
];

const PodcastGallery = () => {
  const [podcasts, setPodcasts] = useState(dummyPodcasts);
  const [modalPodcast, setModalPodcast] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalPodcast && modalRef.current && !modalRef.current.contains(e.target)) {
        setModalPodcast(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalPodcast]);

  return (
    <>
      <Navbar />
      <div className=" min-h-screen bg-[#121212
] text-white px-4 py-6 transition-all duration-500 ">
        <h1 className="my-5 font-bold text-2xl">🎙️ Podcasts</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {podcasts.map((podcast) => (
            <div
              key={podcast._id}
              onClick={() => setModalPodcast(podcast)}
              className="relative bg-[#2c2c2c] p-4 rounded-lg cursor-pointer shadow hover:scale-105 transform transition duration-300"
            >
              <video
                src={podcast.videoUrl}
                className="w-full h-40 object-cover rounded"
                muted
                preload="metadata"
              />
              <div className="mt-2">
                <p className="font-semibold truncate">{podcast.title}</p>
                <p className="text-sm text-gray-400 truncate">{podcast.speakers}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Player */}
        {modalPodcast && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 px-4">
            <div
              ref={modalRef}
              className="bg-[#1e1e1e] rounded-lg shadow-lg w-full max-w-3xl transform scale-95 animate-fade-in"
            >
              <video
                key={modalPodcast._id}
                src={modalPodcast.videoUrl}
                controls
                autoPlay
                className="w-full rounded-lg"
                style={{ maxHeight: '80vh' }}
              />
              <div className="p-4">
                <p className="text-lg font-bold">{modalPodcast.title}</p>
                <p className="text-sm text-gray-400">Speakers: {modalPodcast.speakers}</p>
              </div>
              <button
                onClick={() => setModalPodcast(null)}
                className="absolute top-4 right-4 bg-gray-800 text-white rounded-full px-3 py-1 hover:bg-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animation styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </>
  );
};

export default PodcastGallery;
