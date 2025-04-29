import RegisterDoctor from "../../../network/models/RegisterDoctor";
import RegisterPatient from "../../../network/models/RegisterPatient";

export interface RegisterPatientState {
    result: {
        status: "idle" | "loading" | "succeeded" | "failed";
        statusCode: number;
        message: string;
        content: RegisterPatient[] | any[];
    };
}

export interface RegisterPatientType {
    _id: string;
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
}



export interface RegisterDoctorState {
    result: {
        status: "idle" | "loading" | "succeeded" | "failed";
        statusCode: number;
        message: string;
        content: RegisterDoctor[] | any[];
    };
}

export interface RegisterDoctorType {
    _id: string;
    firstname: string;
    lastname: string;
    ssnId: string;
    email: string;
    categories: string[];
    password: string;
    confirmPassword: string;
}

