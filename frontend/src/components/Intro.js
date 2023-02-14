import logo from "../assets/logo.png";
import "./styles/Intro.css";
import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <div className="mainpagediv">
      <img src={logo} alt={"noimg"} />
      <div>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signin">
          <button className="signin-btn">SignIn</button>
        </Link>
      </div>
    </div>
  );
}
