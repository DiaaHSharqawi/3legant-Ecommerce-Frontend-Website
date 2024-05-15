import React, { useState } from "react";
import "./assets/css/forgetPassword.css";
import forgetPasswordImage from "./assets/images/forget-password-image.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
function ForgetPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
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
  const sendCode = async () => {
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/auth/sendcode`;
    try {
      console.log(`user email : ${userEmail}`);
      const { data } = await axios.patch(API_URL, {
        email: userEmail,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log("error send code :");
      console.log(error);
      throw error;
    }
  };

  const handelInputChange = (e) => {
    console.log("handel");
    e.preventDefault();
    const email = e.target.value;
    console.log(`handel change email is : ${email}`);
    setUserEmail(email);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const result = await sendCode();
      console.log(`result is :${result}`);
      console.log(result);
      if ((result.message = "success")) {
        toast.success(
          "Code sent! Check your email and enter it here to reset your password",
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

        navigate(`/auth/verify-code`, {
          state: {
            email: userEmail,
          },
        });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      const errorContext = JSON.stringify(error);
      console.log(errorContext);
      if (error.response.data.message == "data invalid") {
        toast.error("Invalid Email", {
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
      <section className="Forget-Password-Section my-5 f-family-Poppins">
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
                          <h1>Forgot your password?</h1>
                        </div>
                        <div className="col-12">
                          <p>
                            Don’t worry, happens to all of us. Enter your email
                            below to recover your password
                          </p>
                        </div>
                        <div className="col-12">
                          <div className="forget-password-form px-0 my-3">
                            <form
                              action=""
                              onSubmit={handelSubmit}
                              className="needs-validation"
                            >
                              <div className="row gap-4">
                                <div className="col-12">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-12">
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
                                        <div className="valid-feedback">
                                          Looks good!
                                        </div>
                                        <div className="invalid-feedback">
                                          Please choose a valid email.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col">
                                  <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-outline-primary w-100"
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
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="right">
                <div className="forget-password-image my-5">
                  <div className="row justify-content-center">
                    <div className="col-12 text-center">
                      <img
                        src={forgetPasswordImage}
                        alt="Forget Password"
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

export default ForgetPassword;
