import React, { useEffect, useRef, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';
import VideoGallery from './VideoGallery';
import PodcastGallery from './PodcastGallery';



const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();

  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const album = albumsData.find((x) => x._id === albumId);
  const bgColor = album ? album.bgColor : "#121212"; // Fix typo: bgColour → bgColor

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum && album
        ? `linear-gradient(${bgColor}, #121212)`
        : '#121212';
    }
  }, [isAlbum, album, bgColor]); // Add dependencies to avoid stale values

  return (
    <div
      ref={displayRef}
      className='w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0'
      style={{ transition: 'background 0.5s ease-in-out' }}
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum album={album} />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/videos/album/:id" element={<VideoGallery />} />
        <Route path="/podcasts" element={<PodcastGallery />} />
      </Routes>
    </div>
  );
};

export default Display;
