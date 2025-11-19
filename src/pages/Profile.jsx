export default function Profile(){
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profil</h1>
        <p className="text-slate-600 mt-1">Demo tanpa autentikasi. Semua halaman bisa diakses.</p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-600">Nama</div>
            <div className="font-medium">Mahasiswa Demo</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">NIM</div>
            <div className="font-medium">123456789</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Program Studi</div>
            <div className="font-medium">Informatika</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Role</div>
            <div className="font-medium">Mahasiswa (demo)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
