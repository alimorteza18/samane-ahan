import { combineReducers } from "redux";
import products from "./product";
import cart from "./cart";
import wishlist from "./wishlist";
import quickView from "./quickView";
import compare from "./compare";
import productFilters from "./productFilters";
import auth from "./auth";
import packages from "./package";

const rootReducer = combineReducers({
  auth,
  packages,
  products,
  cart,
  wishlist,
  quickView,
  compare,
  productFilters,
});

export default rootReducer;
