import { createStore, combineReducers } from "redux";
import selectedMenuItem from "./selectMenu/reducer";
const reducers = combineReducers({
  selectedMenuItem,
});
export default createStore(reducers);
