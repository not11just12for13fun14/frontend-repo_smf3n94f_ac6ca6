import { useEffect, useState } from 'react'
import { Search, Filter, Eye, Pencil, Trash2, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function PrestasiList(){
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Attempt fetch if backend available; otherwise use mock
    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await api.get('/prestasi')
        setItems(res.data?.data || [])
      } catch (e) {
        // fallback mock data
        setItems([
          { id: '1', judul: 'Juara 1 UI/UX', tingkat: 'Nasional', tanggal: '2024-11-02', status: 'Menunggu' },
          { id: '2', judul: 'Juara 2 Hackathon', tingkat: 'Regional', tanggal: '2024-10-18', status: 'Disetujui' },
          { id: '3', judul: 'Pemakalah Seminar', tingkat: 'Internasional', tanggal: '2024-09-01', status: 'Revisi' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = items.filter(i => i.judul.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Daftar Prestasi</h1>
          <p className="text-slate-600 mt-1">Cari, filter, dan kelola data prestasi.</p>
        </div>
        <Link to="/prestasi/tambah" className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm shadow hover:bg-slate-800">
          <Plus className="h-4 w-4" /> Tambah Prestasi
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={query} onChange={e=>setQuery(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" placeholder="Cari judul prestasi..." />
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-slate-50">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left p-3">Judul</th>
              <th className="text-left p-3">Tingkat</th>
              <th className="text-left p-3">Tanggal</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">Memuat...</td></tr>
            )}
            {!loading && filtered.map(i => (
              <tr key={i.id} className="border-t">
                <td className="p-3 font-medium">{i.judul}</td>
                <td className="p-3">{i.tingkat}</td>
                <td className="p-3">{i.tanggal}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${i.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-700' : i.status === 'Revisi' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{i.status}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Link to={`/prestasi/${i.id}`} className="inline-flex items-center gap-1 px-2 py-1 border rounded hover:bg-slate-50"><Eye className="h-4 w-4"/>Detail</Link>
                    <button className="inline-flex items-center gap-1 px-2 py-1 border rounded hover:bg-slate-50"><Pencil className="h-4 w-4"/>Edit</button>
                    <button className="inline-flex items-center gap-1 px-2 py-1 border rounded hover:bg-red-50 text-red-600"><Trash2 className="h-4 w-4"/>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">Tidak ada data.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
