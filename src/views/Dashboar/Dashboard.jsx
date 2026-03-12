export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400">
          Kelola jadwal dan catatanmu dengan mudah
        </p>
      </div>

      {/* Statistik */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Total Jadwal</p>
          <h2 className="text-3xl font-bold mt-2">12</h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Catatan</p>
          <h2 className="text-3xl font-bold mt-2">8</h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Aktivitas Hari Ini</p>
          <h2 className="text-3xl font-bold mt-2">4</h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm">Produktivitas</p>
          <h2 className="text-3xl font-bold mt-2">92%</h2>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Jadwal */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Jadwal Hari Ini</h2>

          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-slate-900 rounded-lg">
              <span>Kuliah Algoritma</span>
              <span className="text-slate-400">09:00</span>
            </div>

            <div className="flex justify-between p-3 bg-slate-900 rounded-lg">
              <span>Meeting Project</span>
              <span className="text-slate-400">13:00</span>
            </div>

            <div className="flex justify-between p-3 bg-slate-900 rounded-lg">
              <span>Belajar React</span>
              <span className="text-slate-400">19:00</span>
            </div>
          </div>
        </div>

        {/* Catatan */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Catatan Terbaru</h2>

          <div className="space-y-4">
            <div className="p-3 bg-slate-900 rounded-lg">
              Belajar React Router
            </div>

            <div className="p-3 bg-slate-900 rounded-lg">
              Review materi algoritma
            </div>

            <div className="p-3 bg-slate-900 rounded-lg">
              Ide project aplikasi jadwal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
