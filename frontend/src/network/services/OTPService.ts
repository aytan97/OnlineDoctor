import RegisterOTP from "../models/OTP";
import { BaseService } from "./core/BaseService";

export class RegisterOTPService extends BaseService<RegisterOTP> {
    constructor() {
        super("/auth/verify-otp");
    }
}

