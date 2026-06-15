import React, {
  createContext,
  useContext,
  useState,
} from "react";

const DrawContext = createContext();

export const DrawerContext = ({ children }) => {
  const [opendraws, setOpendraws] = useState(null);

  const opensigndraw = () => {
    if (opendraws === true) {
      setOpendraws(false);
    } else {
      setOpendraws(true);
    }
  };
  return (
    <DrawContext.Provider value={{ opensigndraw, setOpendraws, opendraws }}>
      {children}
    </DrawContext.Provider>
  );
};

export const useDraw = () => useContext(DrawContext);
