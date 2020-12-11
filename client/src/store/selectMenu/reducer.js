import { initState, actionTypes } from "./constants";
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actionTypes.SELECT_MENU_ITEM:
      return { ...state, name: payload };
    default:
      return state;
  }
}
