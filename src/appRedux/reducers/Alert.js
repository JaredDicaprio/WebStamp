import {
  SHOW_MESSAGE_ERROR,
  SHOW_MESSAGE_SUCCESS,
  SHOW_MESSAGE_HIDE
} from "../../constants/ActionTypes";

const INIT_STATE = {
  shows: false,
  type: "",
  message: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_MESSAGE_SUCCESS: {
      return {
        ...state,
        type: "success",
        message: action.payload,
        shows: true
      };
    }
    case SHOW_MESSAGE_ERROR: {
      return { ...state, type: "error", message: action.payload, shows: true };
    }
    case SHOW_MESSAGE_HIDE: {
      return { ...state, message: "", shows: false };
    }

    default:
      return state;
  }
};
