import userActions from "./constants";

const initialState = {
    connected: false,
    username: "",
    image: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.SIGN_IN:
      return {
        ...state,
        connected: true,
        username: action.username,
      };
    case userActions.SIGN_OUT:
      return {
        ...state,
        connected: false,
        username: "",
      };
    default:
      return state;
  }
}