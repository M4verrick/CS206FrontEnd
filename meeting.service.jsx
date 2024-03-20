import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";
axios.defaults.withCredentials = true

// @GetMapping("/getAllMeetings")
// public ResponseEntity<List<Meeting>> getAllEvents()
const getAllMeetings = () => {
    return axios.get
    (API_URL + `meeting/getAllMeetings`, {
    }, 
        { withCredentials: true,}
    )
    .then((response) => { 
        const meetings = response.data;
        return meetings;
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

// @PostMapping("/{firstMeeting}/{lastMeeting}/createNewMeeting")
// public ResponseEntity<Meeting> createNewMeeting
const createNewMeeting = (firstMeeting, lastMeeting) => {
    return axios.post
    (API_URL + `meeting/${firstMeeting}/${lastMeeting}/createNewMeeting`, {
        firstMeeting, lastMeeting
    }, 
        { withCredentials: true,}
    )
    .then((response) => { 
        const inSet = response.data;
        console.log(inSet)
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

// @GetMapping("{meetingId}/getMeeting")
// public ResponseEntity<Meeting> getMeeting
const getMeeting = (meetingId) => {
    return axios.get
    (API_URL + `meeting/${meetingId}/getMeeting`, {
    }, 
        { withCredentials: true,}
    )
    .then((response) => { 
        const meeting = response.data;
        return meeting;
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

// @PostMapping("/{teamId}/{meetingName}/{firstDateTimeLimit}/{lastDateTimeLimit}/{DurationInSeconds}/createMeeting")
// public ResponseEntity<Meeting> createMeeting
const createMeeting = (teamId, meetingName, firstDateTimeLimit, lastDateTimeLimit, DurationInSeconds) => {
    return axios.post
    (API_URL + `meeting/${teamId}/${meetingName}/${firstDateTimeLimit}/${lastDateTimeLimit}/${DurationInSeconds}/createMeeting`, {
        teamId, meetingName, firstDateTimeLimit, lastDateTimeLimit, DurationInSeconds
    }, 
        { withCredentials: true,}
    )
    .then((response) => { 
        const inSet = response.data;
        console.log(inSet)
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

// @GetMapping("/{meetingId}/getCommonAvailabilities")
// public ResponseEntity<Map<String,Integer>> getCommonAvailabilities (Return common availabilities and votes)
const getCommonAvailabilities = (meetingId) => {
    return axios.get
    (API_URL + `meeting/${meetingId}/getCommonAvailabilities`, {
        meetingId
    }, 
        { withCredentials: true,}
    )
    .then((response) => { 
        const commonAvailabilities = response.data;
        return commonAvailabilities;
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

// @PutMapping("{meetingId}/rescheduleMeeting")
// public ResponseEntity<Meeting> rescheduleMeeting
const rescheduleMeeting = (meetingId) => {
    return axios.put
    (API_URL + `meeting/${meetingId}/rescheduleMeeting`, {
        meetingId
    }, 
        {withCredentials: true,}
    )
    .then((response) => {
        const inSet = response.data;
        console.log(inSet)
        return inSet;
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

// @PutMapping("/{meetingId}/{userId}/{availabilitiesVotes}/addVote")
// public ResponseEntity<?> addVote
// - if not all has voted, return ResponseEntity<String>
// - if all has voted
// if single meeting, return ResponseEntity<Meeting>
// if more than 1 meeting, return ResponseEntity<Map<Meeting,Boolean>>, list of meetings and if there is conflict
const addVote = (meetingId, userId, availabilitiesVotes) => {
    return axios.put
    (API_URL + `meeting/${meetingId}/${userId}/${availabilitiesVotes}/addVote`, {
        meetingId, userId, availabilitiesVotes
    }, 
        {withCredentials: true,}
    )
    .then((response) => {
        const inSet = response.data;
        console.log(inSet)
        return inSet;
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

const MeetingService = {
    getAllMeetings,
    createNewMeeting,
    getMeeting,
    createMeeting,
    getCommonAvailabilities,
    rescheduleMeeting,
    addVote,
}