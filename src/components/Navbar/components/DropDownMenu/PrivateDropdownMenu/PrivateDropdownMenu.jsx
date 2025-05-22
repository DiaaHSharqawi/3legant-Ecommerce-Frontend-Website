import { useContext } from "react";
import { UserLoginContext } from "../../../../../contexts/useLogin/useLogin";
import { getPrivateDropdownMenuItems } from "../../../utils/getPrivateDropdownMenuItems";
import PrivateDropdownMenuItem from "./PrivateDropdownMenuItem";

function PrivateDropdownMenu() {
  const { userName, setUserName, setUserToken, setIsLogin } =
    useContext(UserLoginContext);

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserName(null);
    setIsLogin(false);
    console.log(userName);
  };

  const menuItems = {
    logout: {
      onclick: logout,
    },
  };

  const privateDropdownMenuItems = getPrivateDropdownMenuItems(menuItems);

  return (
    <>
      {privateDropdownMenuItems.map((privateDropdownMenuItem) => {
        return (
          <PrivateDropdownMenuItem
            privateDropdownMenuItem={privateDropdownMenuItem}
            key={privateDropdownMenuItem.name}
          />
        );
      })}
    </>
  );
}

export default PrivateDropdownMenu;
