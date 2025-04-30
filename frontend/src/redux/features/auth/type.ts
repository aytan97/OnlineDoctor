export interface LoginModel {
  email: string;
  password: string;
}

export interface TUser {
  workExperience: string;
  languageSkills?: string;
  currentWorkHospital: string;
  _id: string;
  firstname: string;
  lastname: string;
  image?: {
    data?: number[] | undefined;
  };
  role?: string;
  status?: string;
  categories?: string[] | undefined;
  biography?: string;
  avgRating: string | number;
  totalRating: string | number;
}

export interface AuthState {
  list?: TUser | null;
  isLoggedIn: boolean;
  result: {
    status: "idle" | "loading" | "succeeded" | "failed";
    statusCode: number;
    message: string;
    token: string | null;
  };
}

export interface GetMeState {
  user: any;
  isLoading: boolean;
  error: unknown;
}

export interface DoctorAuthState {
  isLoggedIn: boolean;
  result: {
    status: "idle" | "loading" | "succeeded" | "failed";
    statusCode: number;
    message: string;
    token: string;
  };
}

export interface AuthContextType {
  loginAuth: (email: string, password: string) => Promise<void>;
  logoutAuth: () => void;
}
