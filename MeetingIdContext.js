
import React, { createContext, useContext, useState } from "react";

const MeetingIdContext = createContext();

export const useMeetingIdContext = () => useContext(MeetingIdContext);

export const MeetingIdProvider = ({ children }) => {
  const [meetingIds, setMeetingIds] = useState([]);

  const addMeetingIds = (ids) => {
    setMeetingIds(ids); // Assuming you want to replace the existing array
  };

  return (
    <MeetingIdContext.Provider value={{ meetingIds, addMeetingIds }}>
      {children}
    </MeetingIdContext.Provider>
  );
};
