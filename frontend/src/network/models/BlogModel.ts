import { IBaseEntity } from "./core/IBaseEntity";

interface Blog extends IBaseEntity {
    categoryId: string
    title: string
    description: string
    image: string
    body: string
    status: string
    tags: string[]
}

export default Blog;
