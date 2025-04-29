import Blogs from "../../../network/models/BlogModel";

export interface BlogState {
    list: Blogs[] | any[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    selected: Blogs | null;
}


export interface BlogType {
    _id?: string;
    categoryId: string
    title: string
    description: string
    image?: string
    body: string
    status?: string
    tags: string[]
}


export interface SlotType {
    _id?: string;
    date: Date | string;
    time: string
}