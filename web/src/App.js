import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Projects from "./components/pages/Projects";
import CVBuilder from "./components/pages/CVBuilder";
import Interview from "./components/pages/Interview";
import BackButton from "./components/BackButton";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/cv-builder" element={<CVBuilder />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/interview" element={<BackButton />} />
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
