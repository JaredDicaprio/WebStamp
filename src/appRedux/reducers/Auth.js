import {
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_DATA_PARKING,
  USER_TOKEN_SET,
  LOAD_MENU_LIST,
  GET_IP
} from "../../constants/ActionTypes";

const INIT_STATE = {
  token: localStorage.getItem("token"),
  initURL: "",
  authUser: "",
  authUserParking: "",
  data_menu: [],
  IP: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL: {
      return { ...state, initURL: action.payload };
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        authUserParking: null,
        initURL: ""
      };
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload
      };
    }

    case USER_DATA_PARKING: {
      return {
        ...state,
        authUserParking: action.payload
      };
    }
    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload
      };
    }
    case LOAD_MENU_LIST: {
      return {
        ...state,
        data_menu: action.payload
      };
    }
    case GET_IP: {
      return {
        ...state,
        IP: action.payload
      };
    }

    default:
      return state;
  }
};
