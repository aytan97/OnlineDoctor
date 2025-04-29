import ZoomModel from "../../../network/models/ZoomModel";

export interface ZoomModell {
    topic?: string;
    roleType?: string;
    signature?: string;
    doctorId: string;
    patientId: string;
    date: Date;
    time: string;
}

export interface ZoomState {
    status: "idle" | "loading" | "succeeded" | "failed";
    statusCode: number;
    message: string;
    content: ZoomModel[] | any[]
}

