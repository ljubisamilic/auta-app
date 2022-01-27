import React, { useContext, useState, createContext } from "react";
const AppContext = createContext();

const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState();
  return (
    <AppContext.Provider value={{ user, setUser, userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalcontext = () => useContext(AppContext);

export default ApiProvider;
