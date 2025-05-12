import Copyright from "./components/Copyright";
import LegalLinks from "./components/LegalLinks";
import SocialLinks from "./components/SocialLinks";

function FooterBottom() {
  return (
    <div className="down text-center my-3 w-100">
      <div
        className="row 
        gx-5 gy-sm-5
        flex-xl-row
        flex-sm-row-reverse
        justify-content-sm-center
        align-content-center"
      >
        <div className="col-sm-6 col-xl-12">
          <div
            className="left row 
            flex-sm-column 
            flex-xl-row gy-5"
          >
            <Copyright />
            <LegalLinks />
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
