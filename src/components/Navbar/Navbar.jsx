import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import NavBarLogo from "../Logo/NavBarLogo";
import BurgerButton from "./components/BurgerButton/BurgerButton";
import CollapseNavBar from "./components/CollapseNavBar/CollapseNavBar";

function Navbar() {
  return (
    <>
      <div className="container container-lg mt-4">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <NavBarLogo />
            <BurgerButton />
            <CollapseNavBar />
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
