import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Jadwal from "./pages/Jadwal";
import Catatan from "./pages/Catatan";
import { ScheduleProvider } from "./context/ScheduleContext";
import { NotesProvider } from "./context/NotesContext";

function App() {
  return (
    <ScheduleProvider>
      <NotesProvider>
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/jadwal" element={<Jadwal />} />
              <Route path="/catatan" element={<Catatan />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </NotesProvider>
    </ScheduleProvider>
  );
}

export default App;
