import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PrivateNavBarLink({ privateNavBarLink }) {
  return (
    <li className="nav-item" key={privateNavBarLink.name}>
      <Link className="nav-link" to={privateNavBarLink.path}>
        <div
          className={`${privateNavBarLink.className} ${privateNavBarLink.style}`}
        >
          <img src={privateNavBarLink.icon} alt={privateNavBarLink.name} />
          <div className={`${privateNavBarLink.className}`}>
            {privateNavBarLink.value}
          </div>
        </div>
      </Link>
    </li>
  );
}

PrivateNavBarLink.propTypes = {
  privateNavBarLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
  }),
};

export default PrivateNavBarLink;
