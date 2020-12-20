import {
  LOAD_STAMP_CODE_ALL,
  LOAD_DEPARTMENT_LIST,
  LOAD_STAMP_REPORT,
  LOAD_CUSTOM_LIST,
  LOAD_CUSTOM_REPORT,
  LOAD_STAMP_BY_STAMP_REPORT,
  LOAD_ADMIN_LIST,
  LOAD_STAMP_BY_USER,
  LOAD_SUMMERY_STAMP_BY_DEPARTMENT,
  LOAD_SUMARY_BY_STAMP
} from "../../constants/ActionTypes";

const INIT_STATE = {
  stamp_code_all: [],
  department_list: [],
  data_stamp_report: [],
  data_custom_list: [],
  data_custom_stamp_report: [],
  data_stamp_by_stamp: [],
  admin_list: [],
  data_stamp_by_user: [],
  data_summary_by_department: [],
  data_summary_by_stamp: []
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_STAMP_CODE_ALL: {
      return { ...state, stamp_code_all: action.payload };
    }
    case LOAD_DEPARTMENT_LIST: {
      return { ...state, department_list: action.payload };
    }
    case LOAD_STAMP_REPORT: {
      return { ...state, data_stamp_report: action.payload };
    }
    case LOAD_CUSTOM_LIST: {
      return { ...state, data_custom_list: action.payload };
    }
    case LOAD_CUSTOM_REPORT: {
      return { ...state, data_custom_stamp_report: action.payload };
    }
    case LOAD_STAMP_BY_STAMP_REPORT: {
      return { ...state, data_stamp_by_stamp: action.payload };
    }
    case LOAD_ADMIN_LIST: {
      return { ...state, admin_list: action.payload };
    }
    case LOAD_STAMP_BY_USER: {
      return { ...state, data_stamp_by_user: action.payload };
    }
    case LOAD_SUMMERY_STAMP_BY_DEPARTMENT: {
      return { ...state, data_summary_by_department: action.payload };
    }
    case LOAD_SUMARY_BY_STAMP: {
      return { ...state, data_summary_by_stamp: action.payload };
    }
    default:
      return state;
  }
};
