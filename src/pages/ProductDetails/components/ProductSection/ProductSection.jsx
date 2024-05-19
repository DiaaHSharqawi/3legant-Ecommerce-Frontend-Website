import React, { useContext, useEffect, useState } from "react";
import style from "./../../assets/css/productDetails.module.css";
import { Oval } from "react-loader-spinner";
import useProduct from "./../../../../hooks/useProduct/useProduct";

import starIcon from "./../../assets/images/icons/starIconBlack.svg";
import emptyStarIcon from "./../../assets/images/icons/emptyStartIcon.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { UserCartCountContext } from "../../../../contexts/useCartCount/useCartCount";

function ProductSection({ loader, product, avgRating }) {
  const { productID } = useParams("productID");
  const navigate = useNavigate();
  const [addItemLoader, setAddItemsLoader] = useState(false);
  const { mainImage, setMainImage } = useProduct(productID);
  const [currentMainImage, setCurrentMainImage] = useState("");
  const [activeIndex, setActiveIndex] = useState("");
  const { setCartCount } = useContext(UserCartCountContext);

  useEffect(() => {
    if (product.mainImage) {
      setActiveIndex(product.mainImage.public_id);
      setCurrentMainImage(product.mainImage.secure_url);
    }
  }, []);

  //const [loader, setLoader] = useState(true);
  const STARS_NUMBERS = 5;
  const setNewMainImage = (e, id) => {
    e.preventDefault();
    console.log(e.target.src);
    setMainImage(e.target.src);
    setActiveIndex(id);
  };

  const addItemToCart = async (e, productID) => {
    e.preventDefault();
    setAddItemsLoader(true);
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/cart`;
    console.log(`api url : ${API_URL}`);
    try {
      const token = localStorage.getItem("userToken");
      console.log("token : ", token);
      if (token) {
        const { data } = await axios.post(
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
          toast.success("Item added to the cart successfuly", {
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
          // console.log("prod section", data);
          setCartCount(data.cart.products.length);
          navigate(`/cart`);
        }
      }
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);

      if (error.response.data.message == "product already exists") {
        toast.error("product already exists in the cart", {
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
      setAddItemsLoader(false);
    }
  };

  return (
    <>
      <div className="product">
        <div className="row flex-sm-column align-items-center flex-xl-row">
          <div className="col-sm-12 col-xl-6">
            <div className="start">
              <div className="row">
                <div className="col-12">
                  <div
                    className="row flex-column-reverse align-items-center 
                          justify-content-center flex-xl-row    "
                  >
                    <div className="col-sm-12 col-xl-4 my-5">
                      <div className={`subImages  ${style.subImages}`}>
                        <div
                          className="row flex-sm-row flex-xl-column 
                                 align-content-center "
                        >
                          <div className="col-3 col-xl-8 my-3 ">
                            <img
                              src={currentMainImage}
                              className={`img-fluid ${
                                activeIndex == currentMainImage.public_id
                                  ? style.active
                                  : style.notActive
                              }`}
                              onClick={(e) =>
                                setNewMainImage(e, currentMainImage.public_id)
                              }
                            />
                          </div>
                          {product.subImages &&
                            product.subImages.map((subImage) => (
                              <div className="col-3 col-xl-8 my-3">
                                <img
                                  key={subImage.public_id}
                                  src={subImage.secure_url}
                                  alt={``}
                                  className={`img-fluid ${
                                    activeIndex == subImage.public_id
                                      ? style.active
                                      : style.notActive
                                  }`}
                                  onClick={(e) =>
                                    setNewMainImage(e, subImage.public_id)
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-xl-8">
                      <div className="row justify-content-center">
                        <div
                          className={`mainImage h-sm-50 h-100 ${style.mainImage}`}
                        >
                          {product.mainImage && (
                            <img
                              src={mainImage}
                              className="img-fluid h-100 w-100"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="end">
              <div className="row justify-content-center my-5 gap-3">
                <div className="stars px-0">
                  <div className="row">
                    <div className="col-12 px-0">
                      <div className="row">
                        <div className="col-6 col-xl-3">
                          {Array.from(
                            { length: Math.ceil(avgRating) },
                            (_, index) => (
                              <img
                                key={index}
                                src={starIcon}
                                alt={`star ${index}`}
                              />
                            )
                          )}
                          {Array.from({ length: 5 - avgRating }, (_, index) => (
                            <img
                              key={index}
                              src={emptyStarIcon}
                              alt={`star ${index}`}
                            />
                          ))}
                        </div>
                        <div className="col-6 col-xl-9">
                          <p>
                            {product.reviews && product.reviews.length} Reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="productName">
                  <h1> {product.name}</h1>
                </div>
                <div
                  className={`productDescription ${style.productDescription}`}
                >
                  <p>{product.description}</p>
                </div>
                <div className="stock">
                  <span className="fs-5">stock : {product.stock}</span>
                </div>
                <hr />
                <div className={`productPrice d-flex`}>
                  <span
                    className={
                      product.discount > 0
                        ? `productPrice text-decoration-line-through text-danger fs-2`
                        : `productPrice fs-2`
                    }
                  >
                    ${product.finalPrice}
                  </span>
                </div>
                {product.discount > 0 ? (
                  <span className="productPrice fs-2 col-12 text-center ">
                    $
                    {product.finalPrice -
                      product.price * (product.discount / 100)}
                  </span>
                ) : null}

                <div className="addToCart w-100">
                  <button
                    class="btn btn-dark w-100"
                    disabled={addItemLoader ? true : false}
                    onClick={(e) => addItemToCart(e, productID)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSection;
