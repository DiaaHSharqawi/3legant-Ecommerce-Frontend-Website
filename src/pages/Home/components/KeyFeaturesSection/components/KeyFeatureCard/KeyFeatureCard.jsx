import PropTypes from "prop-types";
import KeyFeatureDescription from "./components/KeyFeatureDescription";
import KeyFeatureIcon from "./components/KeyFeatureIcon";
import KeyFeatureName from "./components/KeyFeatureName";

function KeyFeatureCard({ homeKeyFeature }) {
  return (
    <div className="feature col" key={homeKeyFeature.name}>
      <KeyFeatureIcon
        featureIcon={homeKeyFeature.icon}
        featureName={homeKeyFeature.name}
      />
      <KeyFeatureName featureName={homeKeyFeature.name} />
      <KeyFeatureDescription featureDescription={homeKeyFeature.description} />
    </div>
  );
}

KeyFeatureCard.propTypes = {
  homeKeyFeature: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }),
};

export default KeyFeatureCard;
