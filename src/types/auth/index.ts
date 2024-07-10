export interface RegisterOnChangeProps {
  value: string;
  name: string;
}

export interface ConfirmSignUpPayloadParams {
  emailParams: string;
  emailCodeConfirmation: string;
}

export interface StatusAndMessage {
  error: boolean;
  message: string;
  title: string;
  textButton?: string;
}

export const enum AuthFlowErrorTypes {
  USER_NOT_EXIST = "User does not exist.",
  USER_OR_PASSWORD_INCORRECT = "Incorrect username or password.",
}

export const enum AuthFlowTypes {
  USER_PASSWORD_AUTH = "USER_PASSWORD_AUTH",
}

export interface SignUpPayload {
  emailParams: string;
  passwordParams: any;
  nameParams: string;
  lastNameParams: string;
  phoneNumberParams: string;
  addressParams: string;
}

export interface SignInPayload {
  emailParams: string;
  passwordParams: any;
}

export const enum AsyncThunkTypes {
  SIGN_IN = "auth/signIn",
  SIGN_OUT = "auth/signOut",
  SIGN_UP = "auth/signUp",
  CONFIRM_SIGN_UP = "auth/confirmSignUp",
}

export interface UserInformation {
  sub?: string;
  name?: string;
  email?: string;
  address?: string;
  family_name?: string;
  phone_number?: string;
}

export interface UserAuthState {
  isSignedIn: boolean;
  errorAuth: boolean;
  userEmail: string;
  userInformation: UserInformation | null;
}

export interface LoginPayload {
  isSignedIn: boolean;
  userInformation: UserInformation;
  statusMessage: string;
}
