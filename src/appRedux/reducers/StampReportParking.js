import {
  LOAD_STAMP_REPORT_PARKING,
  LOAD_DEPARTMENT_LIST_PARKING,
  LOAD_STAMP_CODE_ALL_PARKING,
  LOAD_STAMP_BY_COSTOM_PARKING,
  LOAD_STAMP_BY_STAMP_PARKING,
  LOAD_STAMP_BY_USER_PARKING,
  LOAD_ADMIN_LIST_PARKING,
  LOAD_STAMP_REPORT_BY_STAMP_PARKING,
  LOAD_ADMIN_SYSTME_PARKING,
  LOAD_STAMP_REPORT_BY_DEPARTMENT_PARKING
} from "../../constants/ActionTypes";
const INIT_STATE = {
  data_stamp_report_parking: [],
  data_department_list_parking: [],
  data_stamp_code_all_parking: [],
  data_stamp_report_custom_parking: [],
  data_stamp_report_stamp_by_stamp: [],
  data_stamp_report_stamp_by_user: [],
  data_admin_list_parking: [],
  data_stamp_report_summary_stamp_by_stamp_parking: [],
  data_admin_system_parking: [],
  data_stamp_report_by_department: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_STAMP_REPORT_PARKING: {
      return { ...state, data_stamp_report_parking: action.payload };
    }
    case LOAD_DEPARTMENT_LIST_PARKING: {
      return { ...state, data_department_list_parking: action.payload };
    }
    case LOAD_STAMP_CODE_ALL_PARKING: {
      return { ...state, data_stamp_code_all_parking: action.payload };
    }
    case LOAD_STAMP_BY_COSTOM_PARKING: {
      return { ...state, data_stamp_report_custom_parking: action.payload };
    }
    case LOAD_STAMP_BY_STAMP_PARKING: {
      return { ...state, data_stamp_report_stamp_by_stamp: action.payload };
    }
    case LOAD_STAMP_BY_USER_PARKING: {
      return { ...state, data_stamp_report_stamp_by_user: action.payload };
    }
    case LOAD_ADMIN_LIST_PARKING: {
      return { ...state, data_admin_list_parking: action.payload };
    }
    case LOAD_STAMP_REPORT_BY_STAMP_PARKING: {
      return {
        ...state,
        data_stamp_report_summary_stamp_by_stamp_parking: action.payload
      };
    }
    case LOAD_ADMIN_SYSTME_PARKING: {
      return { ...state, data_admin_system_parking: action.payload };
    }
    case LOAD_STAMP_REPORT_BY_DEPARTMENT_PARKING: {
      return { ...state, data_stamp_report_by_department: action.payload };
    }
    default:
      return state;
  }
};
