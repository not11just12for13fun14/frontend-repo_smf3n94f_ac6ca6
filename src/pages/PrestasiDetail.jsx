import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'

export default function PrestasiDetail(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{
    const fetchDetail = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await api.get(`/prestasi/${id}`)
        setData(res.data?.data)
      } catch (e) {
        setData({ id, judul: 'Mock Detail Prestasi', tingkat: 'Nasional', tanggal: '2024-10-01', status: 'Menunggu', deskripsi: 'Detail deskripsi prestasi (mock).', lampiran: [] })
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  if (loading) return <div>Memuat...</div>
  if (!data) return <div>Tidak ditemukan.</div>

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{data.judul}</h1>
        <p className="text-slate-600">Tingkat {data.tingkat} • {data.tanggal}</p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="text-sm text-slate-700 whitespace-pre-wrap">{data.deskripsi || 'Tidak ada deskripsi.'}</div>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-medium mb-2">Lampiran</h2>
        {data.lampiran?.length ? (
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            {data.lampiran.map((f, idx) => <li key={idx}><a className="text-slate-900 underline" href={f.url} target="_blank">{f.nama}</a></li>)}
          </ul>
        ) : (
          <div className="text-sm text-slate-600">Belum ada lampiran.</div>
        )}
      </div>
    </div>
  )
}
