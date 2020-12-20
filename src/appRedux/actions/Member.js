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
  LOAD_DOCLIST,
  SEND_EMAIL_UPLOAD_FILE
} from "../../constants/ActionTypes";
import { history } from "../store/index";
import axios from "../../util/Api";

export const load_member_list = data => async dispatch => {
  dispatch({ type: FETCH_START });

  await axios
    .get(`api/stamp/memberlist?cardType=${data.cardType}`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_MEMBER_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_member_department = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/getMemnerDepartmentList`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_MEMBER_DEPARTMENT, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_department = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/DepartmentList`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_DEPARTMENT, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_card_type = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get("api/stamp/GetCardTypeList")
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_CARD_TYPE, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_member_tran_inout = data => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(
      `api/stamp/MemberTransection?depId=${data.depId}&CardType=${data.CardType}&CscMain=${data.CscMain}&startdate=${data.startdate}&end_date=${data.end_date}&in_out=${data.in_out}`
    )
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_MEMBER_TRAN_INOUT, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_member_company = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/MemberCompany`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_MEMNER_COMPANY, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_require_change_member = () => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/RequireChangeMember`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_REQIRECHENG_MEMNER_LIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const upload_file = (formData, ReqId) => async dispatch => {
  dispatch({ type: FETCH_START });

  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  await axios
    .post(`api/cdr/uploadfile`, formData, config)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch(load_doc_list(ReqId));
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const load_doc_list = reqId => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/GetDocList?reqId=${reqId}`)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: LOAD_DOCLIST, payload: res.data });
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};

export const send_email_uploadFile = reqId => async dispatch => {
  dispatch({ type: FETCH_START });
  await axios
    .get(`api/stamp/SendEmail?reqId=${reqId}`)
    .then(res => {
      //dispatch({ type: FETCH_SUCCESS });
      history.push(`${process.env.PUBLIC_URL}/RequireChangeMember`);
    })
    .catch(function(error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
};
