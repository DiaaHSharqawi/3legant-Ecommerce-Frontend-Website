import React from "react";
import "./assets/css/footer.css";
import { Link } from "react-router-dom";
import whiteLogo from "./assets/images/whiteLogo.svg";
import instgramIcon from "./assets/images/icons/instgramIcon.svg";
import facebookIcon from "./assets/images/icons/facebookIcon.svg";
import youtubeIcon from "./assets/images/icons/youtubeIcon.svg";
function Footer() {
  return (
    <footer>
      <div className="Footer-Section text-white">
        <div className="container">
          <div className="row align-content-center">
            <div className="up">
              <div className="row flex-column flex-lg-row justify-contect-center align-items-center text-center ">
                <div className="col-6 gap-5">
                  <div className="row flex-column flex-xl-row align-items-xl-start align-items-md-center gy-3 ">
                    <div className=" col col-xl-3">
                      <div className="logo mx-sm-auto mx-lg-auto w-100">
                        <img src={whiteLogo} alt="" />
                      </div>
                    </div>
                    <div className="col col-xl-1">
                      <div className="vr d-xl-block d-none"></div>
                      <div className="smallLine d-sm-block d-xl-none mx-auto "></div>
                    </div>
                    <div className=" col col-xl-6 ">
                      <p className="text-white mx-sm-auto mx-lg-auto">
                        Multipurpose eCommerce website
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6  text-white my-5 ">
                  <ul className="footer-nav mx-auto  d-flex  gap-5 flex-column flex-sm-column flex-lg-row align-items-xl-start align-items-md-center justify-content-end">
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-capitalize"
                        aria-current="page"
                        to="/"
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
                    <li className="nav-item">
                      <Link className="nav-link text-capitalize ">
                        contact us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="vh my-1"></div>
            <div className="down text-center my-3">
              <div className="row gx-5  gy-sm-5 flex-sm-column-reverse justify-content-sm-center flex-xl-row align-content-center">
                <div className="col-sm-6 col-xl-7">
                  <div className="left row flex-sm-column flex-xl-row gy-3">
                    <div className=" col-xl-6">
                      <p>Copyright © 2024 done by Diaa Sharqawi </p>
                    </div>
                    <div className="col">
                      <div className="row ">
                        <div className="col-6">
                          <Link className="nav-link">Privacy Policy</Link>
                        </div>
                        <div className="col-6 ">
                          <Link className="nav-link">Terms of Use</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-5">
                  <div className="right ">
                    <div className="icons row justify-content-end">
                      <div className="col-xl-6">
                        <div className="row">
                          <div className="col">
                            <div className="instgramIcon">
                              <Link>
                                <img src={instgramIcon} alt="instgram" />
                              </Link>
                            </div>
                          </div>
                          <div className="col">
                            <div className="facebookIcon">
                              <Link>
                                <img src={facebookIcon} alt="facebook" />
                              </Link>
                            </div>
                          </div>
                          <div className="col align-self-end">
                            <div className="youtubeIcon">
                              <Link>
                                <img src={youtubeIcon} alt="youtube" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
