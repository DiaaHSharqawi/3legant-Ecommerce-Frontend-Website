import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LegalLink({ legalLink }) {
  return (
    <div className="col-6" key={legalLink.name}>
      <Link className="nav-link">{legalLink.name}</Link>
    </div>
  );
}

LegalLink.propTypes = {
  legalLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default LegalLink;
