import userActions from "./constants";

const initialState = {
    connected: false,
    username: "Michaela",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.SIGN_IN:
      return {
        ...state,
        connected: true,
      };
    case userActions.SIGN_OUT:
      return {
        ...state,
        connected: false,
      };
    default:
      return state;
  }
}