import axios from "axios";
import React, { useEffect, useState } from "react";

function useOrders() {
  console.log("user orders");
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const BASE_API_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${BASE_API_URL}/order`;
  const getOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const { data } = await axios.get(API_URL, {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
        console.log(data);
        if (data.message == "success") {
          setOrders(data.orders);
        }
      }
    } catch (error) {
      console.log(`error is : ${error}`);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return { orders, loader, setOrders };
}

export default useOrders;
