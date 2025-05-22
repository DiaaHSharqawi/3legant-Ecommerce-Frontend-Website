import "./assets/css/keyFeatures.css";
import KeyFeatureCard from "./components/KeyFeatureCard/KeyFeatureCard";
import { homeKeyFeatures } from "./data/KeyFeaturesData";

function HomeKeyFeatures() {
  return (
    <>
      <section className="HomeKeyFeatures my-5 py-5">
        <div className="features">
          <div className="container ">
            <div className="row gap-4">
              {homeKeyFeatures.map((homeKeyFeature) => {
                return (
                  <KeyFeatureCard
                    homeKeyFeature={homeKeyFeature}
                    key={homeKeyFeature.name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeKeyFeatures;
