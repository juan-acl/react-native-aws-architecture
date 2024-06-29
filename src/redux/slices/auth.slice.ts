import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AUTH_SLICE} from "../nameSlices";
import {signIn, SignInInput, signOut, getCurrentUser} from 'aws-amplify/auth';

interface UserAuthState {
    isSignedIn: boolean;
    userInformation: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    } | null;
}

const initialState: UserAuthState = {
    isSignedIn: false,
    userInformation: null
}

const authSlice = createSlice({
    name: AUTH_SLICE,
    initialState,
    reducers: {
        setSignIn(state, action: PayloadAction<UserAuthState>) {
            state.isSignedIn = action.payload.isSignedIn;
            state.userInformation = action.payload.userInformation;
        },
        setSignOut(state) {
            state.isSignedIn = false;
            state.userInformation = null;
        }
    }
})

enum AsyncThunkTypes {
    SIGN_IN = "auth/signIn",
    SIGN_OUT = "signOut"
}

interface SignInPayload {
    email: string;
    passwordParams: any;
}

enum AuthFlowTypes {
    USER_PASSWORD_AUTH = 'USER_PASSWORD_AUTH',
    CUSTOM_WITH_SRP = 'CUSTOM_WITH_SRP',
    CUSTOM_WITHOUT_SRP = 'CUSTOM_WITHOUT_SRP',
    USER_SRP_AUTH = "USER_SRP_AUTH"
}

export const SignIn = createAsyncThunk
(AsyncThunkTypes.SIGN_IN, async ({email, passwordParams}: SignInPayload, thunkAPI) => {
    try {
        const {username, password}: SignInInput = {
            username: email,
            password: passwordParams
        }
        const promises = [];
        promises.push(signIn({
            username,
            password,
            options: {
                authFlowType: AuthFlowTypes.USER_PASSWORD_AUTH
            }
        }));
        promises.push(getCurrentUser());
        const [signInResponse, currentUser] = await Promise.all(promises);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const authReducer = authSlice.reducer;
export const {
    setSignIn,
    setSignOut
} = authSlice.actions;