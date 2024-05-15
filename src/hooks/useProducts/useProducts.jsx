import axios from "axios";
import React, { useEffect, useState } from "react";

function useProducts({ page, limit }) {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const BASE_API_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${BASE_API_URL}/products/active?page=${page}&limit=${limit}`;
  const getProducts = async () => {
    try {
      const { data } = await axios.get(API_URL);
      if (data.message == "success") setProducts(data.products);
      console.log("get prducts : ", products);
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return { products, loader };
}

export default useProducts;
