import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductSection from "./components/ProductSection/ProductSection";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import ReviewsSection from "./components/Reviews/ReviewsSection";

function ProductDetails() {
  const { productID } = useParams("productID");

  const [loader, setLoader] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const getProductsDetails = async () => {
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/products/${productID}`;
    console.log(`api url : ${API_URL}`);
    try {
      const { data } = await axios.get(API_URL);
      setProductDetails(data.product);
      setAvgRating(data.avgRating);
      setMainImage(data.product.mainImage.secure_url);
      setReviews(data.product.reviews);
      console.log(data.product);
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductsDetails();

    console.log("data reached", productDetails);
  }, []);

  return (
    <>
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
      ) : (
        <div className="ProductDetails-Section my-5">
          <div className="container">
            <div className="row">
              <div className="">
                <ProductSection
                  loader={loader}
                  product={productDetails}
                  avgRating={avgRating}
                />
              </div>
              <div className="my-5">
                <ReviewsSection reviews={reviews} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
