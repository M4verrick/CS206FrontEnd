import React, { createContext, useContext, useState } from "react";

const UserTeamIdContext = createContext();

export const useUserTeamIdContext = () => useContext(UserTeamIdContext);

export const UserTeamIdProvider = ({ children }) => {
  const [userTeamIds, setUserTeamIds] = useState([]);

  const addUserTeamId = (newTeamIds) => {
    // Check if newTeamIds is an array and spread it, otherwise just add the single ID
    setUserTeamIds((prevTeamIds) => [
      ...prevTeamIds,
      ...(Array.isArray(newTeamIds) ? newTeamIds : [newTeamIds]),
    ]);
  };

  return (
    <UserTeamIdContext.Provider value={{ userTeamIds, addUserTeamId }}>
      {children}
    </UserTeamIdContext.Provider>
  );
};
