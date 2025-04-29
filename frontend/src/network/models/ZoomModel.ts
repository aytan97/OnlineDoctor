import { IBaseEntity } from "./core/IBaseEntity";

interface ZoomModel extends IBaseEntity {
    topic?: string;
    roleType?: string;
    signature?: string;
    doctorId: string;
    patientId: string;
    date: Date;
    time: string;
}

export default ZoomModel;
