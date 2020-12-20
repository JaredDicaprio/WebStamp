import {
  LOAD_USER_ADMIN,
  ADD_USER_ADMIN,
  ADMIN_LEVEL_LIST,
  LOAD_USER_DETAIL,
  LOAD_ADMIN_RESET_PASSWORD
} from "../../constants/ActionTypes";

const INIT_STATE = {
  data_user_admin: [],
  data_admin_level_list: [],
  data_user_detail: [],
  data_admin_parking: [],
  data_admin_reset_password: []
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_USER_ADMIN: {
      return { ...state, data_user_admin: action.payload };
    }
    case ADMIN_LEVEL_LIST: {
      return { ...state, data_admin_level_list: action.payload };
    }
    case ADD_USER_ADMIN: {
      return {
        ...state,
        data_admin_parking: action.payload
      };
    }
    case LOAD_USER_DETAIL: {
      return { ...state, data_user_detail: action.payload };
    }
    case LOAD_ADMIN_RESET_PASSWORD: {
      return { ...state, data_admin_reset_password: action.payload };
    }
    default:
      return state;
  }
};
