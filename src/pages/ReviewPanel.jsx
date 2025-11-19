import { useEffect, useState } from 'react'
import { Check, X, MessageSquare } from 'lucide-react'
import api from '../lib/api'

export default function ReviewPanel(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const load = async () => {
      setLoading(true)
      try {
        const res = await api.get('/prestasi?status=menunggu')
        setItems(res.data?.data || [])
      } catch {
        setItems([
          { id: '1', judul: 'Juara 1 UI/UX', mahasiswa: 'Budi', tanggal: '2024-11-02' },
          { id: '3', judul: 'Pemakalah Seminar', mahasiswa: 'Sita', tanggal: '2024-09-12' },
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const act = async (id, status) => {
    try {
      await api.post(`/prestasi/${id}/review`, { status })
      setItems(prev => prev.filter(i => i.id !== id))
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Panel Review</h1>
        <p className="text-slate-600 mt-1">Approve atau kembalikan pengajuan prestasi.</p>
      </div>

      <div className="space-y-3">
        {loading && <div className="text-slate-600">Memuat...</div>}
        {!loading && items.map(i => (
          <div key={i.id} className="rounded-xl border bg-white p-5 shadow-sm flex items-center justify-between">
            <div>
              <div className="font-medium">{i.judul}</div>
              <div className="text-sm text-slate-600">{i.mahasiswa} • {i.tanggal}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>act(i.id,'approved')} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-emerald-50 text-emerald-700"><Check className="h-4 w-4"/>Setujui</button>
              <button onClick={()=>act(i.id,'rejected')} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-amber-50 text-amber-700"><X className="h-4 w-4"/>Kembalikan</button>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-slate-50"><MessageSquare className="h-4 w-4"/>Catatan</button>
            </div>
          </div>
        ))}
        {!loading && items.length === 0 && (
          <div className="text-slate-600">Tidak ada yang menunggu review.</div>
        )}
      </div>
    </div>
  )
}
