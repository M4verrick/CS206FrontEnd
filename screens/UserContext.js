import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);

  const loginUser = (email, otherData) => {
    // Store user data in array
    setUserInfo([...userInfo, { email, ...otherData }]);
  };

  return (
    <UserContext.Provider value={{ userInfo, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};
