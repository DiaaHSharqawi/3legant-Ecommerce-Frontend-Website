import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCartCountContext } from "../../contexts/useCartCount/useCartCount";
import { UserLoginContext } from "../../contexts/useLogin/useLogin";
import { UserOrderCountContext } from "../../contexts/useOrderCount/useOrderCount";
import Logo from "../Logo/Logo";
import style from "./assets/css/navbar.module.css";
import cartIcon from "./assets/images/icons/cartIcon.svg";
import orderIcons from "./assets/images/icons/orderIcons.svg";
import profileIcon from "./assets/images/icons/profileIcon.svg";

function Navbar() {
  const { userName, setUserName, isLogin, setUserToken, setIsLogin } =
    useContext(UserLoginContext);
  const { cartCount } = useContext(UserCartCountContext);
  const { orderCount } = useContext(UserOrderCountContext);

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
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/cart">
                            <div className={`cart ${style.cart}`}>
                              <img src={cartIcon} alt="cartIcon" />
                              <div className={`cartCount ${style.cartCount}`}>
                                {cartCount}
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/userOrders">
                            <div className={`cart ${style.cart}`}>
                              <img src={orderIcons} alt="cartIcon" />
                              <div className={`cartCount ${style.cartCount}`}>
                                {orderCount}
                              </div>
                            </div>
                          </Link>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
                <div className="col-2">
                  <div className="user-menu d-none d-lg-block">
                    <ul className="navbar-nav mx-auto">
                      <li className="nav-item">
                        <Link className="nav-link">
                          <img src={profileIcon} alt="profileIcon" />
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {userName}
                        </a>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          {
                            <>
                              {isLogin ? (
                                <>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to="/user/profile"
                                    >
                                      Profile
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      onClick={logout}
                                    >
                                      Logout
                                    </Link>
                                  </li>
                                </>
                              ) : (
                                <li>
                                  <Link
                                    className="dropdown-item"
                                    to="/auth/login"
                                  >
                                    Login
                                  </Link>
                                </li>
                              )}
                            </>
                          }

                          <li>
                            <hr className="dropdown-divider"></hr>
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
