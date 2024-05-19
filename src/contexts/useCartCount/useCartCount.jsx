import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserCartCountContext = createContext();
const UserCartCountContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [cartCount, setCartCount] = useState(0);
  const getCartCount = async () => {
    console.log(userToken);
    if (userToken != null) {
      const BASE_API_URL = import.meta.env.VITE_API_URL;
      const API_URL = `${BASE_API_URL}/cart`;
      console.log(API_URL);
      try {
        const { data } = await axios.get(API_URL, {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        });
        if (data.message == "success") {
          console.log("nav bar cart count ", data.count);
          setCartCount(data.count);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };
  useEffect(() => {
    getCartCount();
  }, [cartCount]);
  return (
    <UserCartCountContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </UserCartCountContext.Provider>
  );
};
export default UserCartCountContextProvider;
