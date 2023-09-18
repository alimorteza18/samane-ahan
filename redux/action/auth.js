import * as Types from "../constants/actionTypes";
import storage from "../../util/localStorage";

/**
 * @description after successfull logging in, save returned data
 * @param {*} product
 * @returns
 */
export const saveLoggedInUserData = (profile) => (dispatch) => {
  dispatch({ type: Types.SAVE_LOGGED_IN_USER_DATA, payload: { profile } });
};

export const saveLoggedInUser = (user) => (dispatch) => {
  dispatch({ type: Types.SAVE_LOGGED_IN_USER_DATA, payload: { user } });
};

export const saveLoggedInVendor = (vendor) => (dispatch) => {
  dispatch({ type: Types.SAVE_LOGGED_IN_USER_DATA, payload: { vendor } });
};

/**
 * @description Logout
 * @param {*} product
 * @returns
 */
export const deleteLoggedInUserData = () => (dispatch) => {
  dispatch({ type: Types.DLETE_LOGGED_IN_USER_DATA });
};

export const saveAccessToken = (access_token) => (dispatch) => {
  dispatch({ type: Types.SAVE_ACCESS_TOKEN, payload: { access_token } });
};

export const updateUserProfile = (user) => (dispatch) => {
  dispatch({ type: Types.UPDATED_USER_PROFILE, payload: { user } });
};

export const saveAdminAccessToken = (admin_access_token) => (dispatch) => {
  dispatch({
    type: Types.SAVE_ADMIN_ACCESS_TOKEN,
    payload: { admin_access_token },
  });
};

export const saveLoggedInAdmin = (admin_profile) => (dispatch) => {
  dispatch({
    type: Types.SAVE_LOGGED_IN_ADMIN_DATA,
    payload: { admin_profile },
  });
};

export const deleteLoggedInAdminData = () => (dispatch) => {
  dispatch({ type: Types.DLETE_LOGGED_IN_ADMIN_DATA });
};

export const toggleAdminEditMode = () => (dispatch) => {
  dispatch({ type: Types.TOGGLE_ADMIN_EDIT_MODE });
};
