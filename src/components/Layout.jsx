import { NavLink, Outlet } from 'react-router-dom'
import { Menu, Trophy, List, PlusCircle, ShieldCheck, User, BarChart3, Settings } from 'lucide-react'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="h-6 w-6 text-slate-600" />
            <span className="font-semibold">Sistem Pelaporan Prestasi</span>
          </div>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <NavLink to="/" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-slate-900 text-white':'text-slate-700 hover:bg-slate-100'}`}>Dashboard</NavLink>
            <NavLink to="/prestasi" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-slate-900 text-white':'text-slate-700 hover:bg-slate-100'}`}>Daftar Prestasi</NavLink>
            <NavLink to="/prestasi/tambah" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-slate-900 text-white':'text-slate-700 hover:bg-slate-100'}`}>Tambah</NavLink>
            <NavLink to="/review" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-slate-900 text-white':'text-slate-700 hover:bg-slate-100'}`}>Panel Review</NavLink>
            <NavLink to="/profil" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-slate-900 text-white':'text-slate-700 hover:bg-slate-100'}`}>Profil</NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-sm text-slate-600">
          <span>© {new Date().getFullYear()} Sistem Pelaporan Prestasi</span>
          <span>Frontend Demo (tanpa auth)</span>
        </div>
      </footer>
    </div>
  )
}
