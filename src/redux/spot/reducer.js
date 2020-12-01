import spotActions from "./constants";

const initialState = {
    spot: {name:"",latitude:null,longitude:null,type:null,url:""}
};

export default function spotReducer(state = initialState, action) {
    switch (action.type) {
        case spotActions.ADD_SPOT:
            return {
                ...state,
                spot: action.spot,
            };
        default:
            return state;
    }
}