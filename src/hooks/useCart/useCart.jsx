import axios from "axios";
import React, { useEffect, useState } from "react";

function useCart() {
  const [loader, setLoader] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const getSubTotal = () => {
    let totalSum = 0;
    cartProducts.forEach((product) => {
      totalSum += product.quantity * product.details.finalPrice;
    });
    return totalSum;
  };

  const getCart = async () => {
    setLoader(true);
    console.log("get cart");
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_API_URL}/cart`;
    console.log(API_URL);
    try {
      const token = localStorage.getItem("userToken");
      console.log("token : ", token);
      if (token) {
        const { data } = await axios.get(API_URL, {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
        if (data.message == "success") {
          setCartProducts(data.products);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    // Calculate subtotal when cartProducts change
    const sum = getSubTotal();
    setSubTotal(sum);
  }, [cartProducts]);

  return {
    cartProducts,
    setCartProducts,
    loader,
    setLoader,
    subTotal,
    setSubTotal,
    getSubTotal,
  };
}

export default useCart;
