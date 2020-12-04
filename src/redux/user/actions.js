import userActions from "./constants";

export function connectUser(username,email) {
  return async function (dispatch) {
    dispatch({ type: userActions.SIGN_IN, username: username, email: email });
  };
}

export function disconnectUser() {
  return async function (dispatch) {
    dispatch({ type: userActions.SIGN_OUT });
  };
}
