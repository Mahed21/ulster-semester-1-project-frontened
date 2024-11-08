import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AuthProvider from "./Pages/Context/AuthProvider";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import Header from "./Pages/Shareable/Header";
import UploadVideo from "./Pages/UploadVideo/UploadVideo";
import LoadData from "./Pages/Admin/Delete/LoadData";

function App() {
  return (
    <AuthProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/uploadVideo" element={<UploadVideo />} />
        <Route path="/loadDeleteVideo" element={<LoadData />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
