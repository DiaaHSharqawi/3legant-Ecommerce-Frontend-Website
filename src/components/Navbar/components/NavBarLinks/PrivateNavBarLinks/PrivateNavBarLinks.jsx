import { useContext } from "react";
import { UserCartCountContext } from "../../../../../contexts/useCartCount/useCartCount";
import { UserOrderCountContext } from "../../../../../contexts/useOrderCount/useOrderCount";
import { getPrivateNavBarLinks } from "../../../utils/getLoginNavBarLinks";
import style from "./../../../assets/css/navbar.module.css";
import PrivateNavBarLink from "./PrivateNavBarLink";

function PrivateNavBarLinks() {
  const { cartCount } = useContext(UserCartCountContext);
  const { orderCount } = useContext(UserOrderCountContext);
  const navBarCounts = {
    cartCount,
    orderCount,
  };

  const privateNavBarLinks = getPrivateNavBarLinks(style, navBarCounts);

  return (
    <>
      {privateNavBarLinks.map((privateNavBarLink) => {
        return (
          <PrivateNavBarLink
            privateNavBarLink={privateNavBarLink}
            key={privateNavBarLink.name}
          />
        );
      })}
      <li>
        <hr className="dropdown-divider"></hr>
      </li>
    </>
  );
}

export default PrivateNavBarLinks;
