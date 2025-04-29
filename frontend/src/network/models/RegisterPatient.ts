import { IBaseEntity } from "./core/IBaseEntity";

interface RegisterPatient extends IBaseEntity {
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
    role?: string;
    image?: string
}

export default RegisterPatient;
