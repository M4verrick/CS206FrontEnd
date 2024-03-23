import axios from "axios";

//need change to ip address
const API_URL = "http://192.168.1.112:8080/api/v1/";
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

// @PostMapping("{userEmail}/{userPassword}/login")
const login = (userEmail, userPassword) => {
  return axios
    .post(API_URL + `user/${userEmail}/${userPassword}/login`)
    .then((response) => {
      const isAuthenticated = response.data;
      // isAuthenticated will be true or false based on your backend response
      return isAuthenticated;
    })
    .catch((error) => {
      console.error("Error during login:", error);
      // Handle errors appropriately
      throw error;
    });
};

// @PostMapping("/{teamName}/{teamEmails}/createTeam")
// public ResponseEntity<Team> createTeam
const createTeam = (teamName, teamEmails) => {
  return axios
    .post(
      API_URL + `team/${teamName}/${teamEmails}/createTeam`,
      {
        teamName,
        teamEmails,
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
