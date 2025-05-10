import { Link } from "react-router-dom";

function FooterBottom() {
  const date = new Date();
  const fullYear = date.getFullYear();

  const legalLinks = [
    {
      name: "Privacy Policy",
      path: "",
    },
    {
      name: "Terms of Use",
      path: "",
    },
  ];

  return (
    <div className="col-sm-6 col-xl-7">
      <div className="left row flex-sm-column flex-xl-row gy-3">
        <div className=" col-xl-6">
          <p>Copyright © {fullYear} done by Diaa Sharqawi </p>
        </div>
        <div className="col">
          <div className="row ">
            {legalLinks.map((legalLink) => {
              return (
                <div className="col-6" key={legalLink.name}>
                  <Link className="nav-link">{legalLink.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
