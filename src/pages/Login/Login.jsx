import "./assets/css/login.css";
import loginImage from "./assets/images/LoginImage.png";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "../../contexts/useLogin/useLogin";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userLoginInfo, setUserLoginInfo] = useState([
    {
      email: "",
      password: "",
    },
  ]);
  const [loader, setLoader] = useState(false);
  const { setUserToken } = useContext(UserLoginContext);
  {
    (function () {
      "use strict";

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  }
  const getUserLoginData = async () => {
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/auth/signin`;
    try {
      console.log(userLoginInfo);
      const { data } = await axios.post(API_URL, userLoginInfo);
      console.log("data ===>", data);
      localStorage.setItem("userToken", data.token);
      console.log(setUserToken);
      setUserToken(data.token);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  };
  const validateLoginData = async () => {
    let userLoginSchema = object({
      email: string().email().required(),
      password: string().password().required(),
    });
    try {
      await userLoginSchema.validate(userLoginInfo);
      toast("yes");
    } catch (error) {
      return error;
    }
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const result = await getUserLoginData();
      console.log("result :");
      console.log(result);
      if ((result.message = "success")) {
        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        navigate(`/`);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      // console.log(error.response);
      const errorContext = JSON.stringify(error);
      console.log(errorContext);
      if (error.response.data.message == "data invalid") {
        toast.error("Invalid Username or Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else if (error.response.data.message == "plz confirm your email") {
        toast.error("Please Make sure to confirm you email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  const handelInputChange = (e) => {
    console.log("handel");
    e.preventDefault();
    const { name, value } = e.target;
    setUserLoginInfo({
      ...userLoginInfo,
      [name]: value,
    });
    console.log("user login info : ", userLoginInfo);
  };

  return (
    <>
      <section className="login my-5">
        <div className="container">
          <div className="row flex-column flex-xl-row">
            <div className="col left">
              <div className="login-image d-flex  justify-content-sm-center justify-content-xl-start">
                <img src={loginImage} alt="3legant" className="img-fluid" />
              </div>
            </div>
            <div className="col right text-center my-5">
              <div className="row flex-column gap-3">
                <div className="header">
                  <h2>Sign In</h2>
                  <span className="d-flex gap-3 justify-content-center my-3">
                    Don’t have an accout yet?
                    <Link
                      className="nav-link sign-up-link d-inline-block"
                      to="/auth/register"
                    >
                      Sign Up
                    </Link>
                  </span>
                </div>
                <div className="signIn-form">
                  <form
                    action=""
                    onSubmit={handelSubmit}
                    className="needs-validation"
                  >
                    <div className="row gap-4">
                      <div className="col-12">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label
                                htmlFor="email"
                                className="w-100 text-start"
                              >
                                Your email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={handelInputChange}
                                required
                              />
                              <div className="valid-feedback">Looks good!</div>
                              <div className="invalid-feedback">
                                Please choose a valid Email.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <div className="row">
                            <label
                              htmlFor="password"
                              className="w-100 text-start"
                            >
                              Password
                            </label>

                            <div className="col-11">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control"
                                onChange={handelInputChange}
                                required
                              />
                              <div className="valid-feedback">Looks good!</div>
                              <div className="invalid-feedback">
                                Please choose a valid Password.
                              </div>
                            </div>
                            <div className="col-1">
                              <div
                                className={!showPassword ? "d-none" : "d-block"}
                                onClick={toggleShowPassword}
                              >
                                <svg
                                  height="40"
                                  width="40"
                                  data-slot="icon"
                                  fill="none"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  ></path>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  ></path>
                                </svg>
                              </div>
                              <div
                                className={showPassword ? "d-none" : "d-block"}
                                onClick={toggleShowPassword}
                              >
                                <svg
                                  height="40px"
                                  width="40px"
                                  data-slot="icon"
                                  fill="none"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="row flex-column flex-xl-row align-items-center">
                          <div className="col-6">
                            <div className="form-check d-flex gap-3 align-items-center justify-content-sm-center justify-content-xl-start ">
                              <input
                                type="checkbox"
                                className="input-check-box"
                                id="flexCheckDefault"
                              />

                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="forget-password d-flex h-100 align-items-center justify-content-center justify-content-xl-end">
                              <Link
                                className="forget-password nav-link fw-bold"
                                to={"/auth/forget-password"}
                              >
                                Forgot password?
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <input
                          type="submit"
                          value="Sign In"
                          className="btn btn-outline-dark"
                          disabled={loader ? true : null}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
