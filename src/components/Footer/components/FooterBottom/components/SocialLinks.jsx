import { socialLinks } from "../../../data/footerData";
import SocialLink from "./SocialLink";

function SocialLinks() {
  return (
    <>
      <div className="col-sm-6 col-xl-5">
        <div className="right ">
          <div className="icons row justify-content-end">
            <div className="col-xl-6">
              <div className="row">
                {socialLinks.map((socialLink) => {
                  return (
                    <SocialLink socialLink={socialLink} key={socialLink.name} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialLinks;
