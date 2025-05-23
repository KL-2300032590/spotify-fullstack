import React, { useContext, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();

  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  const album = albumsData.length > 0 ? albumsData.find((x) => x._id === albumId) : null;
  const bgColor = album ? album.bgColor : "#121212"; // Ensure the property name is correct

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum && album) {
        displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }
  }, [isAlbum, album, bgColor]);

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      {albumsData.length > 0 
        ? <Routes>
            <Route path='/' element={<DisplayHome />} />        
            <Route path='/album/:id' element={<DisplayAlbum album={album} />} />              
          </Routes>   
        : null
      }
    </div>
  );
};

export default Display;