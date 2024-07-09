export interface RegisterOnChangeProps {
  value: string;
  name: string;
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
