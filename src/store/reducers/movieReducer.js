import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchMovie = createAsyncThunk(
    "movie/fetchMovie",
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch('https://react-midterm.kreosoft.space/api/movies/details/' + id);
            if (!response.ok) {
                return new Error('Server error');
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPostReview = createAsyncThunk(
    "movie/fetchPostReview",
    async function ({id, token, review}, {rejectWithValue}) {
        try {
            const response = await fetch(`https://react-midterm.kreosoft.space/api/movie/${id.id}/review/add`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(review)
            });
            if (!response.ok) {
                return console.log(response.status);
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchRemoveReview = createAsyncThunk(
    "movie/fetchRemoveReview",
    async function ({reviewId, token, movieId}, {rejectWithValue}) {
        try {
            const response = await fetch(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/${reviewId}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (!response.ok) {
                return console.log(response.status);
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchEditReview = createAsyncThunk(
    "movie/fetchEditReview",
    async function ({reviewId, token, review, movieId}, {rejectWithValue}) {
        try {
            const response = await fetch(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/${reviewId}/edit`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(review)
            });
            console.log(JSON.stringify(review))
            if (!response.ok) {
                return console.log(response.status);
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const movieReducer = createSlice({
    name: 'movie',
    initialState: {
        movie: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchMovie.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.movie = action.payload;
            state.error = null;
        },
        [fetchMovie.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [fetchPostReview.fulfilled]: (state) => {
            state.status = 'resolved';
            state.error = null;
        },
        [fetchPostReview.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [fetchRemoveReview.fulfilled]: (state) => {
            state.status = 'resolved';
            state.error = null;
        },
        [fetchRemoveReview.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [fetchEditReview.fulfilled]: (state) => {
            state.status = 'resolved';
            state.error = null;
        },
        [fetchEditReview.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
});

const {reducer} = movieReducer;

export default reducer;