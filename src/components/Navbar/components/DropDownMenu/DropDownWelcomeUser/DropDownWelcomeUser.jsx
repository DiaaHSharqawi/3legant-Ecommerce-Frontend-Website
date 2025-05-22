import PropTypes from "prop-types";

function DropDownWelcomeUser({ userName }) {
  return (
    <a
      className="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {userName}
    </a>
  );
}

DropDownWelcomeUser.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default DropDownWelcomeUser;
