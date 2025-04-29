import AddBooking from "../../../network/models/AddBooking";

export interface BookingState {
    status: "idle" | "loading" | "succeeded" | "failed";
    statusCode: number;
    message: string;
    content: AddBooking[] | any[]
}
