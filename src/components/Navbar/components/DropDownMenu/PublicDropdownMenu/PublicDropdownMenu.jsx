import { publicDropdownMenuItems } from "../../../data/navBarData";
import PublicDropdownMenuItem from "./PublicDropdownMenuItem";

function PublicDropdownMenu() {
  return publicDropdownMenuItems.map((publicDropdownMenuItem) => {
    return (
      <PublicDropdownMenuItem
        publicDropdownMenuItem={publicDropdownMenuItem}
        key={PublicDropdownMenuItem.name}
      />
    );
  });
}

export default PublicDropdownMenu;
