import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  LOAD_MEMBER_LIST,
  LOAD_MEMBER_DEPARTMENT,
  LOAD_DEPARTMENT,
  LOAD_CARD_TYPE,
  LOAD_MEMBER_TRAN_INOUT,
  LOAD_MEMNER_COMPANY,
  LOAD_REQIRECHENG_MEMNER_LIST,
  LOAD_DOCLIST
} from "../../constants/ActionTypes";

const INIT_STATE = {
  data_member_list: [],
  data_member_department: [],
  data_department: [],
  data_card_type: [],
  data_member_tran_inout: [],
  data_member_company: [],
  data_require_chenge_member: [],
  data_doc_list: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_MEMBER_LIST: {
      return { ...state, data_member_list: action.payload };
    }
    case LOAD_MEMBER_DEPARTMENT: {
      return { ...state, data_member_department: action.payload };
    }
    case LOAD_DEPARTMENT: {
      return { ...state, data_department: action.payload };
    }
    case LOAD_CARD_TYPE: {
      return { ...state, data_card_type: action.payload };
    }
    case LOAD_MEMBER_TRAN_INOUT: {
      return { ...state, data_member_tran_inout: action.payload };
    }
    case LOAD_MEMNER_COMPANY: {
      return { ...state, data_member_company: action.payload };
    }
    case LOAD_REQIRECHENG_MEMNER_LIST: {
      return { ...state, data_require_chenge_member: action.payload };
    }
    case LOAD_DOCLIST: {
      return { ...state, data_doc_list: action.payload };
    }
    default:
      return state;
  }
};
