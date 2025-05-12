import PropTypes from "prop-types";

function KeyFeatureName({ featureName }) {
  return (
    <div className="feature-name fw-bold fs-20 mb-2">
      <h2>{featureName}</h2>
    </div>
  );
}

KeyFeatureName.propTypes = {
  featureName: PropTypes.string.isRequired,
};

export default KeyFeatureName;
