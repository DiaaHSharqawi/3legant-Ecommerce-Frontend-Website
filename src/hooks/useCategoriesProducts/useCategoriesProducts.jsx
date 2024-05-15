import axios from "axios";
import React, { useEffect, useState } from "react";

function useCategoriesProducts({ categoryID }) {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  console.log("useCategoriesProducts hook");

  const BASE_API_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${BASE_API_URL}/products/category/${categoryID}`;
  const getCategories = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setCategories(data.categories);
      console.log(data);
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return { categories, loader };
}

export default useCategoriesProducts;
