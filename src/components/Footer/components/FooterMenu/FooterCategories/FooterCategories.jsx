import { footerCategories } from "../../data/footerData";
import FooterCategory from "./components/FooterCategory";

function FooterCategories() {
  return (
    <ul
      className="footer-nav mx-auto
       d-flex gap-5 flex-column
       flex-sm-column flex-lg-row
       align-items-xl-start 
       align-items-md-center 
       justify-content-end"
    >
      {footerCategories.map((footerCategory) => {
        return (
          <FooterCategory category={footerCategory} key={footerCategory.name} />
        );
      })}
    </ul>
  );
}

export default FooterCategories;
