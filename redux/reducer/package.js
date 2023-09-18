import storage from "../../util/localStorage";
import * as Types from "../constants/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case Types.INIT_LOCALSTORAGE:
      return [...action.payload.packages];

    case Types.ADD_PACKAGE_TO_CART:
      let newselectedPackages = [...state];
      const foundedItemIndex = newselectedPackages.indexOf(
        action?.payload?.item
      );

      if (foundedItemIndex > -1) {
        newselectedPackages.splice(foundedItemIndex, 1);

        storage.set("packages", [...newselectedPackages]);
        return [...newselectedPackages];
      } else {
        storage.set("packages", [...state, action.payload.item]);
        return [...state, action.payload.item];
      }

    case Types.DELETE_PACKAGE_FROM_CART:
      return [...state];

    default:
      return state;
  }
};
