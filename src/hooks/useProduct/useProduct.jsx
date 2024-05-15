import axios from "axios";
import React, { useEffect, useState } from "react";

function useProduct(productID) {
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
      setLoader(true);
      const { data } = await axios.get(API_URL);
      setProductDetails(data.product);
      setAvgRating(data.avgRating);
      setMainImage(data.product.mainImage.secure_url);
      setReviews(data.product.reviews);
      // console.log(data.product);
      // return data;
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductsDetails();
  }, [productID]);
  return {
    productDetails,
    mainImage,
    setMainImage,
    reviews,
    avgRating,
    loader,
    setLoader,
  };
}

export default useProduct;
