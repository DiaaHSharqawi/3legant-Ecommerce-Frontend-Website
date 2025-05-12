import { Link } from "react-router-dom";
import profileIcon from "./../../../assets/images/icons/profileIcon.svg";

function NavBarProfileIcon() {
  return (
    <li className="nav-item">
      <Link className="nav-link">
        <img src={profileIcon} alt="profileIcon" />
      </Link>
    </li>
  );
}

export default NavBarProfileIcon;
