import RegisterDoctor from "../models/RegisterDoctor";
import { BaseService } from "./core/BaseService";

export class RegisterDoctorService extends BaseService<RegisterDoctor> {
    constructor() {
        super("/auth");
    }
}
