import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function HomeCategory({ category }) {
  return (
    <div className="product ratio ratio-1x1" key={category.id}>
      <Link to="">
        <img
          src={category.image}
          alt={category.name}
          className="img-fluid"
          loading="lazy"
        />
      </Link>
    </div>
  );
}

HomeCategory.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default HomeCategory;
