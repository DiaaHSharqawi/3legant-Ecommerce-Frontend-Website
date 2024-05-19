import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart/useCart";
import removeIcon from "./assets/images/icons/removeIcon.svg";
import style from "./assets/css/cart.module.css";
import { Bounce, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { UserCartCountContext } from "../../contexts/useCartCount/useCartCount";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [increaseQuantityLoader, setIncreaseQuantityLoader] = useState(null);
  const [decreaseQuantityLoader, setDecreaseQuantityLoader] = useState(false);
  const EXPRESS_SHIPPING_METHODE = 15;
  const PICKUP_METHODE = 21 / 100;
  const [isMethodeShippingSeleced, setIsMethodeShippingSeleced] =
    useState(false);
  const [clearCartLoader, setClearCartLoader] = useState(false);

  const [shippingMethodeWay, setShippingMethodeWay] = useState("");

  console.log("im in cart");
  const {
    cartProducts,
    setCartProducts,
    loader,
    setLoader,
    subTotal,
    setSubTotal,
    getSubTotal,
  } = useCart();

  const [totalSum, setTotalSum] = useState(subTotal);

  const { cartCount, setCartCount } = useContext(UserCartCountContext);
  const navigate = useNavigate();

  const increaseQuantity = async (e, productID) => {
    e.preventDefault();
    try {
      setIncreaseQuantityLoader(productID);
      console.log(productID);
      const BASE_API_URL = import.meta.env.VITE_API_URL;
      const API_URL = `${BASE_API_URL}/cart/incraseQuantity`;
      const token = localStorage.getItem("userToken");
      console.log("token : ", token);
      if (token) {
        const { data } = await axios.patch(
          API_URL,
          {
            productId: productID,
          },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        if (data.message == "success") {
          console.log("data inc", data);
          //setQuantity(data.count);
        } else
          toast.error(`${data.message}`, {
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
    } catch (error) {
      console.log(error);
    } finally {
      setIncreaseQuantityLoader(null);
    }
  };

  const decreaseQuantity = async (e, productID) => {
    e.preventDefault();
    try {
      setDecreaseQuantityLoader(productID);
      console.log(productID);
      const BASE_API_URL = import.meta.env.VITE_API_URL;
      const API_URL = `${BASE_API_URL}/cart/decraseQuantity`;
      const token = localStorage.getItem("userToken");
      console.log("token : ", token);
      if (token) {
        const { data } = await axios.patch(
          API_URL,
          {
            productId: productID,
          },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        if (data.message == "success") {
          console.log("data dec", data);
          //setQuantity(data.count);
        } else
          toast.error(`${data.message}`, {
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
    } catch (error) {
      console.log(error);
    } finally {
      setDecreaseQuantityLoader(null);
    }
  };

  const removeItemFromCart = async (e, productID) => {
    try {
      setDecreaseQuantityLoader(productID);
      console.log(productID);
      const BASE_API_URL = import.meta.env.VITE_API_URL;
      const API_URL = `${BASE_API_URL}/cart/removeItem`;
      const token = localStorage.getItem("userToken");
      console.log("token : ", token);
      if (token) {
        const { data } = await axios.patch(
          API_URL,
          {
            productId: productID,
          },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        if (data.message == "success") {
          setCartProducts(
            cartProducts.filter((product) => product.productId !== productID)
          );

          setCartCount(cartCount - 1);
          //setQuantity(data.count);
        } else
          toast.error(`${data.message}`, {
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
    } catch (error) {
      console.log(error);
    } finally {
      setDecreaseQuantityLoader(null);
    }
  };

  const shippingMethode = (e) => {
    e.preventDefault();
    setIsMethodeShippingSeleced(true);
    const shippingMethode = e.target.id.toLowerCase();
    setShippingMethodeWay(shippingMethode);
    console.log(shippingMethode);
    if (shippingMethode == "freeshipping") {
      console.log(subTotal);
      setTotalSum(subTotal);
      setShippingMethodeWay("Free Shipping");
    } else if (shippingMethode === "expressshipping") {
      setTotalSum(subTotal + EXPRESS_SHIPPING_METHODE);
      setShippingMethodeWay("Express Shipping");
    } else if (shippingMethode === "pickup") {
      setTotalSum(subTotal * PICKUP_METHODE);
      setShippingMethodeWay("Pick Up");
    }
  };

  const handleSubmitCheckOut = (e) => {
    e.preventDefault();
    console.log("submit", isMethodeShippingSeleced);
    if (!isMethodeShippingSeleced) {
      toast.error(`Please make sure to select a Shipping Methode`, {
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
      navigate(`/createOrder`, {
        state: {
          shippingMethodeWay: shippingMethodeWay,
          totalSum: totalSum,
        },
      });
    }
  };

  const clearCart = async () => {
    try {
      setClearCartLoader(true);
      const BASE_API_URL = import.meta.env.VITE_API_URL;
      const API_URL = `${BASE_API_URL}/cart/clear`;
      const token = localStorage.getItem("userToken");
      console.log(`Tariq__${token}`);
      console.log("token : ", token);
      if (token) {
        const { data } = await axios.patch(
          API_URL,
          {},
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        if (data.message == "success") {
          setCartCount(0);
          setCartProducts([]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setClearCartLoader(false);
    }
  };

  const handelClearCart = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to clear the cart?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
      width: "80%",
      heightAuto: false, // Disable automatic height adjustment
      scrollbarPadding: true, // Enable scrollbar
      center: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Cleared successfuly!", "", "success");
        await clearCart();
      } else if (result.isDenied) {
      }
    });
  };

  useEffect(() => {
    setTotalSum(subTotal);
  }, [subTotal]);

  useEffect(() => {
    const sum = getSubTotal();
    setSubTotal(sum);
  }, [increaseQuantityLoader, decreaseQuantityLoader]);

  return (
    <>
      <div className="CartSection my-5">
        <div className="container">
          <div className="row justify-content-center flex-column flex-xl-row">
            <div className="col-12">
              <h1 className="text-center">Cart</h1>
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
                <div className="cartTable">
                  <div className="row my-5 flex-column flex-xl-row">
                    <div className="col-12 col-xl-6">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Product</th>
                            <th scope="col" className="d-none d-xl-table-cell">
                              Quantity
                            </th>
                            <th scope="col" className="d-none d-xl-table-cell">
                              Price
                            </th>
                            <th scope="col" className="d-none d-xl-table-cell">
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
                                              <div
                                                class="input-group w-auto justify-content-start align-items-start
                                      gap-1"
                                              >
                                                <input
                                                  type="button"
                                                  value="-"
                                                  class="button-minus border icon-shape icon-sm mx-1 "
                                                  data-field="quantity"
                                                  disabled={
                                                    decreaseQuantityLoader ==
                                                      product.productId ||
                                                    product.quantity <= 1
                                                  }
                                                  onClick={(e) => {
                                                    decreaseQuantity(
                                                      e,
                                                      product.productId
                                                    );
                                                    product.quantity--;
                                                    //  getSubTotal();
                                                  }}
                                                />

                                                <span>{product.quantity}</span>

                                                <input
                                                  type="button"
                                                  value="+"
                                                  class="button-plus border icon-shape icon-sm "
                                                  data-field="quantity"
                                                  onClick={(e) => {
                                                    increaseQuantity(
                                                      e,
                                                      product.productId
                                                    );
                                                    product.quantity++;
                                                    //   getSubTotal();
                                                  }}
                                                  disabled={
                                                    increaseQuantityLoader ==
                                                    product.productId
                                                  }
                                                />
                                              </div>
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
                                    <div class="col-12 px-0">
                                      <div
                                        class="input-group w-auto justify-content-start align-items-start
                                      gap-1"
                                      >
                                        <input
                                          type="button"
                                          value="-"
                                          class="button-minus border icon-shape icon-sm mx-1 "
                                          data-field="quantity"
                                          disabled={
                                            decreaseQuantityLoader ==
                                              product.productId ||
                                            product.quantity <= 1
                                          }
                                          onClick={(e) => {
                                            decreaseQuantity(
                                              e,
                                              product.productId
                                            );
                                            product.quantity--;
                                            //  getSubTotal();
                                          }}
                                        />

                                        <span>{product.quantity}</span>

                                        <input
                                          type="button"
                                          value="+"
                                          class="button-plus border icon-shape icon-sm "
                                          data-field="quantity"
                                          onClick={(e) => {
                                            increaseQuantity(
                                              e,
                                              product.productId
                                            );
                                            product.quantity++;
                                            //   getSubTotal();
                                          }}
                                          disabled={
                                            increaseQuantityLoader ==
                                            product.productId
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center d-none d-xl-table-cell">
                                {product.details.price}
                              </td>
                              <td className="text-center ">
                                {product.quantity * product.details.price}
                              </td>
                              <td>
                                {" "}
                                <div className="col-12 px-0 w-100 h-100">
                                  <div
                                    className={`remove w-100 ${style.remove}`}
                                    onClick={(e) =>
                                      removeItemFromCart(e, product.productId)
                                    }
                                    disabled={true}
                                  >
                                    <div className="row justify-content-center">
                                      <div className="col-4 px-0">
                                        <div className="removeIcon">
                                          <img
                                            src={removeIcon}
                                            alt="remove Icon"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-12 px-0 text-center d-none d-xl-block ">
                                        <span>Remove</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 col-xl-6 my-5">
                      <div className={`cartSummary ${style.cartSummary}`}>
                        <div className="row gap-3">
                          <p className="text-center">Cart summary</p>
                          <form onSubmit={handleSubmitCheckOut}>
                            <div className={`shippingMethode`}>
                              <div className="row justify-content-center gap-4">
                                <div
                                  className={`methode ${style.methode} freeShipping`}
                                >
                                  <div className="row">
                                    <div className="col-6">
                                      <div class="form-check">
                                        <div className="row">
                                          <div className="col-2">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="freeShipping"
                                              onClick={shippingMethode}
                                            />
                                          </div>
                                          <div className="col-10">
                                            <label
                                              class="form-check-label"
                                              for="freeShipping"
                                            >
                                              Free Shipping
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="text-end">
                                        <span>$0.00</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`methode ${style.methode} expressShipping`}
                                >
                                  <div className="row">
                                    <div className="col-6">
                                      <div class="form-check">
                                        <div className="row">
                                          <div className="col-2">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="expressShipping"
                                              onClick={shippingMethode}
                                            />
                                          </div>
                                          <div className="col-10">
                                            <label
                                              class="form-check-label"
                                              for="expressShipping"
                                            >
                                              Express Shipping
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="text-end">
                                        <span>+$15.0</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`methode ${style.methode} pickUp`}
                                >
                                  <div className="row">
                                    <div className="col-6">
                                      <div class="form-check">
                                        <div className="row">
                                          <div className="col-2">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="pickUp"
                                              id="pickUp"
                                              onClick={shippingMethode}
                                            />
                                          </div>
                                          <div className="col-10">
                                            <label
                                              class="form-check-label"
                                              for="pickUp"
                                            >
                                              Pick Up
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="text-end">
                                        <span>%21.00</span>
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
                                  <span class="fw-bold fs-5">${totalSum}</span>
                                </div>
                              </div>
                            </div>
                            <div className="checkOut">
                              <input
                                type="submit"
                                className="btn btn-dark w-100"
                                value="Check Out"
                              />
                            </div>
                            <div className="clearCart w-100 my-5">
                              <button
                                type="button"
                                class="btn btn-outline-danger w-100"
                                onClick={handelClearCart}
                              >
                                ClearCart
                              </button>
                            </div>
                          </form>
                        </div>
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

export default Cart;
