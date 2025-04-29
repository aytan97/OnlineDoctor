import { IBaseEntity } from "./core/IBaseEntity";

interface RegisterDoctor extends IBaseEntity {
    firstname: string;
    lastname: string;
    ssnId: string;
    email: string;
    categories: string[];
    password: string;
    confirmPassword: string;
    role?: string,
    image?: string
}

export default RegisterDoctor;
