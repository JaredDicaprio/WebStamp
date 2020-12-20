import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  LOAD_VISITOR_DETAIL,
  REMOVE_DATA_VISITOR,
  LOAD_INOUT_TRANDETAIL,
  REMOVE_INOUT_TRANDETAIL
} from "../../constants/ActionTypes";

import { show_message_error, show_message_success } from "./Alert";

import axios from "../../util/Api";
import axiosParking from "../../util/ApiParking";

export const load_visitor_detail = visitorId => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`stamp/api/getVisitor?visitorID=${visitorId}`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });

      if (res.data.visitorDetail) {
        dispatch({
          type: LOAD_VISITOR_DETAIL,
          payload: res.data.visitorDetail
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: "No have Visitor ID"
        });
        dispatch({ type: REMOVE_DATA_VISITOR });
      }
    })
    .catch(function(error) {
      dispatch({ type: REMOVE_DATA_VISITOR });
      dispatch({
        type: FETCH_ERROR,
        payload: "Server Error"
      });
    });
};

export const load_inout_trandetail = data_visitor => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`stamp/api/getInOutDetail?visitorId=${data_visitor.visitor_id}`)
    .then(res => {
      if (res.data) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: LOAD_INOUT_TRANDETAIL, payload: res.data });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: "No have visitor ID"
        });
        dispatch({
          type: REMOVE_INOUT_TRANDETAIL
        });
      }
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const remove_data_stamp = () => dispatch => {
  dispatch({ type: REMOVE_INOUT_TRANDETAIL });
};

export const insertStampCode = data => dispatch => {
  dispatch({ type: FETCH_START });
  axios
    .post("stamp/api/insertStamp", data)
    .then(res => {
      if (res.data.mes === "StampOk") {
        dispatch({ type: FETCH_SUCCESS });
        dispatch(show_message_success("Stamp Success"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        dispatch({ type: FETCH_SUCCESS });

        dispatch(show_message_error("Stamp Duplicate"));
      }
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

// Parking API
export const load_visitor_detail_parking = visitor_id => async dispatch => {
  dispatch({ type: FETCH_START });

  await axiosParking
    .get(`stamp/api/getInOutDeatail?visitorID=${visitor_id}`, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      console.log(res.data);
      if (!res.data.message) {
        dispatch({
          type: LOAD_INOUT_TRANDETAIL,
          payload: res.data
        });
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: "No have visitor ID"
        });
        dispatch({ type: REMOVE_DATA_VISITOR });
      }
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const insertStampParking = data_stamp => async dispatch => {
  dispatch({ type: FETCH_START });

  await axiosParking
    .post(`stamp/api/insertStamp`, data_stamp, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });

      if (res.data.message === "Success") {
        dispatch(show_message_success("Stamp Success"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        dispatch(show_message_error("Stamp Error"));
      }
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

// End Parking AIP//
