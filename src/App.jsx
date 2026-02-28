import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";

import Home from "./views/Home";
import Login from "./components/Auth/signin";
import Register from "./components/Auth/signup";

function App() {
  return (
    <Routes>

      {/* Layout with Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth Pages (No Navbar & Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default App;