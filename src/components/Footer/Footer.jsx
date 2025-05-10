import "./assets/css/footer.css";

import Divider from "./components/Divider";
import FooterBottom from "./components/FooterBottom";
import FooterBrand from "./components/FooterBrand";
import FooterCategories from "./components/FooterCategories";
import FooterSocialLinks from "./components/FooterSocialLinks";

function Footer() {
  return (
    <footer>
      <div className="Footer-Section text-white">
        <div className="container">
          <div className="row align-content-center">
            <div className="up">
              <div className="row flex-column flex-lg-row justify-contect-center align-items-center text-center ">
                <div className="col-6 gap-5">
                  <FooterBrand />
                </div>
                <div className="col-6 text-white my-5 ">
                  <FooterCategories />
                </div>
              </div>
            </div>
            <Divider />
            <div className="down text-center my-3">
              <div className="row gx-5  gy-sm-5 flex-sm-column-reverse justify-content-sm-center flex-xl-row align-content-center">
                <FooterBottom />
                <FooterSocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
