import {
  LOAD_VISITOR_DETAIL,
  REMOVE_DATA_VISITOR,
  LOAD_INOUT_TRANDETAIL,
  REMOVE_INOUT_TRANDETAIL
} from "../../constants/ActionTypes";

const INIT_STATE = {
  visitor_detail: [],
  stampmodel: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_VISITOR_DETAIL: {
      return { ...state, visitor_detail: action.payload };
    }
    case REMOVE_DATA_VISITOR: {
      return { ...state, visitor_detail: [] };
    }
    case LOAD_INOUT_TRANDETAIL: {
      return { ...state, stampmodel: action.payload };
    }
    case REMOVE_INOUT_TRANDETAIL: {
      return { ...state, stampmodel: [] };
    }
    default:
      return state;
  }
};
