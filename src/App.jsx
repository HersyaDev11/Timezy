import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Jadwal from "./pages/Jadwal";
import Catatan from "./pages/Catatan";
import Fokus from "./pages/Fokus";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tugas from "./pages/Tugas";
import { ScheduleProvider } from "./context/ScheduleContext";
import { NotesProvider } from "./context/NotesContext";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <ScheduleProvider>
      <NotesProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Layout for Dashboard specific pages */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jadwal" element={<Jadwal />} />
              <Route path="/fokus" element={<Fokus />} />
              <Route path="/catatan" element={<Catatan />} />
              <Route path="/tugas" element={<Tugas />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        </TaskProvider>
      </NotesProvider>
    </ScheduleProvider>
  );
}

export default App;
