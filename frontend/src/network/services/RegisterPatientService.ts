import RegisterPatient from "../models/RegisterPatient";
import { BaseService } from "./core/BaseService";

export class RegisterPatientService extends BaseService<RegisterPatient> {
    constructor() {
        super("/auth");
    }
}
