import userActions from "./constants";

export function connectUser(username) {
  return async function (dispatch) {
    dispatch({ type: userActions.SIGN_IN, username: username });
  };
}

export function disconnectUser() {
  return async function (dispatch) {
    dispatch({ type: userActions.SIGN_OUT });
  };
}
