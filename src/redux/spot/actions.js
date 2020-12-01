import spotActions from "./constants";

export function addSpot(spot) {
    return async function (dispatch) {
        dispatch({ type: spotActions.ADD_SPOT, spot: spot });
    };
}
