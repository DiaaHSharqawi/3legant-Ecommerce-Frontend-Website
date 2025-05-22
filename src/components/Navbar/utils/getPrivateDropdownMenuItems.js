export function getPrivateDropdownMenuItems(menuItems) {
  return [
    {
      name: "Profile",
      path: "/user/profile",
      onClick: null,
    },
    {
      name: "Logout",
      path: null,
      onClick: menuItems.logout.onClick,
    },
  ];
}
