import React, { useEffect } from "react";
import { Descriptions, Image } from "antd";
import type { DescriptionsProps } from "antd";
import Blog from "../../../../network/models/BlogModel";
import { Buffer } from "buffer";
import parse from 'html-react-parser';
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchCategories } from "../../../../redux/features/categories/categorySlice";
import { formattedDate } from "../../../models";

interface BlogDetailProps {
  blog: Blog | null;
}

const BlogDetail: React.FC<BlogDetailProps> = (props) => {
  const dispatch = useAppDispatch();
  const { blog } = props;
  const categories = useAppSelector((state) => state.categories.list);
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  const exportToBlogItem = (
    blog: Blog | null
  ): DescriptionsProps["items"] => {
    if (!blog) return [];

    return Object.entries(blog)
      .filter(([key]) => key !== "_id" && key !== "__v" && key !== "authorId")
      .map(([key, value]) => {
        let children = value.toString();
        let label = key;
        if (key === "image" && value && value.type === "Buffer" && Array.isArray(value.data)) {
          const base64String = Buffer.from(value.data).toString('base64');
          children = <Image src={`data:image/jpeg;base64, ${base64String}`} alt="blog-image" style={{ width: "100%" }} />
        }

        if (key === 'body' && value) {
          children = <div> {parse(`${value}`)} </div>
        }

        if (key && key === 'categoryId' && value) {
          const category = categories?.find(category => category._id === value)
          children = <div> {category?.categoryName} </div>
          label = "Category"
        }

        if (key === 'createdAt' && value) {
          children = <div> {formattedDate(value)} </div>
          label = "Created at"
        }

        if (key === 'updatedAt' && value) {
          children = <div> {formattedDate(value)} </div>
          label = "Updated at"
        }

        return {
          key,
          label: label.charAt(0).toUpperCase() + label.slice(1),
          children,
        };
      });
  };

  return (
    <>
      {blog && (
        <Descriptions
          labelStyle={{ width: "200px" }}
          size="middle"
          style={{ marginTop: "20px" }}
          bordered
          column={1}
          items={exportToBlogItem(blog)}
        />
      )}
    </>
  );
};

export default BlogDetail;

