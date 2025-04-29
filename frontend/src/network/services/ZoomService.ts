import ZoomModel from "../models/ZoomModel";
import { BaseService } from "./core/BaseService";

export class ZoomService extends BaseService<ZoomModel> {
    constructor() {
        super("/zoom/generate");
    }
}