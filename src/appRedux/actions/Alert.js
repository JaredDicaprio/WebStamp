import {
  SHOW_MESSAGE_ERROR,
  SHOW_MESSAGE_SUCCESS,
  SHOW_MESSAGE_HIDE,
  FETCH_ERROR
} from "../../constants/ActionTypes";

export const show_message_success = mes => dispatch => {
  dispatch({ type: SHOW_MESSAGE_SUCCESS, payload: mes });
  // dispatch({ type: SHOW_MESSAGE_SUCCESS, payload: mes });
  // setTimeout(() => {
  //   dispatch({ type: SHOW_MESSAGE_HIDE });
  // }, 1000);
};

export const show_message_error = mes => dispatch => {
  // dispatch({ type: SHOW_MESSAGE_ERROR, payload: mes });
  // setTimeout(() => {
  //   dispatch({ type: SHOW_MESSAGE_HIDE });
  // }, 1000);
  dispatch({ type: FETCH_ERROR, payload: mes });
};
