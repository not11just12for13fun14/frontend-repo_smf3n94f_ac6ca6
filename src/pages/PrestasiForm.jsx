import { useState } from 'react'
import { UploadCloud } from 'lucide-react'
import api from '../lib/api'

export default function PrestasiForm(){
  const [form, setForm] = useState({
    judul: '',
    jenis: '',
    tingkat: '',
    penyelenggara: '',
    tanggal: '',
    capaian: '',
    anggota: '',
    deskripsi: '',
  })
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      // send JSON first
      const res = await api.post('/prestasi', form)
      // optional upload files
      if (files.length) {
        const fd = new FormData()
        files.forEach(f=>fd.append('files', f))
        await api.post(`/prestasi/${res.data?.data?.id || 'temp'}/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      setMessage('Berhasil menyimpan data (mock jika API tidak tersedia).')
      setForm({judul:'', jenis:'', tingkat:'', penyelenggara:'', tanggal:'', capaian:'', anggota:'', deskripsi:''})
      setFiles([])
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const input = (name, label, type='text', props={}) => (
    <div className="space-y-1">
      <label className="text-sm text-slate-700">{label}</label>
      <input type={type} value={form[name]} onChange={e=>setForm(v=>({...v, [name]: e.target.value}))} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" {...props} />
    </div>
  )

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Tambah Prestasi</h1>
      <p className="text-slate-600 mb-6">Lengkapi data prestasi mahasiswa beserta bukti lampiran.</p>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {input('judul', 'Judul Prestasi')}
          {input('jenis', 'Jenis Lomba/Kegiatan')}
          {input('tingkat', 'Tingkat (Regional/Nasional/Internasional)')}
          {input('penyelenggara', 'Penyelenggara')}
          {input('tanggal', 'Tanggal', 'date')}
          {input('capaian', 'Capaian (Juara/Pemakalah/dll)')}
          {input('anggota', 'Anggota Tim (opsional)')}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-700">Deskripsi</label>
          <textarea value={form.deskripsi} onChange={e=>setForm(v=>({...v, deskripsi: e.target.value}))} className="w-full px-3 py-2 border rounded-md text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-slate-900" />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-700">Lampiran Bukti (PDF/JPG/PNG)</label>
          <div className="border rounded-md p-4 flex flex-col items-center justify-center text-slate-600">
            <UploadCloud className="h-6 w-6 mb-2" />
            <input type="file" multiple onChange={e=>setFiles(Array.from(e.target.files || []))} />
            {files.length > 0 && (
              <div className="text-xs mt-2">{files.length} file dipilih</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button disabled={loading} className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 disabled:opacity-50">
            {loading? 'Menyimpan...' : 'Simpan'}
          </button>
          {message && <div className="text-sm text-slate-700">{message}</div>}
        </div>
      </form>
    </div>
  )
}
