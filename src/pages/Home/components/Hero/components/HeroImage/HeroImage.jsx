import HeroSectionImage from "./../../assets/images/HeroSection.png";

function HeroImage() {
  return (
    <div className="col-lg-6 order-lg-1 order-2 left px-0 d-flex ">
      <img
        src={HeroSectionImage}
        alt="3legante Multipurpose E-commerce"
        className="img-fluid object-fit-fill w-100 h-100"
        loading="lazy"
      />
    </div>
  );
}

export default HeroImage;
