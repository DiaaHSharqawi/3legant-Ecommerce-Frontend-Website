import { Link } from "react-router-dom";
import LogoImage from "./Logo.svg";

function NavBarLogo() {
  return (
    <Link className="navbar-brand" href="#">
      <div className="logo">
        <img src={LogoImage} />
      </div>
    </Link>
  );
}

export default NavBarLogo;
