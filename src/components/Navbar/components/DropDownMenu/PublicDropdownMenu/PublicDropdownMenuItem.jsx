import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PublicDropdownMenuItem({ publicDropdownMenuItem }) {
  return (
    <li key={publicDropdownMenuItem.name}>
      <Link className="dropdown-item" to={publicDropdownMenuItem.path}>
        Login
      </Link>
    </li>
  );
}

PublicDropdownMenuItem.propTypes = {
  publicDropdownMenuItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
};

export default PublicDropdownMenuItem;
