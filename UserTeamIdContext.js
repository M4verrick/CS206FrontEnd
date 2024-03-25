import React, { createContext, useContext, useState } from "react";

const UserTeamIdContext = createContext();

export const useUserTeamIdContext = () => useContext(UserTeamIdContext);

export const UserTeamIdProvider = ({ children }) => {
  const [userTeamIds, setUserTeamIds] = useState([]);

  const addUserTeamId = (teamId) => {
    setUserTeamIds(teamId);
  };

  return (
    <UserTeamIdContext.Provider value={{ userTeamIds, addUserTeamId }}>
      {children}
    </UserTeamIdContext.Provider>
  );
};
