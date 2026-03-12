import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-8">
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 w-72 focus:outline-none focus:border-blue-500"
          />

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Halo, User 👋</span>

            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
              U
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
