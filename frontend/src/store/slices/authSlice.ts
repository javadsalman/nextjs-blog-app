import iaxios from "@/api/iaxios";
import { autoBatchEnhancer, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthorInfo } from "types";
import  * as authApi from '../../api/authApi';


const initialAuthInfo: IAuthorInfo = {
    id: 0,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    token: "",
}

interface IAuthState {
    authInfo: IAuthorInfo,
    loginStatus: 'notchecked' | 'loggedIn' | 'loggedOut',
}

const initialState: IAuthState = {
    authInfo: initialAuthInfo,
    loginStatus: 'notchecked',
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<IAuthorInfo>) => {
            state.authInfo = action.payload;
            state.loginStatus = 'loggedIn';
        },
        clearAuth: (state) => {
            state.authInfo = initialAuthInfo;
            state.loginStatus = 'loggedOut';
        }
    }
});

export const { setAuth, clearAuth } = authSlice.actions;


export const loginAction = createAsyncThunk<void, {username: string, password: string}>('auth/login/', async ({username, password}, {dispatch}) => {
    authApi.login(username, password).then((response) => {
        dispatch(setAuth(response.data));
        localStorage.setItem('authInfo', JSON.stringify(response.data));
        iaxios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
    })
})

type RegisterParams = {username: string, password: string, email: string, first_name: string, last_name: string}
export const registerAction = createAsyncThunk<void, RegisterParams>('auth/register/', async ({username, password, email, first_name, last_name}, {dispatch}) => {
    authApi.register(username, password, email, first_name, last_name).then((response) => {
        dispatch(setAuth(response.data));
        localStorage.setItem('authInfo', JSON.stringify(response.data));
        iaxios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
    })
})

export const logoutAction =  createAsyncThunk<void, void>('auth/logout/', async (_, {dispatch}) => {
    authApi.logout().then((response) => {
        dispatch(clearAuth());
        localStorage.removeItem('authInfo');
        iaxios.defaults.headers.common['Authorization'] = '';
    })
})

export const checkLoginAction = createAsyncThunk<void, void>('auth/checkLogin/', async (_, {dispatch}) => {
    const authInfo = localStorage.getItem('authInfo');
    if (authInfo) {
        dispatch(setAuth(JSON.parse(authInfo)));
        iaxios.defaults.headers.common['Authorization'] = `Token ${JSON.parse(authInfo).token}`;
    } else {
        dispatch(clearAuth());
    }
})