import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SocialLink({ socialLink }) {
  return (
    <div className="col" key={socialLink.name}>
      <div className={socialLink.name}>
        <Link>
          <img src={socialLink.icon} alt={socialLink.alt} />
        </Link>
      </div>
    </div>
  );
}

SocialLink.propTypes = {
  socialLink: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
export default SocialLink;
