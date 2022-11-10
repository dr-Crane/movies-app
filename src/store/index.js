import {configureStore} from "@reduxjs/toolkit";
import moviesPageReducer from "./reducers/moviesPageReducer";
import movieReducer from "./reducers/movieReducer";
import userReducer from "./reducers/userReducer";
import favouritesReducer from "./reducers/favouritesReducer";

export const store = configureStore({
    reducer : {
        moviesPageReducer : moviesPageReducer,
        movieReducer : movieReducer,
        userReducer : userReducer,
        favouritesReducer : favouritesReducer
    }
});