import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Jadwal from "./pages/Jadwal";
import Catatan from "./pages/Catatan";
import Tugas from "./pages/Tugas";
import Fokus from "./pages/Fokus";
import { ScheduleProvider } from "./context/ScheduleContext";
import { NotesProvider } from "./context/NotesContext";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <ScheduleProvider>
        <NotesProvider>
          <BrowserRouter>
            <Routes>
              {/* Layout for Dashboard specific pages */}
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/jadwal" element={<Jadwal />} />
                <Route path="/catatan" element={<Catatan />} />
                <Route path="/tugas" element={<Tugas />} />
                <Route path="/fokus" element={<Fokus />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>

              {/* Landing page from Dev Taufan can be added here without the Dashboard Layout */}
              {/* <Route path="/landing" element={<LandingPage />} /> */}
            </Routes>
          </BrowserRouter>
        </NotesProvider>
      </ScheduleProvider>
    </TaskProvider>
  );
}

export default App;
