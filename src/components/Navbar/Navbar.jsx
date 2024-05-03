import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import searchIcon from "./assets/images/icons/searchIcon.svg";
import profileIcon from "./assets/images/icons/profileIcon.svg";
import cartIcon from "./assets/images/icons/cartIcon.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/navbar.module.css";
function Navbar() {
  return (
    <>
      <div className="container container-lg mt-4">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link className="navbar-brand" href="#">
              <Logo />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto fs-5 gap-4">
                <li className="nav-item">
                  <Link
                    className="nav-link active text-capitalize"
                    aria-current="page"
                    href="#"
                  >
                    home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-capitalize" href="#">
                    categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-capitalize" href="#">
                    products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-capitalize ">contact us</Link>
                </li>
              </ul>
              <div className="user-menu d-none d-lg-block">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                      color="red-text"
                    >
                      <img src={searchIcon} alt="searchIcon" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="#">
                      <img src={profileIcon} alt="profileIcon" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="#">
                      <img src={cartIcon} alt="cartIcon" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
