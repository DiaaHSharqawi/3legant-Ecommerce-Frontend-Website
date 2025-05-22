import whiteLogo from "./../../../../assets/images/whiteLogo.svg";

function FooterLogo() {
  return (
    <div className="col-12 col-sm-12 col-xl-4">
      <div
        className="row logo mx-auto mx-sm-auto mx-lg-auto
        flex-column"
      >
        <img src={whiteLogo} alt="3legant ecommerce website" />
      </div>
    </div>
  );
}

export default FooterLogo;
