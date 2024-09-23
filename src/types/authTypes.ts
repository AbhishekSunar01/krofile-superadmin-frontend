

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
  avatar?: string;
}

export interface ILoggedInUserDataState
 {
  userData: ILoggedInUserData,
  setLoggedInUserData: (userData: ILoggedInUserData) => void;
  clearLoggedInUserData: () => void;
 }