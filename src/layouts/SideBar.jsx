import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Jadwal", path: "/dashboard/jadwal", icon: "📅" },
    { name: "Catatan", path: "/dashboard/catatan", icon: "📝" },
  ];

  return (
    <aside className="h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <h1 className="text-xl font-bold text-blue-500">
          TIMEZY
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col p-4 gap-2 flex-1">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            to={menu.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === menu.path
                ? "bg-slate-800 text-blue-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>{menu.icon}</span>
            {menu.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600">
          Keluar
        </button>
      </div>

    </aside>
  );
}