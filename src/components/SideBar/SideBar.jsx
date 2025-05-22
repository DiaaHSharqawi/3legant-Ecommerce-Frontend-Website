import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100"
        style={{ width: 280 }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <svg className="bi me-2" width={40} height={32}>
            <use xlinkHref="#bootstrap" />
          </svg>
          <span className="fs-4">User Profile</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              href="#"
              className="nav-link active"
              aria-current="page"
              to={"/user/profile"}
            >
              <svg className="bi me-2" width={16} height={16}>
                <use xlinkHref="#home" />
              </svg>
              Home
            </Link>
          </li>

          <li>
            <Link href="#" className="nav-link link-dark">
              <svg className="bi me-2" width={16} height={16}>
                <use xlinkHref="#table" />
              </svg>
              Orders
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </>
  );
}

export default SideBar;
