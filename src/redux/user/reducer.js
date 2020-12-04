import userActions from "./constants";

const initialState = {
    connected: false,
    username: "",
    email: "",
    image: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.SIGN_IN:
      return {
        ...state,
        connected: true,
        username: action.username,
        email: action.email,
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