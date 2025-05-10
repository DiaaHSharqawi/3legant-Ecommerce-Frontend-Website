import whiteLogo from "../assets/images/whiteLogo.svg";

function FooterBrand() {
  return (
    <div
      className="row flex-column 
    flex-xl-row align-items-xl-start 
    align-items-md-center gy-3 "
    >
      <div className=" col col-xl-3">
        <div className="logo mx-sm-auto mx-lg-auto w-100">
          <img src={whiteLogo} alt="" />
        </div>
      </div>
      <div className="col col-xl-1">
        <div className="vr d-xl-block d-none"></div>
        <div className="smallLine d-sm-block d-xl-none mx-auto "></div>
      </div>
      <div className=" col col-xl-6 ">
        <p className="text-white mx-sm-auto mx-lg-auto">
          Multipurpose eCommerce website
        </p>
      </div>
    </div>
  );
}

export default FooterBrand;
