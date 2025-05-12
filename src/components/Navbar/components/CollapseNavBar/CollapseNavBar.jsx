import DropDownMenuList from "../DropDownMenu/DropDownMenuList";
import NavBarLinks from "../NavBarLinks/NavBarLinks";

function CollapseNavBar() {
  return (
    <div
      className="collapse navbar-collapse justify-content-center"
      id="navbarNav"
    >
      <div className="row flex-row w-100">
        <div className="col-10">
          <NavBarLinks />
        </div>
        <div className="col-2">
          <DropDownMenuList />
        </div>
      </div>
    </div>
  );
}

export default CollapseNavBar;
