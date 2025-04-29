
import { IBaseEntity } from "./core/IBaseEntity";

interface AddBooking extends IBaseEntity {
    doctorId: string;
    patientId: string;
    ticketPrice: string;
    appointmentDate: Date;
    status: string
    isPaid: boolean
}

export default AddBooking;


