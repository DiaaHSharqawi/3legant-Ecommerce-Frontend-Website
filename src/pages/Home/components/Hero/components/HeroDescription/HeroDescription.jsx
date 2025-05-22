import HeroButton from "./components/HeroButton/HeroButton";
import HeroSubTitle from "./components/HeroSubTitle/HeroSubTitle";
import HeroTitle from "./components/HeroTitle/HeroTitle";

function HeroDescription() {
  return (
    <div
      className="col-lg-6 order-lg-2 order-1 
      right px-0 text-left
      text-lg-center"
    >
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className=" hero-description col align-self-center ">
            <div
              className="row flex-column 
            offset-1 align-items-sm-center"
            >
              <HeroTitle />
              <HeroSubTitle />
              <HeroButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroDescription;
