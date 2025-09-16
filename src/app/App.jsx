import { Routes, Route } from "react-router-dom";

import "./styles.css";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/app/login" element={<Login />} />
      <Route path="/app/register" element={<Register />} />
      <Route path="/app/projects" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
