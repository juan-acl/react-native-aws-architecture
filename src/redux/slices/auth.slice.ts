import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_SLICE } from "../nameSlices";
import { signIn, SignInInput, signOut, fetchUserAttributes } from 'aws-amplify/auth';

interface UserAuthState {
    isSignedIn: boolean;
    statusMessage: string;
    userInformation: {
        sub?: string;
        name?: string;
        email?: string;
        address?: string;
        family_name?: string;
        phone_number?: string;
    } | null;
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
        setSignIn(state, action: PayloadAction<UserAuthState>) {
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
    CUSTOM_WITH_SRP = 'CUSTOM_WITH_SRP',
    CUSTOM_WITHOUT_SRP = 'CUSTOM_WITHOUT_SRP',
    USER_SRP_AUTH = "USER_SRP_AUTH"
}

export const SignOut = createAsyncThunk
    (AsyncThunkTypes.SIGN_OUT, async (_, thunk) => {
        try {
            await signOut();
            thunk.dispatch(authSlice.actions.setSignOut());
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    })

export const SignIn = createAsyncThunk
    (AsyncThunkTypes.SIGN_IN, async ({ emailParams, passwordParams }: SignInPayload, thunkAPI): Promise<void> => {
        try {
            const { username, password }: SignInInput = {
                username: emailParams,
                password: passwordParams
            }
            const [signInResponse, attributesUser] = await Promise.all([
                signIn({
                    username,
                    password,
                    options: {
                        authFlowType: AuthFlowTypes.USER_PASSWORD_AUTH
                    }
                }),
                fetchUserAttributes()
            ]);
            const { email, name, family_name, address, sub, phone_number } = attributesUser;
            const userInformation = {
                sub,
                name,
                email,
                address,
                family_name,
                phone_number
            }
            thunkAPI.dispatch(authSlice.actions.setSignIn({
                isSignedIn: signInResponse.isSignedIn,
                userInformation,
                statusMessage: ""
            }));
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    })

export const authReducer = authSlice.reducer;
export const {
    setSignIn,
    setSignOut
} = authSlice.actions;