import { SET_ERROR, SET_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //save the token to localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);
      //Write user info to redux
      dispatch({
        type: SET_USER,
        payload: decoded,
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        //payload: err.response.data,
      })
    );
};
export const AddParticipants = (userData, history) => (dispatch) => {
  axios
    .post("/api/main/addparticipant", userData)
    .then(() => history.push("/table"))
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};
export const addPlusCount = (userData, history) => (dispatch) => {
  axios
    .post("/api/main/", userData)
    .then(() => history.push("/table"))
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};

export const Getrecords = (userData) => () => {
  axios
    .post("/api/main/getRecord", userData)
    .then((res) => {
      console.log(res);
      document.getElementById("meet").innerHTML = `MeetingID:`+ res.data.meetingID;
      document.getElementById("name").innerHTML =`Name:`+ res.data.name;
      document.getElementById("ah").innerHTML = `ah:`+res.data.ahCount;
      document.getElementById("um").innerHTML = `um:`+res.data.umCount;
      document.getElementById("so").innerHTML = `so:` + res.data.so;
      document.getElementById("but").innerHTML = `but:` + res.data.but;
      document.getElementById("well").innerHTML = `well:` + res.data.well;
      document.getElementById("ok").innerHTML = `ok:` + res.data.ok;
      document.getElementById("false").innerHTML = `falseStart:` + res.data.falseStart;
      document.getElementById("word").innerHTML = `wordRepititor:` + res.data.wordRepititor;
      document.getElementById("other").innerHTML = `other:` + res.data.other;
     
    })
    .catch(
      (err) => console.log(err)
      //  dispatch({
      //  type: SET_ERROR,
      //   //payload: err.res.data,
      //  })
    );
};
export const RemoveParticipants = (userData, history) => (dispatch) => {
  axios
    .post("/api/main/removeparticipant", userData)
    .then(() => history.push("/table"))
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
      })
    );
};

export const AddRecord = (userData, history) => (dispatch) => {
  axios
    .post("/api/main/", userData)
    .then(() => history.push("/table"))
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};

export const logoutUser = () => (dispatch) => {
  //Remove token from ls
  localStorage.removeItem("jwtToken");
  //Remove token from axios header
  setAuthToken(false);
  //Reset user in the redux store
  dispatch({
    type: SET_USER,
    payload: {},
  });
};
