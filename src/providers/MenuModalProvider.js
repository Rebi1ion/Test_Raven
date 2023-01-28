import React, { useState, useContext } from "react";

const MenuContext = React.createContext();
export const useMenuContext = () => useContext(MenuContext);

export default function MenuModalProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState(false);
  const openMenu = () => setActiveMenu(true);
  const closeMenu = () => setActiveMenu(false);

  return (
    <MenuContext.Provider
      value={{
        active: activeMenu,
        openMenu,
        closeMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
