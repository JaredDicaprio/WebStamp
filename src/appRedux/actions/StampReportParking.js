import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  LOAD_ACTIVE_STAMP_PARKING,
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

import axiosParking from "util/ApiParking";

export const load_stamp_report_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(
      `api/stamp/stampReport?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&TernsubCode=${data.TernsubCode}&in_out=${data.in_out}&stamp_status=${data.stamp_status}&car_type=${data.car_type}`,
      {
        headers: {
          Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
        }
      }
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_REPORT_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_department_list_parking = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(`api/stamp/GetDepartmentlist`, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_DEPARTMENT_LIST_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_stamp_code_all_parking = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(`api/stamp/stampCodeAll`, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      console.log(res.data);
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_CODE_ALL_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_stamp_report_by_custom_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(
      `api/stamp/StampReportByCustom?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&ternsubcode=${data.ternsubcode}&stamp_status=${data.stamp_status}&car_type=${data.car_type}&custom=${data.custom}`,
      {
        headers: {
          Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
        }
      }
    )
    .then(res => {
      console.log(res.data);
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_BY_COSTOM_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_stamp_report_by_stamp_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(
      `api/stamp/StampReportByStamp?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&TernsubCode=${data.TernsubCode}&stamp_status=${data.stamp_status}`,
      {
        headers: {
          Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
        }
      }
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_BY_STAMP_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_stamp_report_by_user = data => async dispatch => {
  dispatch({ type: FETCH_START });

  await axiosParking
    .get(
      // "api/stamp/StampReportByUser?start_date=2020-07-02 17:09:23.803&end_date=2020-08-07 11:14:54.440&stamp_code=8888&TernsubCode=6&admin_name=CRM singhaEstate",
      `api/stamp/StampReportByUser?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&TernsubCode=${data.TernsubCode}&admin_name=${data.admin_name}`,
      {
        headers: {
          Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
        }
      }
    )
    .then(res => {
      console.log(res.data);
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_BY_USER_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_admin_list_parking2 = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(`api/stamp/adminlist`, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      console.log(res.data);
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_ADMIN_SYSTME_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_admin_list_parking = () => async dispatch => {
  dispatch({ type: FETCH_START });

  await axiosParking
    .get(`api/stamp/GetDepartmentlist`, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .the(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_ADMIN_LIST_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_summary_report_stmpa_by_stamp_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(
      `api/stamp/ReportSummaryByStamp?start_date=${data.start_date}&end_date=${data.end_date}&stamp_code=${data.stamp_code}&car_type=${data.car_type}`,
      {
        headers: {
          Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
        }
      }
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_STAMP_REPORT_BY_STAMP_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_admin_system_parking = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .get(`api/stamp/adminlist`, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_ADMIN_SYSTME_PARKING, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_stamp_report_by_department_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .post(`api/stamp/StampReportByDepartment`, data, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("tokenParking")}`
      }
    })
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({
        type: LOAD_STAMP_REPORT_BY_DEPARTMENT_PARKING,
        payload: res.data
      });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};
