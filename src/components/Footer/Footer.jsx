import "./assets/css/footer.css";

import Divider from "./components/Divider";
import FooterBottom from "./components/FooterBottom/FooterBottom";
import FooterMenu from "./components/FooterMenu/FooterMenu";

function Footer() {
  return (
    <footer>
      <div className="Footer-Section text-white">
        <div className="container">
          <div className="row align-content-center">
            <FooterMenu />
            <Divider />
            <FooterBottom />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
