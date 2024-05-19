import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart/useCart";
import style from "./assets/css/createOrder.module.css";
import { Bounce, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { UserCartCountContext } from "../../contexts/useCartCount/useCartCount";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
function CreateOrder() {
  const { cartProducts, loader, subTotal } = useCart();
  const [orderInformation, setOrderInformation] = useState({
    couponName: "",
    address: "",
    phone: "",
  });

  const { cartCount, setCartCount } = useContext(UserCartCountContext);
  const location = useLocation();
  const shippingMethodeWay =
    location.state && location.state.shippingMethodeWay;
  console.log(location);
  const navigate = useNavigate();

  const [totalSum, setTotalSum] = useState(subTotal);

  useEffect(() => {
    setTotalSum(subTotal);
  }, [subTotal]);

  useEffect(() => {
    setTotalSum(location.state && location.state.totalSum);
  }, []);

  const handelInputChange = (e) => {
    e.preventDefault();
    console.log("hadel input change");
    const { name, value } = e.target;
    setOrderInformation({
      ...orderInformation,
      [name]: value,
    });
  };
  const handelPhoneChange = (value) => {
    setOrderInformation({
      ...orderInformation,
      phone: value,
    });
  };

  const handelOrderSubmit = async (e) => {
    e.preventDefault();
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/order`;
    try {
      const token = localStorage.getItem("userToken");
      console.log("handel token is ", token);
      if (token) {
        const { data } = await axios.post(API_URL, orderInformation, {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
        if (data.message == "success") {
          toast.success(
            ` Thank you for your order. Your order has been received and is currently pending activation. We will notify you once it is active.`,
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
          setCartCount(cartCount - 1);
          navigate("/");
        }
        console.log(data);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message == "coupon already used") {
        toast.error(`Coupon already used`, {
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
      } else if (error.response.data.message == "coupon not found") {
        toast.error(
          `Coupon not found, Please Make sure to Enter valid Copoun !`,
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
    } finally {
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
      <div className="CreateOrderSection my-5">
        <div className="container">
          <div className="row justify-content-center flex-column flex-xl-row">
            <div className="col-12">
              <h1 className="text-center">Create Order</h1>
            </div>
            <div className="col-12">
              {loader ? (
                <div className="loader mx-auto my-5 d-flex justify-content-center">
                  <Oval
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : cartCount > 0 ? (
                <div className="row">
                  <div className="col-6">
                    <div className="cartTable">
                      <div className="row my-5 flex-column">
                        <div className="col-12 col-xl-12">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Product</th>
                                <th
                                  scope="col"
                                  className="d-none d-xl-table-cell"
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="d-none d-xl-table-cell"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="d-none d-xl-table-cell"
                                >
                                  Subtotal
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartProducts.map((product) => (
                                <tr key={product.productId}>
                                  <th scope="row" className="w-100 w-xl-80">
                                    <div className="row flex-row flex-xl-row">
                                      <div className="col-6 col-xl-6 px-0">
                                        <div
                                          className={`productImage ${style.productImage} `}
                                        >
                                          <div className="row">
                                            <div className="col-12 col-xl-10">
                                              <img
                                                src={
                                                  product.details.mainImage
                                                    .secure_url
                                                }
                                                className="img-fluid w-100"
                                                alt={product.details.name}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6 col-xl-6 px-0">
                                        <div className="row gap-5 flex-column flex-xl-row ">
                                          <div className="col-12 px-0">
                                            <div className="productName">
                                              {product.details.name}
                                            </div>
                                          </div>
                                          <div className="col-12 d-block d-xl-none px-0">
                                            <div className="quantity w-100">
                                              <div className="row align-items-center justify-content-start">
                                                <div class="col-12 px-0">
                                                  <span>
                                                    Quantity :{product.quantity}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </th>
                                  <td className="px-0 d-none d-xl-table-cell">
                                    <div className="quantity w-100">
                                      <div className="row align-items-center justify-content-start">
                                        <span className="text-center">
                                          {product.quantity}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center d-none d-xl-table-cell">
                                    ${product.details.price}
                                  </td>
                                  <td className="text-center ">
                                    ${product.quantity * product.details.price}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="col-12 col-xl-12 my-3">
                          <div className={`cartSummary ${style.cartSummary}`}>
                            <div className="row gap-3">
                              <p className="text-center">Cart summary</p>

                              <div className={`shippingMethode`}>
                                <div className="row justify-content-center gap-4">
                                  <div
                                    className={`methode ${style.methode} freeShipping`}
                                  >
                                    <div className="row">
                                      <div className="col-6">
                                        <p>Methode Selected</p>
                                      </div>
                                      <div className="col-6">
                                        <div className="text-end">
                                          <span>{shippingMethodeWay}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="subTotal my-4">
                                <div className="row">
                                  <div className="col-6 px-0">
                                    <p className="fs-5">Subtotal</p>
                                  </div>
                                  <div className="col-6 text-end">
                                    <span class="fw-bold fs-5">
                                      ${cartProducts && subTotal}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <hr />
                              <div className="Total my-1">
                                <div className="row">
                                  <div className="col-6 px-0">
                                    <p className="fs-5">Total</p>
                                  </div>
                                  <div className="col-6 text-end">
                                    <span class="fw-bold fs-5">
                                      ${totalSum}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="order my-5">
                      <div className={`OrderForm ${style.OrderForm}`}>
                        <form
                          action=""
                          className="needs-validation"
                          noValidate
                          onSubmit={handelOrderSubmit}
                        >
                          <div className="row gap-3">
                            <div className="col-12">
                              <div className="form-group">
                                <div className="row">
                                  <div className="col">
                                    <label
                                      htmlFor="couponName"
                                      className="w-100 text-start"
                                    >
                                      couponName
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="couponName"
                                      name="couponName"
                                      onChange={handelInputChange}
                                    />
                                    <div className="valid-feedback">
                                      Looks good!
                                    </div>
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
                                      required
                                    />
                                    <div className="valid-feedback">
                                      Looks good!
                                    </div>
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
                                      value={orderInformation.phone}
                                      onChange={handelPhoneChange}
                                      required
                                    />
                                    <div className="valid-feedback">
                                      Looks good!
                                    </div>
                                    <div className="invalid-feedback">
                                      Please choose a valid phone.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 my-5">
                            <input
                              type="submit"
                              value="Order To Install"
                              className="btn btn-outline-dark w-100"
                              disabled={loader}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="noItemsFound h-100 my-5">
                  <div
                    className="row flex-column justify-content-center align-items-center h-100
                 gap-5"
                  >
                    <div className="col-12">
                      <div className="cartIcon">
                        <div className="row justify-content-center">
                          <svg
                            data-slot="icon"
                            fill="none"
                            stroke-width="1.5"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            width="150px"
                            height="150px"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row justify-content-center text-center">
                        <h3>No Items Found !</h3>
                        <p>Sorry matte ... no items found inside your cart</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
