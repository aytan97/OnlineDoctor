
export interface LoginModel {
    email: string;
    password: string;
}

export interface AuthState {
    list?: string[] | any[];
    isLoggedIn: boolean;
    result: {
        status: "idle" | "loading" | "succeeded" | "failed";
        statusCode: number;
        message: string;
        token: string | null;
    };
}

export interface GetMeState {
    user: any
    isLoading: boolean;
    error: unknown
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
