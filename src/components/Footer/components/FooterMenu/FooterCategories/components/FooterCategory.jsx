import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function FooterCategory({ category }) {
  return (
    <li className="nav-item">
      <Link
        className="nav-link active text-capitalize"
        aria-current="page"
        to={category.path}
      >
        {category.name}
      </Link>
    </li>
  );
}

FooterCategory.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
};

export default FooterCategory;
