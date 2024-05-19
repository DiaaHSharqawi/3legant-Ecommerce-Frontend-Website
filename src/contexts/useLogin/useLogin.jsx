import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const UserLoginContext = createContext();
const UserLoginContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const getTokenDetails = () => {
    console.log(userToken);
    if (userToken != null) {
      try {
        const decodedToken = jwtDecode(userToken);
        console.log(decodedToken);
        // setUserToken(decodedToken);
        setUserName(decodedToken.userName);
        setUserID(decodedToken.id);
        setIsLogin(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getTokenDetails();
  }, [userToken]);
  return (
    <UserLoginContext.Provider
      value={{
        setUserToken,
        setIsLogin,
        userName,
        isLogin,
        setUserName,
        userID,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};
export default UserLoginContextProvider;
