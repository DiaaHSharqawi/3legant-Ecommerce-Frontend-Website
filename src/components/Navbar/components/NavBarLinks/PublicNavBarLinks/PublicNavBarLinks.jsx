import { publicNavBarLinks } from "../../../data/navBarData";
import PublicNavBarLink from "./PublicNavBarLink";

function PublicNavBarLinks() {
  return (
    <ul className="navbar-nav fs-5 gap-4 justify-content-center">
      {publicNavBarLinks.map((publicNavBarLink) => {
        return (
          <PublicNavBarLink
            publicNavBarLink={publicNavBarLink}
            key={publicNavBarLink.name}
          />
        );
      })}
    </ul>
  );
}

export default PublicNavBarLinks;
