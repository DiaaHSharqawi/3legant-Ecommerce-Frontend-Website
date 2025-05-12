import { useContext } from "react";
import { UserLoginContext } from "../../../../contexts/useLogin/useLogin";
import DropDownWelcomeUser from "./DropDownWelcomeUser/DropDownWelcomeUser";
import NavBarProfileIcon from "./NavBarProfileIcon/NavBarProfileIcon";
import PrivateDropdownMenu from "./PrivateDropdownMenu/PrivateDropdownMenu";
import PublicDropdownMenu from "./PublicDropdownMenu/PublicDropdownMenu";
function DropDownMenuList() {
  const { userName, isLogin } = useContext(UserLoginContext);

  return (
    <div className="user-menu d-none d-lg-block">
      <ul className="navbar-nav mx-auto">
        <NavBarProfileIcon />
        <li className="nav-item dropdown">
          <DropDownWelcomeUser userName={userName} />
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <PublicDropdownMenu />
            {isLogin ? <PrivateDropdownMenu /> : null}
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenuList;
