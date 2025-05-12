import { legalLinks } from "./../../../data/footerData";
import LegalLink from "./LegalLink";

function LegalLinks() {
  return (
    <div className="col">
      <div className="row ">
        {legalLinks.map((legalLink) => {
          return <LegalLink legalLink={legalLink} key={legalLink.name} />;
        })}
      </div>
    </div>
  );
}

export default LegalLinks;
