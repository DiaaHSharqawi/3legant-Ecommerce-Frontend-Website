import { useContext } from "react";
import { UserLoginContext } from "../../../../contexts/useLogin/useLogin";
import PrivateNavBarLinks from "./PrivateNavBarLinks/PrivateNavBarLinks";
import PublicNavBarLinks from "./PublicNavBarLinks/PublicNavBarLinks";

function NavBarLinks() {
  const { isLogin } = useContext(UserLoginContext);

  return (
    <>
      <PublicNavBarLinks />
      {isLogin ? <PrivateNavBarLinks /> : null}
    </>
  );
}

export default NavBarLinks;
