export interface ILoginResponse {
  status: string;
  data: {
    message: string;
    token: {
      access_token: string;
      refresh_token: string;
    };
  };
}

export interface ILoggedInUserResponse {
  status: string;
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    loginAttempts: number;
    enable2fa: boolean;
    disabled_by_admin: boolean;
    loginDevices: {
      deviceId: string;
      devicename: string;
      hashRt: string;
      isTwoFactorAuthenticated: boolean;
      lastUsedAt: string;
      _id: string;
    }[];
  };
}

export interface ILoggedInUserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  loginAttempts: number;
  enable2fa: boolean;
  disabled_by_admin: boolean;
  loginDevices: {
    deviceId: string;
    devicename: string;
    hashRt: string;
    isTwoFactorAuthenticated: boolean;
    lastUsedAt: string;
    _id: string;
  }[];
}

export interface ILoggedInUserDataState
 {
  userData: ILoggedInUserData,
  setLoggedInUserData: (userData: ILoggedInUserData) => void;
  clearLoggedInUserData: () => void;
 }