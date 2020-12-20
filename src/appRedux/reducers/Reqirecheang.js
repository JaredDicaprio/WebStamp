import {
  LOAD_REQUIRE_CARTYPE,
  LOAD_PAYMENT_LIST,
  LOAD_CONTAC_TYPE_LIST,
  GET_MEMBER_NAME_LIST,
  GET_USER_INFO
} from "../../constants/ActionTypes";

const INIT_STATE = {
  data_require_cartype: [],
  data_payment_list: [],
  data_contact_type_list: [],
  data_member_name_list: [],
  data_user_info: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_REQUIRE_CARTYPE: {
      return { ...state, data_require_cartype: action.payload };
    }
    case LOAD_PAYMENT_LIST: {
      return { ...state, data_payment_list: action.payload };
    }
    case LOAD_CONTAC_TYPE_LIST: {
      return { ...state, data_contact_type_list: action.payload };
    }
    case GET_MEMBER_NAME_LIST: {
      return { ...state, data_member_name_list: action.payload };
    }
    case GET_USER_INFO: {
      return { ...state, data_user_info: action.payload };
    }
    default:
      return state;
  }
};
