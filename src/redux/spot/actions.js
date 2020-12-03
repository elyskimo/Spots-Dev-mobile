import spotsActions from "./constants";
import store from "@redux";

export function addSpot(spot) {
    const currentStore = store.getState();
    const { spots } = currentStore.spot;

    const newSpots = [
        ...spots,
        spot
    ];

    return async function (dispatch) {
        dispatch(setSpots(newSpots));
    }
};

export function setSpots(spots) {
    return async function (dispatch) {
        dispatch({ type: spotsActions.SET_SPOTS, spots: spots });
    };
}
