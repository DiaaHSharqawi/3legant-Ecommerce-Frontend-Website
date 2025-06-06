//import "./assets/css/login.css";
import registerImage from "./assets/images/watchLogin.png";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./assets/css/register.css";
import axios from "axios";

function Register() {
  const [userInfoRegister, setUserInfoRegister] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const userRegister = async (userRegisterInfoFormData) => {
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/auth/signup`;
    try {
      const { data } = await axios.post(API_URL, userRegisterInfoFormData);
      setUserInfoRegister(data);
      return data;
    } catch (error) {
      setLoader(false);
      throw error;
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

  const [showPassword, setShowPassword] = useState(false);
  const [userRegisterInfo, setUserRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    image: "",
  });

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handelSubmit = async (e) => {
    let result;
    e.preventDefault();
    setLoader(true);
    console.log(userRegisterInfo.image);
    try {
      const userRegisterFormData = new FormData();
      userRegisterFormData.append("userName", userRegisterInfo.username);
      console.log(userRegisterFormData.get("userName"));
      userRegisterFormData.append("email", userRegisterInfo.email);
      userRegisterFormData.append("password", userRegisterInfo.password);
      userRegisterFormData.append("image", userRegisterInfo.image);
      result = await userRegister(userRegisterFormData);
      console.log(result);

      if (result.message == "success") {
        toast.success("Successfully registered", {
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
        navigate(`/auth/login`);
      } else {
        console.log("error");
        toast.error(
          `Error while Register , Please make sure to enter valid data `,
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
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        toast.error(`email already exists`, {
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
    console.log("hadel input change");
    const { name, value } = e.target;
    setUserRegisterInfo({
      ...userRegisterInfo,
      [name]: value,
    });
  };

  const handelImageChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const { name, files } = e.target;
    console.log(name, files[0]);
    setUserRegisterInfo({
      ...userRegisterInfo,
      [name]: files[0],
    });
  };

  const handelPhoneChange = (value) => {
    setUserRegisterInfo({
      ...userRegisterInfo,
      phone: value,
    });
  };

  return (
    <>
      <section className="register  my-5">
        <div className="container">
          <div className="row flex-column flex-xl-row">
            <div className="col left align-selft-center">
              <div className="register-image d-flex  justify-content-sm-center justify-content-xl-start">
                <img src={registerImage} alt="3legant" className="img-fluid" />
              </div>
            </div>
            <div className="col right text-center my-5">
              <div className="row flex-column gap-3">
                <div className="header">
                  <h2>Sign up</h2>
                  <span className="d-flex gap-3 justify-content-center my-3">
                    Already have an account?
                    <Link
                      className="nav-link sign-up-link d-inline-block"
                      to="/auth/login"
                    >
                      Sign in
                    </Link>
                  </span>
                </div>
                <div className="signUp-form">
                  <form
                    action=""
                    onSubmit={handelSubmit}
                    className="needs-validation"
                    noValidate
                  >
                    <div className="row gap-3">
                      <div className="col-12">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label
                                htmlFor="username"
                                className="w-100 text-start"
                              >
                                Username
                              </label>
                              <input
                                type="username"
                                className="form-control"
                                id="username"
                                name="username"
                                onChange={handelInputChange}
                                required
                              />
                              <div className="valid-feedback">Looks good!</div>
                              <div className="invalid-feedback">
                                Please choose a username.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label
                                htmlFor="email"
                                className="w-100 text-start"
                              >
                                Email address
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
                                autoComplete="current-password"
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
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label
                                htmlFor="address"
                                className="w-100 text-start"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                onChange={handelInputChange}
                                placeholder="Palestine, Nablus"
                              />
                              <div className="valid-feedback">Looks good!</div>
                              <div className="invalid-feedback">
                                Please choose an Address
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label
                                htmlFor="phone"
                                className="w-100 text-start"
                              >
                                Phone
                              </label>

                              <PhoneInput
                                defaultCountry="PS"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={userRegisterInfo.phone}
                                onChange={handelPhoneChange}
                              />
                              <div className="valid-feedback">Looks good!</div>
                              <div className="invalid-feedback">
                                Please choose a valid phone.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-12">
                              <label
                                htmlFor="profile-image"
                                className="form-label text-start w-100"
                              >
                                Profile image
                              </label>
                            </div>
                            <div className="col">
                              <input
                                type="file"
                                name="image"
                                id="image"
                                className="form-control"
                                onChange={handelImageChange}
                                required
                              />
                              <div className="valid-feedback">Looks good!</div>
                              <div className="invalid-feedback">
                                Please choose an Image.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 my-4">
                      <div className="row flex-sm-column flex-xl-row align-items-center">
                        <div className="col-12">
                          <div className="form-check form-check-inline d-flex gap-3 align-items-center w-100">
                            <input
                              type="checkbox"
                              className="input-check-box"
                              id="flexCheckDefault"
                              onChange={handelInputChange}
                              required
                            />

                            <label
                              className="form-check-label text-start w-100"
                              htmlFor="flexCheckDefault"
                            >
                              I agree with{" "}
                              <span className="fw-bold"> Privacy Policy </span>
                              and
                              <span className="fw-bold"> Terms of Use</span>
                            </label>
                          </div>
                          <div className="invalid-feedback w-100 d-block">
                            You must agree before submitting.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <input
                        type="submit"
                        value="Sign up"
                        className="btn btn-outline-dark"
                        disabled={loader}
                      />
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

export default Register;
