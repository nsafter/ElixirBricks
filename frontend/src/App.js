import "./App.css";
import "animate.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import LogIn from "./pages/Login";
import Calculator from "./pages/Calculator";
import Properties from "./pages/Properties";
import Intro from "./components/Intro";
import AddProperty from "./pages/AddProperty";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/adminpage" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
