import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AUTH_SLICE} from "../nameSlices";
import {signIn, SignInInput, signOut, fetchUserAttributes, AuthError} from 'aws-amplify/auth';

interface UserInformation {
    sub?: string;
    name?: string;
    email?: string;
    address?: string;
    family_name?: string;
    phone_number?: string;
}

interface UserAuthState {
    isSignedIn: boolean;
    statusMessage: string;
    userInformation: UserInformation | null;
}

interface LoginPayload {
    isSignedIn: boolean;
    userInformation: UserInformation;
}

const initialState: UserAuthState = {
    isSignedIn: false,
    userInformation: null,
    statusMessage: ""
}

const authSlice = createSlice({
    name: AUTH_SLICE,
    initialState,
    reducers: {
        setSignIn(state, action: PayloadAction<LoginPayload>) {
            state.isSignedIn = action.payload.isSignedIn;
            state.userInformation = action.payload.userInformation;
        },
        setSignOut(state) {
            state.isSignedIn = false;
            state.userInformation = null;
        },
        setStatusMessage(state, action: PayloadAction<string>) {
            state.statusMessage = action.payload;
        }
    }
})

enum AsyncThunkTypes {
    SIGN_IN = "auth/signIn",
    SIGN_OUT = "auth/signOut"
}

interface SignInPayload {
    emailParams: string;
    passwordParams: any;
}

enum AuthFlowTypes {
    USER_PASSWORD_AUTH = 'USER_PASSWORD_AUTH',
}

enum AuthFlowErrorTypes {
    USER_NOT_EXIST = 'User does not exist.',
    USER_OR_PASSWORD_INCORRECT = 'Incorrect username or password.',
}

export const SignOut = createAsyncThunk
(AsyncThunkTypes.SIGN_OUT, async (_, thunk) => {
    try {
        await signOut();
        thunk.dispatch(setSignOut());
    } catch (error) {
        return thunk.rejectWithValue(error);
    }
})

export const SignIn = createAsyncThunk
(AsyncThunkTypes.SIGN_IN, async ({emailParams, passwordParams}: SignInPayload, thunkAPI): Promise<void> => {
    try {
        const {username, password}: SignInInput = {
            username: emailParams,
            password: passwordParams
        }
        const [signInResponse] = await Promise.all([
            signIn({
                username,
                password,
                options: {
                    authFlowType: AuthFlowTypes.USER_PASSWORD_AUTH
                }
            }),
        ]);
        let attributesUser = await fetchUserAttributes()
        const {email, name, family_name, address, sub, phone_number} = attributesUser;
        const userInformation = {
            sub,
            name,
            email,
            address,
            family_name,
            phone_number
        }
        thunkAPI.dispatch(setSignIn({
            isSignedIn: signInResponse.isSignedIn,
            userInformation
        }));
    } catch (error: AuthError | any) {
        if (error instanceof AuthError) {
            switch (error.message) {
                case AuthFlowErrorTypes.USER_NOT_EXIST:
                    thunkAPI.dispatch(authSlice.actions.setStatusMessage('El usuario no existe'));
                    break;
                case AuthFlowErrorTypes.USER_OR_PASSWORD_INCORRECT:
                    thunkAPI.dispatch(authSlice.actions.setStatusMessage('El usuario o la contraseña son incorrectos'));
                    break;
                default:
                    thunkAPI.dispatch(authSlice.actions.setStatusMessage('Error desconocido'));
                    break;
            }
        }

    }
})

export const authReducer = authSlice.reducer;
export const {
    setSignIn,
    setSignOut
} = authSlice.actions;