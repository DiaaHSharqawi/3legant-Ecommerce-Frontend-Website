import FooterBottomCopyright from "./components/Copyright";
import LegalLinks from "./components/LegalLinks";
import SocialLinks from "./components/SocialLinks";

function FooterBottom() {
  return (
    <div className="down text-center my-3">
      <div
        className="row 
        gx-5 gy-sm-5
        flex-xl-row
        flex-sm-column-reverse
        justify-content-sm-center
        align-content-center"
      >
        <div className="col-sm-6 col-xl-7">
          <div className="left row flex-sm-column flex-xl-row gy-3">
            <FooterBottomCopyright />
            <LegalLinks />
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
