import axios from "axios";
import { useEffect, useState } from "react";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [firstCategoryID, setFirstCategoryID] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const API_URL = `https://api.escuelajs.co/api/v1/categories?limit=5`;
        const { data } = await axios.get(API_URL);
        console.log(`getCategories`);
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.log(`error is : ${error}`);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getCategories();
  }, []);
  return { categories, firstCategoryID, loader };
}

export default useCategories;
