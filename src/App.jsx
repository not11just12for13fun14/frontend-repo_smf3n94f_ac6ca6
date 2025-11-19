import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PrestasiList from './pages/PrestasiList'
import PrestasiForm from './pages/PrestasiForm'
import PrestasiDetail from './pages/PrestasiDetail'
import ReviewPanel from './pages/ReviewPanel'
import Profile from './pages/Profile'

export default function App(){
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path="prestasi" element={<PrestasiList/>} />
        <Route path="prestasi/tambah" element={<PrestasiForm/>} />
        <Route path="prestasi/:id" element={<PrestasiDetail/>} />
        <Route path="review" element={<ReviewPanel/>} />
        <Route path="profil" element={<Profile/>} />
      </Route>
    </Routes>
  )
}
