import FooterBrandDescription from "./components/FooterBrandDescription";
import FooterLogo from "./components/FooterLogo";
import TextDivider from "./components/TextDivider";

function FooterBrand() {
  return (
    <div
      className="row
       flex-column flex-xl-row
       align-items-xl-start align-items-md-center
       gy-3"
    >
      <FooterLogo />
      <TextDivider />
      <FooterBrandDescription />
    </div>
  );
}

export default FooterBrand;
