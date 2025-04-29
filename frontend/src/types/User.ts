export type User = {
    _id: string
    name: string
    email: string
    token: string
    isAdmin: boolean
}

export interface UserIdProp {
    id?: string | any;
    blogId?: string | any;
    tagss?: string[] | any
}
