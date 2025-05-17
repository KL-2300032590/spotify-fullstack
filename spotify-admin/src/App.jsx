import React from 'react'
import  {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route}  from 'react-router-dom';
import AddSong from './pages/AddSong'
import AddAlbum from './pages/AddAlbum'
import ListSong from './pages/ListSong'
import ListAlbum from './pages/ListAlbum';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
<<<<<<< HEAD
import FetchFromAPI from './pages/FetchFromAPI';

export const url ='http://localhost:4000'
=======

export const url ="https://spotify-fullstack-75rf.onrender.com";
>>>>>>> 1333d4642bea10e67118ad2c7e55d822be6fde0a


const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
        <ToastContainer/>
        <Sidebar/>
        <div className='flex-1 h-screen overflow-y-auto bg-[#F3FFF7]'>
            <Navbar/>
          <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
            <Routes>
              <Route path='/add-song' element={<AddSong/>}/>
              <Route path='/add-album' element={<AddAlbum/>}/>
              <Route path='/list-song' element={<ListSong/>}/>
              <Route path='/list-album' element={<ListAlbum/>}/>
<<<<<<< HEAD
              <Route path="/fetch-from-api" element={<FetchFromAPI />} />
=======
>>>>>>> 1333d4642bea10e67118ad2c7e55d822be6fde0a
            </Routes>
          </div>
        </div>
    </div>
  )
}

export default App

