import Blogs from "../models/BlogModel";
import { BaseService } from "./core/BaseService";

export class MyBlogService extends BaseService<Blogs> {
    constructor() {
        super("/blog/getMyBlogs");
    }
}