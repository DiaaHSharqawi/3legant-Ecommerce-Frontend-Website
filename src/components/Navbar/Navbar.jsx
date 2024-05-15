import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import profileIcon from "./assets/images/icons/profileIcon.svg";
import cartIcon from "./assets/images/icons/cartIcon.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/navbar.module.css";
import { UserLoginContext } from "../../contexts/useLogin/useLogin";
function Navbar() {
  const { userName, setUserName, isLogin, setUserToken, setIsLogin } =
    useContext(UserLoginContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserName(null);
    setIsLogin(false);
    console.log(userName);
  };

  useEffect(() => {
    // navigate("/auth/login");
  }, [isLogin]);

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
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNav"
            >
              <div className="row flex-row  w-100">
                <div className="col-10">
                  <ul className="navbar-nav fs-5 gap-4 justify-content-center">
                    <li className="nav-item d-sm-block d-xl-none">
                      <Link
                        className="nav-link active text-capitalize"
                        aria-current="page"
                        to="/user/profile"
                      >
                        profile
                      </Link>
                    </li>

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
                      <Link
                        className="nav-link text-capitalize"
                        to="/categories"
                      >
                        categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-capitalize" to="/products">
                        products
                      </Link>
                    </li>
                    {/*
                  <li className="nav-item">
                    <Link className="nav-link text-capitalize ">
                      contact us
                    </Link>
                  </li>
                  */}
                    {isLogin ? (
                      <li className="nav-item">
                        <Link className="nav-link">
                          <img src={cartIcon} alt="cartIcon" />
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </div>
                <div className="col-2">
                  <div className="user-menu d-none d-lg-block">
                    <ul className="navbar-nav mx-auto">
                      {/*
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        color="red-text"
                      >
                        <img src={searchIcon} alt="searchIcon" />
                      </Link>
                    </li>
                    */}
                      <li className="nav-item">
                        <Link className="nav-link">
                          <img src={profileIcon} alt="profileIcon" />
                        </Link>
                      </li>
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {userName}
                        </a>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          {
                            <>
                              {isLogin ? (
                                <>
                                  <li>
                                    <Link
                                      class="dropdown-item"
                                      to="/user/profile"
                                    >
                                      Profile
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      class="dropdown-item"
                                      onClick={logout}
                                    >
                                      Logout
                                    </Link>
                                  </li>
                                </>
                              ) : (
                                <li>
                                  <Link class="dropdown-item" to="/auth/login">
                                    Login
                                  </Link>
                                </li>
                              )}
                            </>
                          }

                          <li>
                            <hr class="dropdown-divider"></hr>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
