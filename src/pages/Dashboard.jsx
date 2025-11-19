import { Trophy, CheckCircle2, Clock, BarChart3 } from 'lucide-react'

export default function Dashboard(){
  // Static demo cards
  const stats = [
    { label: 'Total Prestasi', value: 24, icon: Trophy, color: 'bg-amber-500' },
    { label: 'Menunggu Review', value: 5, icon: Clock, color: 'bg-blue-500' },
    { label: 'Disetujui', value: 16, icon: CheckCircle2, color: 'bg-emerald-500' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-slate-600 mt-1">Ringkasan cepat aktivitas pelaporan prestasi.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(({label, value, icon:Icon, color}) => (
          <div key={label} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg ${color} text-white flex items-center justify-center`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-slate-600 text-sm">{label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="font-medium mb-3">Aktivitas Terbaru</h2>
        <ul className="text-sm text-slate-700 space-y-2">
          <li>• Juara 1 Lomba UI/UX – menunggu review.</li>
          <li>• Juara 2 Hackathon ABC – disetujui.</li>
          <li>• Seminar Nasional Pemakalah – dikembalikan (revisi).</li>
        </ul>
      </div>
    </div>
  )
}
