import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AddSong from './pages/AddSong'
import ListSong from './pages/ListSong'
import AddAlbum from './pages/AddAlbum'
import ListAlbum from './pages/ListAlbum'
import FetchFromAPI from './pages/FetchFromAPI'

export const url = 'http://localhost:4000'

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
              <Route path="/fetch-from-api" element={<FetchFromAPI />} />
            </Routes>
          </div>
        </div>
    </div>
  )
}

export default App

