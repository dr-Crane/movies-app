import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchRegisterUser = createAsyncThunk(
    "user/fetchRegisterUser",
    async function (userData, {rejectWithValue}) {
        try {
            const response = await fetch("https://react-midterm.kreosoft.space/api/account/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                console.log(response.status);
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async function (token, {rejectWithValue}) {
        try {
            const response = await fetch("https://react-midterm.kreosoft.space/api/account/profile", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
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

export const fetchLoginUser = createAsyncThunk(
    "user/fetchLoginUser",
    async function (userData, {rejectWithValue}) {
        try {
            const response = await fetch("https://react-midterm.kreosoft.space/api/account/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userData)
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

export const fetchLogout = createAsyncThunk(
    "user/fetchLogout",
    async function (token, {rejectWithValue}) {
        try {
            const response = await fetch("https://react-midterm.kreosoft.space/api/account/logout", {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
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

export const fetchUpdateUser = createAsyncThunk(
    "user/fetchUpdateUser",
    async function ({token, userInfo}, {rejectWithValue}) {
        try {
            const response = await fetch("https://react-midterm.kreosoft.space/api/account/profile", {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body : JSON.stringify(userInfo)
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

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
        status: null,
        error: null,
        nickName: null,
        id : null,
        email : null,
        avatarLink : null,
        name : null,
        birthDate : null,
        gender : null
    },
    reducers: {
        setUser(state, action) {
            state.token = action.payload.token;
        },
        removeUser(state) {
            state.token = null
        }
    },
    extraReducers: {
        [fetchRegisterUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.token = action.payload.token;
            console.log(state.token);
        },
        [fetchRegisterUser.rejected]: (state, action) => {
            state.status = 'rejected';
            state.token = null;
            state.nickName = null;
            state.error = action.payload;
        },
        [fetchUserProfile.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.nickName = action.payload.nickName;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.avatarLink = action.payload.avatarLink;
            state.gender = action.payload.gender;
            state.birthDate = action.payload.birthDate;
        },
        [fetchUserProfile.rejected]: (state, action) => {
            state.status = 'rejected';
            state.token = null;
            state.nickName = null;
            state.error = action.payload;
        },
        [fetchLoginUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.token = action.payload.token;
        },
        [fetchLoginUser.rejected]: (state, action) => {
            state.status = 'rejected';
            state.token = null;
            state.nickName = null;
            state.error = action.payload;
        },
        [fetchLogout.fulfilled]: (state) => {
            state.status = null;
            state.token = null;
            state.error = null;
            state.nickName = null;
        },
        [fetchLogout.rejected]: (state, action) => {
            state.status = 'rejected';
            state.token = null;
            state.error = action.payload;
        },
    }
});

const {reducer} = userSlice;

export default reducer;