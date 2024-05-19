import React from "react";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserOrderCountContext = createContext();
const UserOrderCountContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [orderCount, setOrderCount] = useState(0);
  const getCartCount = async () => {
    console.log(userToken);
    if (userToken != null) {
      const BASE_API_URL = import.meta.env.VITE_API_URL;
      const API_URL = `${BASE_API_URL}/order`;
      console.log(API_URL);
      try {
        const { data } = await axios.get(API_URL, {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        });
        if (data.message == "success") {
          console.log("nav bar cart count ", data.count);
          setOrderCount(data.orders.length);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };
  useEffect(() => {
    getCartCount();
  }, [orderCount]);
  return (
    <UserOrderCountContext.Provider value={{ orderCount, setOrderCount }}>
      {children}
    </UserOrderCountContext.Provider>
  );
};
export default UserOrderCountContextProvider;
