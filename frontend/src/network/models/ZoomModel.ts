import { IBaseEntity } from "./core/IBaseEntity";

interface ZoomModel extends IBaseEntity {
    topic?: string;
    roleType?: string;
    signature?: string;
    doctorId: string | undefined;
    patientId: string | undefined;
    date: Date;
    time: string;
}

export default ZoomModel;
