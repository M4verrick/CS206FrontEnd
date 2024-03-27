import axios from "axios";

const API_URL = "http://10.124.10.120:8080/api/v1/";

// const API_URL = "http://172.20.10.3:8080/api/v1/";
axios.defaults.withCredentials = true;

// @GetMapping("/getAllMeetings")
// public ResponseEntity<List<Meeting>> getAllEvents()
const getAllMeetings = () => {
  return axios
    .get(API_URL + `meeting/getAllMeetings`, {}, { withCredentials: true })
    .then((response) => {
      const meetings = response.data;
      return meetings;
    })
    .catch((error) => {
      console.error("Error fetching information:", error);
      throw error;
    });
};

// @PostMapping("/{firstMeeting}/{lastMeeting}/createNewMeeting")
// public ResponseEntity<Meeting> createNewMeeting
const createNewMeeting = async (firstMeeting, lastMeeting) => {
  try {
    const response = await axios.post(
      API_URL + `meeting/${firstMeeting}/${lastMeeting}/createNewMeeting`,
      {
        firstMeeting,
        lastMeeting,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error fetching information:", error);
    throw error;
  }
};

// @GetMapping("{meetingId}/getMeeting")
// public ResponseEntity<Meeting> getMeeting
const getMeeting = (meetingId) => {
  return axios
    .get(
      API_URL + `meeting/${meetingId}/getMeeting`,
      {},
      { withCredentials: true }
    )
    .then((response) => {
      const meeting = response.data;
      return meeting;
    })
    .catch((error) => {
      console.error("Error fetching information:", error);
      throw error;
    });
};

// @PostMapping("/{teamId}/{meetingName}/{firstDateTimeLimit}/{lastDateTimeLimit}/{durationInSeconds}/{frequency}/createMeeting")
// public ResponseEntity<?> createMeeting(@PathVariable(value = "teamId") String teamId,
//                                        @PathVariable(value = "meetingName") String meetingName,
//                                        @PathVariable(value = "firstDateTimeLimit") LocalDateTime firstDateTimeLimit,
//                                        @PathVariable(value = "lastDateTimeLimit") LocalDateTime lastDateTimeLimit,
//                                        @PathVariable(value = "frequency") String frequency,
//                                        @PathVariable(value = "durationInSeconds") long durationInSeconds)
const createMeeting = async (
  teamId,
  meetingName,
  firstDateTimeLimit,
  lastDateTimeLimit,
  durationInSeconds,
  frequency
) => {
  try {
    const response = await axios.post(
      API_URL +
        `meeting/${teamId}/${meetingName}/${firstDateTimeLimit}/${lastDateTimeLimit}/${durationInSeconds}/${frequency}/createMeeting`,
      {
        teamId,
        meetingName,
        firstDateTimeLimit,
        lastDateTimeLimit,
        durationInSeconds,
        frequency,
      },
      { withCredentials: true }
    );
    const inSet = response.data;
    return inSet;
  } catch (error) {
    console.error("Error fetching information:", error);
    throw error;
  }
};

// @GetMapping("/{meetingId}/getCommonAvailabilities")
// public ResponseEntity<Map<String,Integer>> getCommonAvailabilities (Return common availabilities and votes)
const getCommonAvailabilities = async (meetingId) => {
  try {
    const response = await axios.get(
      API_URL + `meeting/${meetingId}/getCommonAvailabilities`,
      {
        meetingId,
      },
      { withCredentials: true }
    );
    const commonAvailabilities = response.data;
    return commonAvailabilities;
  } catch (error) {
    console.error("Error fetching information:", error);
    throw error;
  }
};

// @PostMapping("{meetingId}/{teamId}/{meetingName}/{firstDateTimeLimit}/{lastDateTimeLimit}/{durationInSeconds}/rescheduleMeeting")
//     public ResponseEntity<?> rescheduleMeeting(@PathVariable(value = "meetingId") String meetingId,
//                                                @PathVariable(value = "teamId") String teamId,
//                                                @PathVariable(value = "meetingName") String meetingName,
//                                                @PathVariable(value = "firstDateTimeLimit") LocalDateTime firstDateTimeLimit,
//                                                @PathVariable(value = "lastDateTimeLimit") LocalDateTime lastDateTimeLimit,
//                                                @PathVariable(value = "durationInSeconds") long durationInSeconds)
const rescheduleMeeting = (
  meetingId,
  teamId,
  meetingName,
  firstDateTimeLimit,
  lastDateTimeLimit,
  durationInSeconds
) => {
  return axios
    .put(
      API_URL +
        `meeting/${meetingId}/${teamId}/${meetingName}/${firstDateTimeLimit}/${lastDateTimeLimit}/${durationInSeconds}/rescheduleMeeting`,
      {
        meetingId,
        teamId,
        meetingName,
        firstDateTimeLimit,
        lastDateTimeLimit,
        durationInSeconds,
      },
      { withCredentials: true }
    )
    .then((response) => {
      const inSet = response.data;
      console.log(inSet);
      return inSet;
    })
    .catch((error) => {
      console.error("Error fetching information:", error);
      throw error;
    });
};

// @PutMapping("/{meetingId}/{userId}/{availabilitiesVotes}/addVote")
// public ResponseEntity<?> addVote
// - if not all has voted, return ResponseEntity<String>
// - if all has voted
// if single meeting, return ResponseEntity<Meeting>
// if more than 1 meeting, return ResponseEntity<Map<Meeting,Boolean>>, list of meetings and if there is conflict
const addVote = async (meetingId, userId, availabilitiesVotes) => {
  try {
    const response = await axios.put(
      API_URL + `meeting/${meetingId}/${userId}/addVote`,
      availabilitiesVotes,
      {
        meetingId,
        userId,
      },
      { withCredentials: true }
    );
    const inSet = response.data;
    console.log(inSet);
    return inSet;
  } catch (error) {
    console.error("Error fetching information:", error);
    throw error;
  }
};

// @PostMapping("{meetingId}/{teamId}/{meetingName}/{firstDateTimeLimit}/{lastDateTimeLimit}/{durationInSeconds}/{frequency}/rescheduleMeetingForConsecutive")
// public ResponseEntity<?> rescheduleMeetingforAllConsecutive(@PathVariable(value = "meetingId") String meetingId,
//                                            @PathVariable(value = "teamId") String teamId,
//                                            @PathVariable(value = "meetingName") String meetingName,
//                                            @PathVariable(value = "firstDateTimeLimit") LocalDateTime firstDateTimeLimit,
//                                            @PathVariable(value = "lastDateTimeLimit") LocalDateTime lastDateTimeLimit,
//                                            @PathVariable(value = "frequency") String frequency,
//                                            @PathVariable(value = "durationInSeconds") long durationInSeconds)
const rescheduleMeetingForConsecutive = (
  meetingId,
  teamId,
  meetingName,
  firstDateTimeLimit,
  lastDateTimeLimit,
  durationInSeconds,
  frequency
) => {
  return axios
    .post(
      API_URL +
        `meeting/${meetingId}/${teamId}/${meetingName}/${firstDateTimeLimit}/${lastDateTimeLimit}/
                        ${durationInSeconds}/${frequency}/rescheduleMeetingForConsecutive`,
      {
        meetingId,
        teamId,
        meetingName,
        firstDateTimeLimit,
        lastDateTimeLimit,
        durationInSeconds,
        frequency,
      },
      { withCredentials: true }
    )
    .then((response) => {
      const inSet = response.data;
      console.log(inSet);
    })
    .catch((error) => {
      console.error("Error fetching information:", error);
      throw error;
    });
};

// @DeleteMapping("{meetingId}/deleteConsecutiveMeetings")
// public ResponseEntity<?> deleteConsecutiveMeetings
const deleteConsecutiveMeetings = (meetingId) => {
  return axios.delete(
    API_URL + `meeting/${meetingId}/deleteConsecutiveMeetings`,
    {
      meetingId,
    },
    { withCredentials: true }
  );
};

// @DeleteMapping("{meetingId}/deleteMeeting")
// public ResponseEntity<?> deleteMeeting (@PathVariable (value = "meetingId") String meetingId)
const deleteMeeting = (meetingId) => {
  return axios.delete(
    API_URL + `meeting/${meetingId}/deleteMeeting`,
    {
      meetingId,
    },
    { withCredentials: true }
  );
};

// const getUserVoted = (meetingId) => {
//   return axios
//     .get(API_URL + `meeting/${meetingId}/getMeeting`)
//     .then((response) => {
//       const usersVoted = response.data;
//       return usersVoted;
//     })
//     .catch((error) => {
//       console.error("Error fetching information:", error);
//       throw error;
//     });
// };

const MeetingService = {
  getAllMeetings,
  createNewMeeting,
  getMeeting,
  createMeeting,
  getCommonAvailabilities,
  rescheduleMeeting,
  addVote,
  rescheduleMeetingForConsecutive,
  deleteConsecutiveMeetings,
  deleteMeeting,
};
export default MeetingService;
