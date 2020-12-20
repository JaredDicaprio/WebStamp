import {
  LOAD_ACTIVE_STAMP,
  LOAD_ACTIVE_STAMP_PARKING,
  LOAD_CHANGE_STAMP
} from "../../constants/ActionTypes";

const INIT_STATE = {
  data_active_stamp: [],
  data_change_stamp: [],
  data_active_stamp_parking: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_ACTIVE_STAMP: {
      return { ...state, data_active_stamp: action.payload };
    }
    case LOAD_CHANGE_STAMP: {
      return { ...state, data_change_stamp: action.payload };
    }
    case LOAD_ACTIVE_STAMP_PARKING: {
      return { ...state, data_active_stamp_parking: action.payload };
    }
    default:
      return state;
  }
};
