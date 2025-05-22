import PropTypes from "prop-types";

function KeyFeatureIcon({ featureIcon, featureName }) {
  return (
    <div className="feature-icon mb-3">
      <img src={featureIcon} alt={featureName} loading="lazy" />
    </div>
  );
}

KeyFeatureIcon.propTypes = {
  featureIcon: PropTypes.string.isRequired,
  featureName: PropTypes.string.isRequired,
};

export default KeyFeatureIcon;
