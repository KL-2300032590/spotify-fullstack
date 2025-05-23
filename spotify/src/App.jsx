import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import DisplayAlbum from './components/DisplayAlbum';
import FetchFromAPI from './components/FetchFromAPI';

import './index.css';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {songsData.length !== 0 ? (
        <>
          <div className='h-[90%] flex'>
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path='/' element={<Display />} />
                <Route path='/album/:id' element={<DisplayAlbum />} />
                <Route path='/fetch-from-api' element={<FetchFromAPI />} />
              </Routes>
            </div>
          </div>
          <Player />
        </>
      ) : null}

      <audio ref={audioRef} src={track ? track.file : null} preload='auto'></audio>
    </div>
  );
};

export default App;
