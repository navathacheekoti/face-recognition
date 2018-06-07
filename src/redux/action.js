import {INPUTCHANGE,FACEBOX,ONSUBMIT,SIGNOUT,HOME,ON_ROUTE} from './constant';
export const onInputChange = event => {
    return {
        type: INPUTCHANGE,
        payload: event.target.value
    };
};
export const displayFaceBox = box => {
    return {
        type: FACEBOX,
        payload: box
    };
};
export const onButton = input => {
    return {
        type: ONSUBMIT,
        payload: input
    };
};
export const onRouteChange = route => {
    if(route==='signout'){
        return{
            type:SIGNOUT,
            payload:{
                input:'',
                imageUrl:'',
                box:{},
                route:'signin',
                isSignedIn:false
            }

            // payload:{isSignedIn:false,route:route}
        }
    }
    else if (route==='home'){
        return{
            type:HOME,
            payload:{isSignedIn:true,route:route}
        }
    }
    else {
        return{
            type:ON_ROUTE,
            payload:route
        }
    }


};
