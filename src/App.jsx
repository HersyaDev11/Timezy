import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Jadwal from "./pages/Jadwal";
import Catatan from "./pages/Catatan";
import LandingPage from "./pages/LandingPage";
import { ScheduleProvider } from "./context/ScheduleContext";
import { NotesProvider } from "./context/NotesContext";

function App() {
  return (
    <ScheduleProvider>
      <NotesProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Layout for Dashboard specific pages */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jadwal" element={<Jadwal />} />
              <Route path="/catatan" element={<Catatan />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </NotesProvider>
    </ScheduleProvider>
  );
}

export default App;
