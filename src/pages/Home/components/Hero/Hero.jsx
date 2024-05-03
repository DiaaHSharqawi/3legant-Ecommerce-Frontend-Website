import React from "react";
import HeroSectionImage from "./assets/images/HeroSection.png";
import "./assets/css/hero.css";
function Hero() {
  return (
    <>
      <div className="Hero-Section my-1 py-5 .poppins-regular">
        <div className="row ">
          <div className="col-lg-6 order-lg-1 order-2 left px-0 d-flex ">
            <img
              src={HeroSectionImage}
              alt="3legante Multipurpose E-commerce"
              className="img-fluid object-fit-fill w-100 h-100"
            />
          </div>
          <div className="col-lg-6 order-lg-2 order-1 right px-0 text-lg-center text-left  ">
            <div className="container  h-100">
              <div className="row align-items-center h-100">
                <div className=" hero-description col align-self-center ">
                  <div className="row flex-column offset-1 align-items-sm-center">
                    <div className="col my-3">
                      <h1>
                        Explore <span className="text-primary">limitless </span>
                        options
                      </h1>
                    </div>
                    <div className="col ">
                      <p>Your One-Stop Shop for Everything You Need</p>
                    </div>
                    <div className="shopeButton pb-5">
                      <button type="button" className="btn btn-dark btn-lg">
                        Shopping now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
