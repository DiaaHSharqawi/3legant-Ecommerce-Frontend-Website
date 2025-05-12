import PropTypes from "prop-types";

function KeyFeatureDescription({ featureDescription }) {
  return (
    <div className="feature-description">
      <p>{featureDescription}</p>
    </div>
  );
}

KeyFeatureDescription.propTypes = {
  featureDescription: PropTypes.string.isRequired,
};

export default KeyFeatureDescription;
