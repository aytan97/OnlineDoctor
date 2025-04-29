import Blogs from "../models/BlogModel";
import { BaseService } from "./core/BaseService";

export class BlogService extends BaseService<Blogs> {
    constructor() {
        super("/blog");
    }
}