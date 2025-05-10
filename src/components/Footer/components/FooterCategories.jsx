import { Link } from "react-router-dom";

function FooterCategories() {
  const footerCategories = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "categories",
      path: "/categories",
    },
    {
      name: "products",
      path: "/products",
    },
    {
      name: "contact us",
      path: "/contact-us",
    },
  ];

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
          <li className="nav-item" key={footerCategory.name}>
            <Link
              className="nav-link active text-capitalize"
              aria-current="page"
              to={footerCategory.path}
            >
              {footerCategory.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default FooterCategories;
