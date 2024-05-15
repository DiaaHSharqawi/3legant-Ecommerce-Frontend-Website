import React, { useEffect, useState } from "react";
import "./assets/css/setNewPassword.css";
import verifyCodeImage from "./assets/images/verifyCode.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
function SetNewPassword() {
  const [userRestorePassword, setUserRestorePassword] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [loader, setLoader] = useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const passedEmail = location.state && location.state.email;

  console.log("passedEmail", passedEmail);
  useEffect(() => {
    setUserRestorePassword({
      ...userRestorePassword,
      email: passedEmail,
    });
  }, []);
  const verifyCode = async () => {
    console.log("after set email", userRestorePassword);
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/auth/forgotPassword`;
    try {
      console.log("verfy code", userRestorePassword);
      console.log("-----------------------");
      const { data } = await axios.patch(API_URL, userRestorePassword);
      console.log(data);
      return data;
    } catch (error) {
      console.log("error while setting new password.");
      // console.log(error);
      throw error;
    }
  };
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleShowCode = (e) => {
    e.preventDefault();
    setShowCode(!showCode);
  };

  const handelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("handel input change : ", name, value);
    setUserRestorePassword({
      ...userRestorePassword,
      [name]: value,
    });
    console.log(userRestorePassword);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const result = await verifyCode();
      console.log(`result is :${result}`);
      console.log(result);
      if ((result.message = "success")) {
        toast.success(
          "Password Changed!\n Your password has been changed successfully.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );

        navigate(`/auth/login`);
      }
    } catch (error) {
      console.log("userRestorePassword");

      console.log(userRestorePassword);
      console.log(error);
      console.log(error.response);
      const errorContext = JSON.stringify(error);
      console.log(errorContext);
      if (error.response.data.message == "invalid code") {
        toast.error("Invalid Code", {
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
      } else if (error.response.data.message == "same password") {
        toast.error(
          "Same password ! , Please Make sure to Enter a new and strong password !",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
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
      } else {
        toast.error(`${error.response.data.message}`, {
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
    } finally {
      setLoader(false);
    }
  };

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

  return (
    <>
      <section className="Verify-Code-Section my-5 f-family-Poppins">
        <div className="container">
          <div className="row flex-sm-column-reverse flex-xl-row  justify-content-center">
            <div className="col-12 col-xl-6">
              <div className="row h-100 flex-column justify-content-center">
                <div className="left">
                  <div className="row align-items-center gap-3">
                    <div className="heading">
                      <div className="return-to-login my-3">
                        <Link to="/auth/login" className="nav-link">
                          <div className="row">
                            <div className="col-1">
                              <div className="return-symbol">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M6.14848 7.86165L3.52734 5.24052L6.14848 2.61938"
                                    stroke="#313131"
                                    strokeWidth="0.582474"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="col-11">
                              <div className="back-to-login ">
                                <span>Back to login</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="row gap-4">
                        <div className="col-12">
                          <h1>Verify code</h1>
                        </div>
                        <div className="col-12">
                          <p>
                            An authentication code has been sent to your email.
                          </p>
                        </div>
                        <div className="col-12">
                          <div className="verify-code-form px-0 my-3">
                            <form
                              action=""
                              onSubmit={handelSubmit}
                              className="needs-validation"
                            >
                              <div className="row gap-3">
                                <div className="col-12">
                                  <div className="form-group">
                                    <div className="row gap-4">
                                      <div className="col-12">
                                        <div className="form-group">
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
                                            value={userRestorePassword.email}
                                            required
                                          />
                                          <div className="valid-feedback">
                                            Looks good!
                                          </div>
                                          <div className="invalid-feedback">
                                            Please choose a valid email.
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
                                            <div className="row gx-2">
                                              <div className="col-11">
                                                <input
                                                  type={
                                                    !showPassword
                                                      ? "text"
                                                      : "password"
                                                  }
                                                  id="password"
                                                  name="password"
                                                  className="form-control"
                                                  onChange={handelInputChange}
                                                  required
                                                />
                                                <div className="valid-feedback">
                                                  Looks good!
                                                </div>
                                                <div className="invalid-feedback">
                                                  Please choose a valid
                                                  Password.
                                                </div>
                                              </div>
                                              <div className="col-1">
                                                <div className="row mx-3">
                                                  <div
                                                    className={
                                                      showPassword
                                                        ? "d-none"
                                                        : "d-block"
                                                    }
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
                                                    className={
                                                      !showPassword
                                                        ? "d-none"
                                                        : "d-block"
                                                    }
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
                                        </div>
                                      </div>
                                      <div className="col-12">
                                        <div className="form-group">
                                          <div className="row">
                                            <label
                                              htmlFor="code"
                                              className="w-100 text-start"
                                            >
                                              Code
                                            </label>
                                            <div className="row gx-2">
                                              <div className="col-11">
                                                <input
                                                  type={
                                                    toggleShowCode
                                                      ? "text"
                                                      : "password"
                                                  }
                                                  id="code"
                                                  name="code"
                                                  className="form-control"
                                                  onChange={handelInputChange}
                                                  required
                                                />
                                                <div className="valid-feedback">
                                                  Looks good!
                                                </div>
                                                <div className="invalid-feedback">
                                                  Please choose a valid Code.
                                                </div>
                                              </div>
                                              <div className="col-1">
                                                <div className="row mx-3">
                                                  <div
                                                    className={
                                                      !showCode
                                                        ? "d-none"
                                                        : "d-block"
                                                    }
                                                    onClick={toggleShowCode}
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
                                                    className={
                                                      showCode
                                                        ? "d-none"
                                                        : "d-block"
                                                    }
                                                    onClick={toggleShowCode}
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
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col">
                                  <input
                                    type="submit"
                                    value="Set password"
                                    className="btn btn-outline-primary w-100"
                                    disabled={loader ? true : false}
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="right">
                <div className="verify-code-image my-5">
                  <div className="row justify-content-center">
                    <div className="col-12 text-center">
                      <img
                        src={verifyCodeImage}
                        alt="verify Code Image"
                        className="img-fluid h-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SetNewPassword;
