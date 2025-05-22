import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PrivateDropdownMenuItem({ privateDropdownMenuItem }) {
  return (
    <li key={privateDropdownMenuItem.name}>
      <Link
        className="dropdown-item"
        to={privateDropdownMenuItem.path}
        onClick={privateDropdownMenuItem.onClick}
      >
        {privateDropdownMenuItem.name}
      </Link>
    </li>
  );
}

PrivateDropdownMenuItem.propTypes = {
  privateDropdownMenuItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
};

export default PrivateDropdownMenuItem;
