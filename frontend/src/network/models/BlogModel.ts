import { IBaseEntity } from "./core/IBaseEntity";

// interface Blog extends IBaseEntity {
//   createdAt: Date;
//   authorId: string;
//   categoryId: string;
//   title: string;
//   description: string;
//   image: string;
//   body: string;
//   status: string;
//   tags: string[];
// }

interface Blog extends IBaseEntity {
  createdAt: Date;
  authorId: string;
  categoryId: string;
  title: string;
  description: string;
  image: {
    data: number[];
  };
  body: string;
  status: string;
  tags: string[];
}

export default Blog;
