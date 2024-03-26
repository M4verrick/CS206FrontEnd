import React, { createContext, useContext, useState } from "react";

const UserIdContext = createContext();

export const useUserIdContext = () => useContext(UserIdContext);

export const UserIdProvider = ({ children }) => {
  const [userIds, setUserIds] = useState([]);

  const addUserId = (userId) => {
    setUserIds([userId]);
  };

  return (
    <UserIdContext.Provider value={{ userIds, addUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
