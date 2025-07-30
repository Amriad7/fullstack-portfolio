import logo from "../assets/logo.svg";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="Website Logo" className="h-10 w-10" />
      </Link>
    </div>
  );
};

export default Logo;
