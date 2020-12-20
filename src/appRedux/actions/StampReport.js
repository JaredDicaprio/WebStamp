import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
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
import axios from "../../util/Api";
import axiosParking from "util/ApiParking";
export const load_stamp_code_all = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/stampCodeAll`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_CODE_ALL, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_department_list = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/GetDepartmentlist`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_DEPARTMENT_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_stamp_report = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(
      `api/stamp/stampReport?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&TernsubCode=${data.TernsubCode}&in_out=${data.in_out}&stamp_status=${data.stamp_status}&car_type=${data.car_type}`
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_REPORT, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};
export const clear_stamp_report = () => dispatch => {
  dispatch({ type: LOAD_STAMP_REPORT, payload: [] });
};
export const load_custom_list = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/GetCustomList`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_CUSTOM_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const clear_custom_report = () => async dispatch => {
  dispatch({ type: LOAD_CUSTOM_REPORT, payload: [] });
};
export const load_custom_report = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(
      `api/stamp/StampReportByCustom?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&ternsubcode=${data.ternsubcode}&in_out=${data.in_out}&stamp_status=${data.stamp_status}&car_type=${data.car_type}&custom=${data.custom}`
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_CUSTOM_REPORT, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });

  // await axiosParking
  //   .get(
  //     `/api/stamp/stampreportbycustom?sCompanyID=${data.sCompanyID}&start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&TernsubCode=${data.TernsubCode}&in_out=${data.in_out}&stamp_status=${data.stamp_status}&car_type=${data.car_type}&custom=${data.custom}`
  //   )
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(function(error) {
  //     dispatch({ type: FETCH_ERROR, payload: error.message });
  //   });
};

export const clear_stamp_by_stamp_report = () => dispatch => {
  dispatch({ type: LOAD_STAMP_BY_STAMP_REPORT, payload: [] });
};

export const load_stamp_by_stamp_report = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(
      `api/stamp/StampReportByStamp?start_date=${data.start_date}&end_date=${data.end_date}&ternsubcode=${data.ternsubcode}&stamp_code=${data.stamp_code}&status_stamp=${data.status_stamp}`
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_BY_STAMP_REPORT, payload: res.data });
    })
    .catch(function(erro) {
      dispatch({ type: FETCH_ERROR, payload: erro.message });
    });
};

export const load_admin_list = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/admin_list`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_ADMIN_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_stamp_report_by_user = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(
      `api/stamp/StampReportByUser?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&ternsubcode=${data.ternsubcode}&admin_name=${data.admin_name}`
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_BY_USER, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};
export const load_summary_by_department = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post(`api/stamp/StampReportByDepartment`, data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_SUMMERY_STAMP_BY_DEPARTMENT, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_summary_by_stamp = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(
      `api/stamp/ReportSummaryByStamp?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&car_type=${data.car_type}`
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_SUMARY_BY_STAMP, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};
