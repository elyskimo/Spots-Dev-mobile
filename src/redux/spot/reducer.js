import spotsActions from "./constants";

const initialState = {
    spots: []
};

export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case spotsActions.SET_SPOTS:
            return {
                ...state,
                spots: action.spots,
            };
        default:
            return state;
    }
}