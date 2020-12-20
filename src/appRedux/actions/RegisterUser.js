import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  LOAD_USER_ADMIN,
  ADMIN_LEVEL_LIST,
  LOAD_USER_DETAIL,
  SHOW_MESSAGE_SUCCESS,
  ADD_USER_ADMIN,
  LOAD_ADMIN_RESET_PASSWORD
} from "../../constants/ActionTypes";
import axiosParking from "../../util/ApiParking";
import axios from "../../util/Api";
import { history } from "../store/index";
export const load_user_admin = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/adminlist`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_USER_ADMIN, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_admin_level = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/Leveladmin`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: ADMIN_LEVEL_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};
export const register_user_admin = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post(`api/stamp/RegisterUser`, data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });

      dispatch(load_user_admin());
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const register_user_parking = data => async dispatch => {
  console.log("data =>", data);
  var data_1 = {
    uerId: "0",
    login_name: "string",
    password: "string",
    confirmPassword: "string",
    fullName: "string",
    terncode: "string",
    custom: "string",
    ternsubcode: "string",
    admin_level: "string",
    admin_level_update: "string"
  };

  dispatch({ type: FETCH_START });
  await axiosParking
    .post(`/api/stamp/registeruser`, data_1)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });

      // dispatch({ type: ADD_USER_ADMIN, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const update_user_admin_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .post(`/api/stamp/updateuser`, data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
  // dispatch({type:});
};

export const delete_user_parking = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axiosParking
    .post(`/api/stamp/deleteuser`, data)
    .then(res => {
      dispatch({ type: FETCH_START });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_user_detail = user_id => async dispatch => {
  await axios
    .get(`api/stamp/UserDetail?user_id=${user_id}`)
    .then(res => {
      dispatch({ type: LOAD_USER_DETAIL, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const update_user_admin = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post(`api/stamp/UpdateUser`, data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });

      dispatch(load_user_admin());
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const delete_user_admin = data_user_id => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post(`api/stamp/DeleteUser?adminId=${data_user_id}`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });

      dispatch({ type: SHOW_MESSAGE_SUCCESS, payload: "Delete Success" });
      dispatch(load_user_admin());
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_admin_reset_passwword = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/admin/GetResetPassword`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_ADMIN_RESET_PASSWORD, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const update_password = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post(`api/stamp/admin/Updatepassword`, data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });

      dispatch({
        type: SHOW_MESSAGE_SUCCESS,
        payload: "แก้ไข Password สำเร็จ"
      });
      history.push(`${process.env.PUBLIC_URL}/`);
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};
