import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_DATA_PARKING,
  USER_TOKEN_SET,
  LOAD_MENU_LIST,
  GET_IP
} from "../../constants/ActionTypes";
import { history } from "../store/index";
import { show_message_error, show_message_success } from "./Alert";
import { SecretKey } from "../../util/config";

import IntlMessages from "../../util/IntlMessages";
import axios from "util/Api";

import axiosParking from "util/ApiParking";

export const setInitUrl = url => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignIn = ({ user, password }) => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`/api/login?user=${user}&password=${password}`)
    .then(({ data }) => {
      if (data.Status === "OK") {
        localStorage.setItem("token", data.Token);

        axios.defaults.headers.common["Authorization"] = "Bearer " + data.Token;
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: USER_TOKEN_SET, payload: data.Token });
        dispatch({ type: GET_IP, payload: "" });
        dispatch({ type: USER_DATA, payload: data });
      } else {
        //dispatch(show_message_error("user password incorrect"));
        dispatch({ type: FETCH_ERROR, payload: "user password incorrect" });
      }
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      // dispatch(show_message_error(error.message));
    });
};

export const userSignInParking = ({ user, password }) => async dispatch => {
  dispatch({ type: FETCH_START });

  await axiosParking
    .get(`api/login?username=${user}&password=${password}`)
    .then(res => {
      if (res.data.Status === "Success") {
        dispatch({ type: FETCH_SUCCESS });
        axiosParking.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;

        dispatch({ type: USER_DATA_PARKING, payload: res.data });

        localStorage.setItem("tokenParking", res.data.token);
        localStorage.setItem("ParkingCompanyID", res.data.CompanyID);
      }
    })
    .catch(function(error) {
      console.log(error);
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const getUser = () => {
  return dispatch => {
    dispatch({ type: FETCH_START });
    axios
      .get(`/api/user/user_detail`)
      .then(({ data }) => {
        if (data) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_DATA, payload: data });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function(error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
      });
  };
};

export const load_menu_list = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/user/GetMenuLiist`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_MENU_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const userSignOut = () => {
  return dispatch => {
    dispatch({ type: FETCH_START });
    setTimeout(() => {
      // localStorage.removeItem("token");
      // localStorage.removeItem("tokenParking");
      // localStorage.removeItem("DATA-PARKING-KEY");
      localStorage.clear();

      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: SIGNOUT_USER_SUCCESS });
    }, 2000);

    history.push(`${process.env.PUBLIC_URL}/signin`);
  };
};
