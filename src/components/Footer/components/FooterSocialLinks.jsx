import { Link } from "react-router-dom";

import facebookIcon from "../assets/images/icons/facebookIcon.svg";
import instgramIcon from "../assets/images/icons/instgramIcon.svg";
import youtubeIcon from "../assets/images/icons/youtubeIcon.svg";

function SocialLinks() {
  const socialLinks = [
    {
      name: "instgramIcon",
      icon: instgramIcon,
      alt: "Instgram",
    },
    {
      name: "facebookIcon",
      icon: facebookIcon,
      alt: "Facebook",
    },
    {
      name: "YoutubeIcon",
      icon: youtubeIcon,
      alt: "Youtube",
    },
  ];
  return (
    <>
      <div className="col-sm-6 col-xl-5">
        <div className="right ">
          <div className="icons row justify-content-end">
            <div className="col-xl-6">
              <div className="row">
                {socialLinks.map((socialLink) => {
                  return (
                    <div className="col" key={socialLink.name}>
                      <div className={socialLink.name}>
                        <Link>
                          <img src={socialLink.icon} alt={socialLink.alt} />
                        </Link>
                      </div>
                    </div>
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
