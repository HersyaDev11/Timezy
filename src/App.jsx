import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayouts";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./views/Home";
import Login from "./components/Auth/signin";
import Register from "./components/Auth/signup";

import Dashboard from "./views/Dashboar/Dashboard";
// import Jadwal from "./pages/Jadwal";
// import Catatan from "./pages/Catatan";

function App() {
  return (
    <Routes>

      {/* ======================= */}
      {/* MAIN WEBSITE */}
      {/* ======================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* ======================= */}
      {/* AUTH (NO NAVBAR) */}
      {/* ======================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ======================= */}
      {/* DASHBOARD AREA */}
      {/* ======================= */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="jadwal" element={<Jadwal />} />
        <Route path="catatan" element={<Catatan />} /> */}
      </Route>

      {/* ======================= */}
      {/* FALLBACK */}
      {/* ======================= */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;