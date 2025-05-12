import FooterCategories from "./components/FooterCategories/FooterCategories";
import FooterBrand from "./components/FooterMenu/FooterBrand/FooterBrand";

function FooterMenu() {
  return (
    <div className="up">
      <div
        className="row 
              flex-column flex-lg-row 
              justify-contect-center 
              align-items-center 
              text-center"
      >
        <div className="col-6 gap-5">
          <FooterBrand />
        </div>
        <div className="col-6 text-white my-5 ">
          <FooterCategories />
        </div>
      </div>
    </div>
  );
}

export default FooterMenu;
