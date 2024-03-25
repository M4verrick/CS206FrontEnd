import axios from "axios";

const API_URL = "http://192.168.1.112:8080/api/v1/";
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
const createNewMeeting = (firstMeeting, lastMeeting) => {
  return axios
    .post(
      API_URL + `meeting/${firstMeeting}/${lastMeeting}/createNewMeeting`,
      {
        firstMeeting,
        lastMeeting,
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
const createMeeting = (
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

// @GetMapping("/{meetingId}/getCommonAvailabilities")
// public ResponseEntity<Map<String,Integer>> getCommonAvailabilities (Return common availabilities and votes)
const getCommonAvailabilities = (meetingId) => {
  return axios
    .get(
      API_URL + `meeting/${meetingId}/getCommonAvailabilities`,
      {
        meetingId,
      },
      { withCredentials: true }
    )
    .then((response) => {
      const commonAvailabilities = response.data;
      return commonAvailabilities;
    })
    .catch((error) => {
      console.error("Error fetching information:", error);
      throw error;
    });
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
const addVote = (meetingId, userId, availabilitiesVotes) => {
  return axios
    .put(
      API_URL + `meeting/${meetingId}/${userId}/${availabilitiesVotes}/addVote`,
      {
        meetingId,
        userId,
        availabilitiesVotes,
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
