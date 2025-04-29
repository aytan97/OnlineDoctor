export interface OTPModel {
    email: string;
    otp: string;
}

export interface OTPState {
    result: {
        success: true | false;
        message: string;
    };
}

