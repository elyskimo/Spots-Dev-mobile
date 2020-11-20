import userActions from "./constants";

export function connectUser() {
  return async function (dispatch) {
    dispatch({ type: userActions.SIGN_IN });
  };
}

export function disconnectUser() {
  return async function (dispatch) {
    dispatch({ type: userActions.SIGN_OUT });
  };
}
