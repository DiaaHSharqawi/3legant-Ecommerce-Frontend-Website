import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LegalLink({ legalLink }) {
  return <Link className="nav-link">{legalLink.name}</Link>;
}

LegalLink.propTypes = {
  legalLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default LegalLink;
