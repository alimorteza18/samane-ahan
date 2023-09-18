import storage from "../../util/localStorage";
import * as Types from "../constants/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case Types.INIT_LOCALSTORAGE:
      const results = {};

      if (
        action.payload?.profile &&
        Object.keys(action.payload?.profile).length
      )
        results.profile = action.payload?.profile?.profile;
      if (
        action.payload?.admin_profile &&
        Object.keys(action.payload?.admin_profile).length
      )
        results.admin_profile = action.payload?.admin_profile;

      return results;

    case Types.SAVE_ACCESS_TOKEN:
      storage.set("access_token", action.payload.access_token);
      return { ...state };

    case Types.SAVE_LOGGED_IN_USER_DATA:
      /**
       * @description you can change the whole profile (user and vendor) or change them seperately
       */
      const tempProfile = action.payload.profile
        ? action.payload.profile
        : {
            user: action.payload?.user ?? state.profile?.user,
            vendor: action.payload?.vendor ?? state.profile?.vendor,
          };
      storage.set("profile", { profile: tempProfile });
      return { ...state, profile: tempProfile };
    case Types.DLETE_LOGGED_IN_USER_DATA:
      storage.remove("profile");
      storage.remove("access_token");
      return { ...state, profile: null };

    case Types.UPDATED_USER_PROFILE:
      const profile = storage.get("profile");
      profile.user = action.payload;
      storage.set("profile", profile);
      return { ...state, profile };
    case Types.SAVE_ADMIN_ACCESS_TOKEN:
      storage.set("admin_access_token", action.payload.admin_access_token);
      return { ...state };
    case Types.SAVE_LOGGED_IN_ADMIN_DATA:
      storage.set("admin_profile", action.payload.admin_profile);
      return { ...state, admin_profile: action.payload.admin_profile };
    case Types.DLETE_LOGGED_IN_ADMIN_DATA:
      return { ...state, admin_profile: null };
    case Types.TOGGLE_ADMIN_EDIT_MODE:
      const currentEditMode = storage.get("admin_edit_mode", false);
      storage.set("admin_edit_mode", !currentEditMode);
      return { ...state, admin_edit_mode: !currentEditMode };
    default:
      return state;
  }
};
