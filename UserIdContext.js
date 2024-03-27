import React, { createContext, useContext, useState } from "react";

const UserIdContext = createContext();

export const useUserIdContext = () => useContext(UserIdContext);

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Change this to manage a single userId

  const addUserId = (newUserId) => {
    setUserId(newUserId); // Update the state with the new userId
  };

  return (
    <UserIdContext.Provider value={{ userId, addUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
