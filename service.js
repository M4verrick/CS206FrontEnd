import axios from "axios";

//need change to ip address
const API_URL = "http://172.20.10.3:8080/api/v1/";
axios.defaults.withCredentials = true;

// register new user
const signUp = async (userName, userEmail, userPassword) => {
  try {
    const response = await axios.post(
      API_URL + `user/${userName}/${userEmail}/${userPassword}/signUp`,
      {
        userName,
        userEmail,
        userPassword,
      },
      { withCredentials: true, timeout: 5000 }
    );
    const data = response.data;
    console.log("Signup successful:", data);
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

//login
// @PostMapping("{userEmail}/{userPassword}/login")
const login = async (userEmail, userPassword) => {
  try {
    const response = await axios.post(
      API_URL + `user/${userEmail}/${userPassword}/login`,
      {},
      {
        timeout: 5000, // Timeout set to 5000 milliseconds (5 seconds)
      }
    );
    const isAuthenticated = response.data;
    return isAuthenticated;
  } catch (error) {
    console.error("Error during login:", error);
    // error handling
    throw error;
  }
};

// @PostMapping("/{teamName}/{teamEmails}/createTeam")
// public ResponseEntity<Team> createTeam
const createTeam = (teamName, teamUserEmails) => {
  return axios
    .post(
      `${API_URL}team/${teamName}/createTeam`, // Ensure the URL is constructed correctly
      teamUserEmails, // Directly pass teamUserEmails as the request body
      { withCredentials: true }
    )
    .then((response) => {
      const inSet = response.data;
      console.log(inSet);
      return inSet; // It's a good practice to return the data from your promise chain
    })
    .catch((error) => {
      console.error("Error creating team:", error);
      throw error; // Re-throwing the error is fine, but make sure you handle it where you call createTeam
    });
};

// @PutMapping("/{userId}/{teamId}/addUser")
// public ResponseEntity<String> addUser
const addUserToTeam = (userId, teamId) => {
  return axios
    .put(
      API_URL + `team/${userId}/${teamId}/addUser`,
      {
        userId,
        teamId,
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

// @DeleteMapping("/{teamId}/deleteTeamById")
// public ResponseEntity<String> deleteTeamById
const deleteTeamById = (teamId) => {
  return axios.delete(
    API_URL + `team/${teamId}/deleteTeamById`,
    {
      teamId,
    },
    { withCredentials: true }
  );
};

// @GetMapping("/{teamId}/getTeamById")
// public ResponseEntity<Team> getTeamById
const getTeamById = (teamId) => {
  return axios
    .get(
      API_URL + `team/${teamId}/getTeamById`,
      {
        teamId,
      },
      { withCredentials: true }
    )
    .then((response) => {
      const teamId = response.data;
      return teamId;
    })
    .catch((error) => {
      console.error("Error fetching information:", error);
      throw error;
    });
};

// @GetMapping("/{teamId}/getAllMeetings")
// public ResponseEntity<?> getAllMeetingsInTeam
const getAllMeetingsInTeam = (teamId) => {
  return axios
    .get(
      API_URL + `team/${teamId}/getAllMeetingsInTeam`,
      {
        teamId,
      },
      { withCredentials: true }
    )
    .then((response) => {
      const meetingsInTeam = response.data;
      return meetingsInTeam;
    })
    .catch((error) => {
      console.error("Error fetching information:", error);
      throw error;
    });
};

const connectGoogleCalendar = (userId) => {
  return axios
    .get(API_URL + `Google/${userId}/startOAuth`, {
      userId,
    })
    .then((response) => {
      const link = response.data;
      return link;
    })
    .catch((error) => {
      console.error("Error getting google link: ", error);
      throw error;
    });
};

const Service = {
  createTeam,
  addUserToTeam,
  deleteTeamById,
  getTeamById,
  getAllMeetingsInTeam,
  connectGoogleCalendar,
  signUp,
  login,
};

export default Service;
