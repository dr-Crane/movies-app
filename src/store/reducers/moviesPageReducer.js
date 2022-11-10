import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchMoviesPage = createAsyncThunk(
    "moviesPage/fetchMoviesPage",
    async function (page, {rejectWithValue}) {
        try {
            const response = await fetch('https://react-midterm.kreosoft.space/api/movies/' + page);
            if (!response.ok) {
                return new Error('Server Error');
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const moviesPageReducer = createSlice({
    name: "moviesPage",
    initialState: {
        moviesPage: [],
        status: null,
        error: null,
        currentPage: 1,
        totalPages: 0
    },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        }
    },
    extraReducers: {
        [fetchMoviesPage.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchMoviesPage.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.moviesPage = action.payload;
            state.totalPages = action.payload?.pageInfo.pageCount;
        },
        [fetchMoviesPage.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

const {actions, reducer} = moviesPageReducer;

export const {setCurrentPage} = actions;

export default reducer;