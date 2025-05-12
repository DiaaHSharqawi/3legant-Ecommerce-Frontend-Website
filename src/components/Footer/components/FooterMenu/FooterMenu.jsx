import FooterBrand from "./FooterBrand/FooterBrand";
import FooterCategories from "./FooterCategories/FooterCategories";

function FooterMenu() {
  return (
    <div className="up col-12">
      <div
        className="row 
        flex-column flex-lg-row 
        justify-contect-center 
        align-items-center 
        text-center"
      >
        <div className="col-sm-12 col-xl-6">
          <FooterBrand />
        </div>
        <div className="col-sm-12 col-xl-6 text-white my-5">
          <FooterCategories />
        </div>
      </div>
    </div>
  );
}

export default FooterMenu;
