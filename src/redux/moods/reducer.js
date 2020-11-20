import moodsActions from "./constants";

const initialState = {
    moods: [{
        id: 1,
        mood: 5,
        title: "Parfait"
    }],
};

export default function moodsReducer(state = initialState,action) {
    switch (action.type) {
        case moodsActions.SET_MOODS:
            return {
                ...state,
                moods: action.moods,
            };
        default :
            return state;
    }
}