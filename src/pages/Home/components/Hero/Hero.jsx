import "./assets/css/hero.css";
import HeroDescription from "./components/HeroDescription/HeroDescription.JSX";
import HeroImage from "./components/HeroImage/HeroImage";

function Hero() {
  return (
    <>
      <div className="Hero-Section my-1 py-5 .poppins-regular">
        <div className="row ">
          <HeroImage />
          <HeroDescription />
        </div>
      </div>
    </>
  );
}

export default Hero;
