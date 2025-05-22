import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PublicNavBarLink({ publicNavBarLink }) {
  return (
    <li
      className="nav-item 
      d-block d-sm-none 
      d-xl-block"
      key={publicNavBarLink.name}
    >
      <Link
        className="nav-link active text-capitalize"
        aria-current="page"
        to={publicNavBarLink.path}
      >
        {publicNavBarLink.name}
      </Link>
    </li>
  );
}

PublicNavBarLink.propTypes = {
  publicNavBarLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
};

export default PublicNavBarLink;
