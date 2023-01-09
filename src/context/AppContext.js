import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
    const [appContext, setAppContext] = useState({});
  const values = {
    appContext,
    setAppContext
 
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
