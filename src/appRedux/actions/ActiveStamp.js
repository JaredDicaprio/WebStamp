import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  LOAD_ACTIVE_STAMP,
  LOAD_CHANGE_STAMP,
  UPDATE_STAMP,
  LOAD_ACTIVE_STAMP_PARKING,
  LOAD_STAMP_REPORT_BY_STAMP_PARKING
} from "../../constants/ActionTypes";
import { history } from "../store/index";
import { show_message_error } from "./Alert";
import axios from "../../util/Api";
import axiosParking from "../../util/ApiParking";

export const load_active_stamp = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`stamp/api/ActiveStamp`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({
        type: LOAD_ACTIVE_STAMP,
        payload: res.data
      });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_change_stamp = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(
      `stamp/api/ChangeStamp?inoutTrainStamp=${data.inoutTrainStamp}&visitor_id=${data.visitor_id}`
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_CHANGE_STAMP, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const update_stamp = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post("stamp/api/updatesStamp", data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      if (res.data.mes === "ok") {
        dispatch(load_active_stamp());
        // dispatch({
        //   type: LOAD_ACTIVE_STAMP,
        //   payload: res.data
        // });
        history.push(`${process.env.PUBLIC_URL}/ActiveStamp`);
      } else if (res.data.mes === "HaveSingleStamp") {
        dispatch({ type: FETCH_ERROR, payload: "HaveSingleStamp" });
      } else if (res.data.mes === "StampDuplicate") {
        dispatch({ type: FETCH_ERROR, payload: "StampDuplicate" });
      }
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const delete_stamp = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post("stamp/api/deleteStamp", data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({
        type: LOAD_ACTIVE_STAMP,
        payload: res.data.data_active_stamp
      });
      dispatch({ type: SHOW_MESSAGE, payload: "delete success" });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

//Parking
export const load_active_stamp_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get("stamp/api/ActiveStamp", {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_ACTIVE_STAMP_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_change_stamp_parking = (
  inoutTrainStamp,
  visitor_id
) => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(
      `stamp/api/ChangeStamp?inoutTrainStamp=${inoutTrainStamp}&visitor_id=${visitor_id}`,

      {
        headers: {
          Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
        }
      }
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_CHANGE_STAMP, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const change_stamp_parking = data_change_stamp => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .post(`stamp/api/updatesStamp`, data_change_stamp, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      // dispatch(load_active_stamp_parking());
      //console.log(data_change_stamp);
      console.log(res.data);
      if (res.data.message === "false") {
        dispatch(show_message_error("change stamp false"));
      } else {
        history.push(`${process.env.PUBLIC_URL}/ActiveStamp`);
      }
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const dlete_stamp_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .post(`stamp/api/deleteStamp`, data, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch(load_active_stamp_parking());
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

// end parking
