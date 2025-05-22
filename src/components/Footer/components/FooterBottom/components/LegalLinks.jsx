import { legalLinks } from "../../../data/footerData";
import LegalLink from "./LegalLink";

function LegalLinks() {
  return (
    <div className="col-sm-12 col-xl-4">
      <div
        className="row 
        flex-column flex-sm-row
        align-content-center 
        align-items-sm-center 
        g-4"
      >
        {legalLinks.map((legalLink) => {
          return (
            <div className="col-6" key={legalLink.name}>
              <LegalLink legalLink={legalLink} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LegalLinks;
