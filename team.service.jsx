import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";
axios.defaults.withCredentials = true

// @PostMapping("/{teamName}/{teamEmails}/createTeam")
// public ResponseEntity<Team> createTeam
const createTeam = (teamName, teamEmails) => {
    return axios.post
    (API_URL + `team/${teamName}/${teamEmails}/createTeam`, {
        teamName, teamEmails
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

// @PutMapping("/{userId}/{teamId}/addUser")
// public ResponseEntity<String> addUser
const addUser = (userId, teamId) => {
    return axios.put
    (API_URL + `team/${userId}/${teamId}/addUse`, {
        userId, teamId
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

// @DeleteMapping("/{teamId}/deleteTeamById")
// public ResponseEntity<String> deleteTeamById
const deleteTeamById = (teamId) => {
    return axios.delete 
    (API_URL +`team/${teamId}/deleteTeamById`, {
        teamId
    }, 
        { withCredentials: true,}
    );
} 

// @GetMapping("/{teamId}/getTeamById")
// public ResponseEntity<Team> getTeamById
const getTeamById = (teamId) => {
    return axios.get
    (API_URL + `team/${teamId}/getTeamById`, {
        teamId
    }, 
        { withCredentials: true,}
    )
    .then((response) => { 
        const teamId = response.data;
        return teamId;
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

// @GetMapping("/{teamId}/getAllMeetings")
// public ResponseEntity<?> getAllMeetingsInTeam
const getAllMeetingsInTeam = (teamId) => {
    return axios.get
    (API_URL + `team/${teamId}/getAllMeetingsInTeam`, {
        teamId
    }, 
        { withCredentials: true,}
    )
    .then((response) => { 
        const meetingsInTeam = response.data;
        return meetingsInTeam;
    })
    .catch((error) => {
        console.error("Error fetching information:", error);
        throw error;
    });
}

const TeamService = {
    createTeam,
    addUser,
    deleteTeamById,
    getTeamById,
    getAllMeetingsInTeam,
}