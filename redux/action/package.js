import * as Types from "../constants/actionTypes";
import storage from "../../util/localStorage";

export const addPackageToCart = (item) => (dispatch) => {
  dispatch({
    type: Types.ADD_PACKAGE_TO_CART,
    payload: { item },
  });
};

export const deletePackageFromCart = (item) => (dispatch) => {
  dispatch({
    type: Types.DELETE_PACKAGE_FROM_CART,
    payload: { item },
  });
};
