import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AddSong from './pages/AddSong'
import ListSong from './pages/ListSong'
import AddAlbum from './pages/AddAlbum'
import ListAlbum from './pages/ListAlbum'
import FetchFromAPI from './pages/FetchFromAPI'
import AddVideoAlbum from './pages/AddVideoAlbum'
import AddVideo from './pages/AddVideo'
import Loading from './components/Loading'
import AddPodcast from './pages/AddPodcast'

export const url = 'http://localhost:4000'

const ContentWithLoading = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [location])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F3FFF7]">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
        <Routes location={location}>
          <Route path="/" element={<ListSong />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/add-album" element={<AddAlbum />} />
          <Route path="/list-song" element={<ListSong />} />
          <Route path="/list-album" element={<ListAlbum />} />
          <Route path="/fetch-from-api" element={<FetchFromAPI />} />
          <Route path="/add-album-video" element={<AddVideoAlbum />} />
          <Route path="/add-video" element={<AddVideo />} />
          <Route path="/add-podcast" element={<AddPodcast />} />

        </Routes>
      </div>
    </>
  )
}

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto bg-[#F3FFF7]">
        <ContentWithLoading />
      </div>
    </div>
  )
}

export default App
