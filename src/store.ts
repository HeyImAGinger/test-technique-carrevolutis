import {createStore, combineReducers} from "redux";

const launchInitialState = {
    favorites: new Array<string>(),
}

const launchReducer = (state = launchInitialState, action: any) => {
    const stateCopy = {...state, favorites: [...state.favorites]}
    if (action.type === "ADD_LAUNCH") {
        stateCopy.favorites.push(action.payload.favorite);
    } else if (action.type === "REMOVE_LAUNCH") {
        const arr = [...state.favorites];
        for( var i = 0; i < arr.length; i++){

            if ( arr[i] === action.payload.favorite) {
                arr.splice(i, 1);
                i--;
            }
        }
        stateCopy.favorites = [...arr];
    }
    return stateCopy;
}


const birthdayInitialState = {
    date: "2022",
}

const birthdayReducer = (state = birthdayInitialState, action: any) => {
    const stateCopy = {...state}
    if (action.type === "SAVE") {
        stateCopy.date = action.payload.date;
    }
    return stateCopy;
}


const rootReducers = combineReducers({
    launchReducer,
    birthdayReducer
});

const store = createStore(rootReducers);

export default store;