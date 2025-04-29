import { IBaseEntity } from "./core/IBaseEntity";

interface RegisterOTP extends IBaseEntity {
    email: string;
    otp: string;
}

export default RegisterOTP;
