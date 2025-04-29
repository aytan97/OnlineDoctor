import UserModel from "../models/UserModel";
import { BaseService } from "./core/BaseService";


export class UserService extends BaseService<UserModel> {
    constructor() {
        super("/auth");
    }
}