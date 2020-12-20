import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  LOAD_REQUIRE_CARTYPE,
  LOAD_PAYMENT_LIST,
  LOAD_CONTAC_TYPE_LIST,
  ADD_REQUIRE_MEMBER,
  GET_MEMBER_NAME_LIST,
  GET_USER_INFO
} from "../../constants/ActionTypes";
import { history } from "../store/index";
import axios from "../../util/Api";

export const load_require_cardtype = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get("api/stamp/GetRequireCarTypeList")
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_REQUIRE_CARTYPE, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_payment_list = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get("api/stamp/GetRequirepayment")
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_PAYMENT_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_contac_type_list = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get("api/stamp/GetContacttypeList")
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_CONTAC_TYPE_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const add_require_member = data => async dispatch => {
  dispatch({ type: FETCH_START });

  await axios
    .post(`api/stamp/AddRequireMember`, data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      history.push(
        `${process.env.PUBLIC_URL}/UploadFile?req=${res.data.reqNo}`
      );
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const get_member_name_list = type => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/GetMemberList?type=${type}`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: GET_MEMBER_NAME_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const get_user_info = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/userInfo?userid=${data.userid}&Typecard=${data.Typecard}`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: GET_USER_INFO, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const Require_Change_Member = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post(`api/stamp/RequireChangeMember`, data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      history.push(
        `${process.env.PUBLIC_URL}/UploadFile?req=${res.data.reqNo}`
      );
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const cancel_member = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .post(`api/stamp/RequireCancelMember`, data)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      history.push(
        `${process.env.PUBLIC_URL}/UploadFile?req=${res.data.reqNo}`
      );
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};
