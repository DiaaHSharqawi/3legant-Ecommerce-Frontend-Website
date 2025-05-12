import cartIcon from "./../assets/images/icons/cartIcon.svg";
import orderIcon from "./../assets/images/icons/orderIcons.svg";

export function getPrivateNavBarLinks(style, count) {
  return [
    {
      name: "Profile",
      path: "/user/profile",
    },
    {
      name: "Logout",
      path: null,
    },
    {
      name: "Cart count",
      icon: cartIcon,
      path: "/cart",
      value: count.cartCount,
      style: style.cartCount,
      className: "cart",
    },
    {
      name: "Order count",
      icon: orderIcon,
      path: "/userOrders",
      value: count.orderCount,
      style: style.orderCount,
      className: "order",
    },
  ];
}
