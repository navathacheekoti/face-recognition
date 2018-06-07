import {INPUTCHANGE,FACEBOX,ONSUBMIT,SIGNOUT,HOME,ON_ROUTE} from "./constant";

const initialState = {
    input: "",
    imageUrl: "",
    box: {},
    route: "signin",
    isSignedIn: false
};
const RootReducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUTCHANGE:
            return {
                ...state,
                input: action.payload
            };
        case FACEBOX:
            return {
                ...state,
                box: action.payload
            };
        case ONSUBMIT:
            return {
                ...state,
                imageUrl: action.payload
            };
        case SIGNOUT:
            return {
                ...state,
                input: action.payload.input,
                isSignedIn: action.payload.isSignedIn,
                box: action.payload.box,
                imageUrl: action.payload.imageUrl,
                route:action.payload.route

            };
        case HOME:
            return {
                ...state,
                isSignedIn: action.payload.isSignedIn,
                route:action.payload.route
            };
        case ON_ROUTE:
            return {
                ...state,
                route: action.payload
            };
            default:
            return{
                ...state
            }

    }
    // return state;
};
export default RootReducer;
