import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchAddFavourite = createAsyncThunk(
    "favourite/fetchAddFavourite",
    async function({id, token}, {rejectWithValue}){
        try {
            const response = await fetch(`https://react-midterm.kreosoft.space/api/favorites/${id}/add`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            if (!response.ok) {
                console.log(response.status);
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGetFavourites = createAsyncThunk(
    "favourite/fetchGetFavourites",
    async function(token, {rejectWithValue}){
        try {
            const response = await fetch("https://react-midterm.kreosoft.space/api/favorites", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            if (!response.ok) {
                console.log(response.status);
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchRemoveFavourite = createAsyncThunk(
    "favourite/fetchRemoveFavourite",
    async function({id, token}, {rejectWithValue}){
        try {
            const response = await fetch(`https://react-midterm.kreosoft.space/api/favorites/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            if (!response.ok) {
                console.log(response.status);
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const favouritesSlice = createSlice({
    name : "favourite",
    initialState : {
        error : null,
        status : null,
        movies : []
    },
    reducers : {},
    extraReducers : {
        [fetchAddFavourite.fulfilled]: (state) => {
            state.status = 'resolved';
            state.error = null;
        },
        [fetchAddFavourite.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [fetchRemoveFavourite.fulfilled]: (state) => {
            state.status = 'resolved';
            state.error = null;
        },
        [fetchRemoveFavourite.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [fetchGetFavourites.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.movies = action.payload.movies;
            state.error = null;
        },
        [fetchGetFavourites.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
})

const {reducer} = favouritesSlice;

export default reducer;